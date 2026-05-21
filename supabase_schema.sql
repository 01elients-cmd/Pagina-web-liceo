-- ====================================================
-- DATABASE SCHEMA: U.E. Dr. José María Vargas
-- ====================================================

-- 1. Create Roles lookup table
CREATE TABLE public.roles (
    name text PRIMARY KEY,
    description text
);

-- Insert default system roles
INSERT INTO public.roles (name, description) VALUES
('admin', 'Administrador / Directivo - Acceso total a la gestión del sistema y control de admisiones.'),
('teacher', 'Docente - Carga de calificaciones, gestión de biblioteca virtual y aprobación de citas.'),
('student', 'Estudiante - Consulta de calificaciones y descarga de recursos en la biblioteca.'),
('representative', 'Representante - Consulta académica de sus tutelados, solicitud de citas y alertas financieras.');

-- 2. Create User Profiles (extends Supabase auth.users)
CREATE TABLE public.profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL UNIQUE,
    role text REFERENCES public.roles(name) DEFAULT 'student' NOT NULL,
    phone text,
    grade_level text, -- e.g., '1er Año', '2do Año', etc. (for students)
    representative_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL, -- Self-reference for Student -> Representative
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for performance
CREATE INDEX idx_profiles_role ON public.profiles(role);
CREATE INDEX idx_profiles_representative ON public.profiles(representative_id);

-- 3. SECURITY DEFINER HELPER FUNCTIONS (Avoid RLS infinite recursion)
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean AS $$
BEGIN
  RETURN COALESCE(
    (SELECT role = 'admin' FROM public.profiles WHERE id = auth.uid()),
    false
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE FUNCTION public.get_user_role()
RETURNS text AS $$
BEGIN
  RETURN COALESCE(
    (SELECT role FROM public.profiles WHERE id = auth.uid()),
    'visitor'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Automatic profile generation on auth.users signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, first_name, last_name, email, role, phone, grade_level, representative_id)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    new.email,
    COALESCE(new.raw_user_meta_data->>'role', 'student'),
    COALESCE(new.raw_user_meta_data->>'phone', ''),
    new.raw_user_meta_data->>'grade_level',
    CASE 
      WHEN new.raw_user_meta_data->>'representative_id' IS NOT NULL THEN (new.raw_user_meta_data->>'representative_id')::uuid
      ELSE NULL
    END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Enrollments Table (Admissions/Pre-registration)
CREATE TABLE public.enrollments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_first_name text NOT NULL,
    student_last_name text NOT NULL,
    student_birth_date date NOT NULL,
    grade_level text NOT NULL, -- e.g., '1er Año', '2do Año', '3er Año', etc.
    representative_first_name text NOT NULL,
    representative_last_name text NOT NULL,
    representative_email text NOT NULL,
    representative_phone text NOT NULL,
    status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected')),
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_enrollments_status ON public.enrollments(status);

-- 6. Subjects Table (Materias)
CREATE TABLE public.subjects (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name text NOT NULL,
    grade_level text NOT NULL, -- e.g., '1er Año', '2do Año', etc.
    teacher_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_subjects_teacher ON public.subjects(teacher_id);

-- 7. Grades Table (Calificaciones - Escala de 0 a 20)
CREATE TABLE public.grades (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    grade numeric(4,2) NOT NULL CHECK (grade >= 0.00 AND grade <= 20.00),
    term text NOT NULL, -- e.g., '1er Lapso', '2do Lapso', '3er Lapso'
    weight numeric(5,2) DEFAULT 100.00 NOT NULL CHECK (weight > 0.00 AND weight <= 100.00),
    description text, -- e.g., 'Examen Final de Matemáticas'
    graded_by uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_grades_student ON public.grades(student_id);
CREATE INDEX idx_grades_subject ON public.grades(subject_id);

CREATE TABLE public.appointments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    representative_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    target_user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL, -- Teacher/Admin
    appointment_date date NOT NULL,
    appointment_time time NOT NULL,
    status text DEFAULT 'pending' NOT NULL CHECK (status IN ('pending', 'approved', 'rejected', 'completed')),
    reason text NOT NULL,
    notes text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_appointments_representative ON public.appointments(representative_id);
CREATE INDEX idx_appointments_target_user ON public.appointments(target_user_id);
CREATE INDEX idx_appointments_status ON public.appointments(status);

-- 9. Announcements Table (Tablón de Anuncios Segmentado)
CREATE TABLE public.announcements (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    content text NOT NULL,
    target_role text DEFAULT 'all' NOT NULL CHECK (target_role IN ('all', 'admin', 'teacher', 'student', 'representative')),
    author_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_announcements_target ON public.announcements(target_role);

-- 10. Notifications Table (Alertas Financieras y Académicas)
CREATE TABLE public.notifications (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title text NOT NULL,
    message text NOT NULL,
    type text DEFAULT 'system' NOT NULL CHECK (type IN ('system', 'financial', 'academic', 'admission', 'admin_alert')),
    is_read boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_notifications_user_unread ON public.notifications(user_id, is_read);

-- ====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ====================================================

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------
-- Policies for: ROLES
-- ----------------------------------------------------
CREATE POLICY "Allow read access to roles for everyone"
ON public.roles FOR SELECT USING (true);

CREATE POLICY "Allow full access to roles for admins only"
ON public.roles FOR ALL USING (public.is_admin());

-- ----------------------------------------------------
-- Policies for: PROFILES
-- ----------------------------------------------------
CREATE POLICY "Allow read access to profiles for authenticated users"
ON public.profiles FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow users to update their own profiles"
ON public.profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow admins to perform all operations on profiles"
ON public.profiles FOR ALL USING (public.is_admin());

-- ----------------------------------------------------
-- Policies for: ENROLLMENTS (Admissions)
-- ----------------------------------------------------
CREATE POLICY "Allow anonymous users to insert enrollments (Public Registration)"
ON public.enrollments FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow admins to read/write all enrollments"
ON public.enrollments FOR ALL USING (public.is_admin());

CREATE POLICY "Allow representatives to view their own pre-registrations by email match"
ON public.enrollments FOR SELECT USING (
  auth.role() = 'authenticated' AND 
  (SELECT email FROM public.profiles WHERE id = auth.uid()) = representative_email
);

-- ----------------------------------------------------
-- Policies for: SUBJECTS
-- ----------------------------------------------------
CREATE POLICY "Allow read access to subjects for authenticated users"
ON public.subjects FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow full access to subjects for admins only"
ON public.subjects FOR ALL USING (public.is_admin());

-- ----------------------------------------------------
-- Policies for: GRADES
-- ----------------------------------------------------
CREATE POLICY "Allow admins full access to grades"
ON public.grades FOR ALL USING (public.is_admin());

CREATE POLICY "Allow teachers full access to grades"
ON public.grades FOR ALL USING (
  public.get_user_role() = 'teacher'
);

CREATE POLICY "Allow students to view their own grades"
ON public.grades FOR SELECT USING (
  auth.uid() = student_id
);

CREATE POLICY "Allow representatives to view their tutored students' grades"
ON public.grades FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.profiles p
    WHERE p.id = student_id AND p.representative_id = auth.uid()
  )
);

-- ----------------------------------------------------
-- Policies for: APPOINTMENTS
-- ----------------------------------------------------
CREATE POLICY "Allow representatives to create appointments"
ON public.appointments FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND auth.uid() = representative_id
);

CREATE POLICY "Allow users to view their own appointments"
ON public.appointments FOR SELECT USING (
  auth.uid() = representative_id OR 
  auth.uid() = target_user_id OR 
  public.is_admin()
);

CREATE POLICY "Allow teachers and admins to update appointments"
ON public.appointments FOR UPDATE USING (
  auth.uid() = target_user_id OR 
  public.is_admin()
);

CREATE POLICY "Allow admins to delete appointments"
ON public.appointments FOR DELETE USING (public.is_admin());

-- ----------------------------------------------------
-- Policies for: ANNOUNCEMENTS
-- ----------------------------------------------------
CREATE POLICY "Allow viewing announcements based on role"
ON public.announcements FOR SELECT USING (
  target_role = 'all' OR
  target_role = public.get_user_role() OR
  public.is_admin()
);

CREATE POLICY "Allow teachers and admins to insert announcements"
ON public.announcements FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND (
    public.is_admin() OR (
      public.get_user_role() = 'teacher' AND target_role IN ('student', 'representative')
    )
  )
);

CREATE POLICY "Allow authors and admins to update/delete announcements"
ON public.announcements FOR ALL USING (
  auth.uid() = author_id OR public.is_admin()
);

-- ----------------------------------------------------
-- Policies for: NOTIFICATIONS
-- ----------------------------------------------------
CREATE POLICY "Allow users to view their own notifications"
ON public.notifications FOR SELECT USING (
  auth.uid() = user_id OR public.is_admin()
);

CREATE POLICY "Allow users to mark their own notifications as read"
ON public.notifications FOR UPDATE USING (
  auth.uid() = user_id
);

CREATE POLICY "Allow admins to manage all notifications"
ON public.notifications FOR ALL USING (public.is_admin());

-- ====================================================
-- 11. Library Resources Table (Biblioteca Virtual)
-- ====================================================
CREATE TABLE public.library_resources (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text,
    file_url text NOT NULL,
    subject_id uuid REFERENCES public.subjects(id) ON DELETE CASCADE NOT NULL,
    teacher_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX idx_library_resources_subject ON public.library_resources(subject_id);
CREATE INDEX idx_library_resources_teacher ON public.library_resources(teacher_id);

-- Enable RLS on library_resources
ALTER TABLE public.library_resources ENABLE ROW LEVEL SECURITY;

-- Policies for library_resources
CREATE POLICY "Allow authenticated users to read library resources"
ON public.library_resources FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Allow teachers and admins to insert library resources"
ON public.library_resources FOR INSERT WITH CHECK (
  auth.role() = 'authenticated' AND (
    public.is_admin() OR public.get_user_role() = 'teacher'
  )
);

CREATE POLICY "Allow teachers who uploaded or admins to manage library resources"
ON public.library_resources FOR ALL USING (
  auth.uid() = teacher_id OR public.is_admin()
);

-- ====================================================
-- 12. Supabase Storage Setup (Virtual Library Bucket)
-- ====================================================

-- Note: The buckets table insertion must be done in storage schema
INSERT INTO storage.buckets (id, name, public)
VALUES ('virtual_library', 'virtual_library', true)
ON CONFLICT (id) DO NOTHING;

-- RLS Policies for storage.objects in virtual_library bucket
CREATE POLICY "Allow authenticated users to download files from virtual_library"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'virtual_library');

CREATE POLICY "Allow teachers and admins to upload files to virtual_library"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (
  bucket_id = 'virtual_library' AND (
    public.is_admin() OR public.get_user_role() = 'teacher'
  )
);

CREATE POLICY "Allow teachers and admins to delete files from virtual_library"
ON storage.objects FOR DELETE TO authenticated
USING (
  bucket_id = 'virtual_library' AND (
    public.is_admin() OR public.get_user_role() = 'teacher'
  )
);

