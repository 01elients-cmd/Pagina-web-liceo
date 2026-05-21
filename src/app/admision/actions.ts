'use server';

import { createClient as createNormalClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

// Helper to create a privileged client to insert notifications for admins
async function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return null;
  }
  return createSupabaseClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export async function submitEnrollment(prevState: any, formData: FormData) {
  // Extract inputs
  const representative_first_name = formData.get('representative_first_name') as string;
  const representative_last_name = formData.get('representative_last_name') as string;
  const representative_email = formData.get('representative_email') as string;
  const representative_phone = formData.get('representative_phone') as string;
  const student_first_name = formData.get('student_first_name') as string;
  const student_last_name = formData.get('student_last_name') as string;
  const student_birth_date = formData.get('student_birth_date') as string;
  const grade_level = formData.get('grade_level') as string;

  // Validation
  if (
    !representative_first_name ||
    !representative_last_name ||
    !representative_email ||
    !representative_phone ||
    !student_first_name ||
    !student_last_name ||
    !student_birth_date ||
    !grade_level
  ) {
    return { error: 'Por favor, complete todos los campos requeridos.' };
  }

  try {
    const supabase = await createNormalClient();

    // 1. Insert enrollment (Public RLS policy allows anonymous inserts)
    const { data: enrollment, error: enrollmentError } = await supabase
      .from('enrollments')
      .insert({
        student_first_name,
        student_last_name,
        student_birth_date,
        grade_level,
        representative_first_name,
        representative_last_name,
        representative_email,
        representative_phone,
        status: 'pending',
      })
      .select()
      .single();

    if (enrollmentError) {
      return { error: `Error al registrar la admisión: ${enrollmentError.message}` };
    }

    // 2. Insert notifications for admin profiles.
    // Since visitors are unauthenticated and notifications require admin privileges to insert,
    // we use the Admin Client (service_role) if configured.
    const adminSupabase = await getAdminClient();

    if (adminSupabase) {
      // Find all admin profiles
      const { data: admins } = await adminSupabase
        .from('profiles')
        .select('id')
        .eq('role', 'admin');

      if (admins && admins.length > 0) {
        // Prepare notifications
        const notifications = admins.map((admin) => ({
          user_id: admin.id,
          title: 'Nueva solicitud de cupo',
          message: `Nueva preinscripción recibida para ${student_first_name} ${student_last_name} (${grade_level}).`,
          type: 'admission',
          is_read: false,
        }));

        const { error: notificationError } = await adminSupabase
          .from('notifications')
          .insert(notifications);

        if (notificationError) {
          console.error('Error al insertar notificaciones de administrador:', notificationError.message);
        }
      }
    } else {
      console.warn(
        'SUPABASE_SERVICE_ROLE_KEY no configurada. Se omitió la creación automática de notificaciones de administrador.'
      );
    }

    return { success: true };
  } catch (err: any) {
    return { error: err?.message || 'Ocurrió un error inesperado al procesar la solicitud.' };
  }
}
