import { createClient } from '@/lib/supabase/server';
import TeacherGradesManager from '@/components/dashboard/teacher/TeacherGradesManager';
import Link from 'next/link';
import { logout } from '@/app/login/actions';

export const dynamic = 'force-dynamic';

export default async function TeacherDashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Cargando sesión...
      </div>
    );
  }

  // Fetch Teacher profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch subjects taught by this teacher
  const { data: subjects } = await supabase
    .from('subjects')
    .select('*')
    .eq('teacher_id', user.id)
    .order('name', { ascending: true });

  const activeSubjects = subjects || [];
  const gradeLevels = activeSubjects.map((sub) => sub.grade_level);

  // Fetch students whose grade_level is taught by this teacher
  let students: any[] = [];
  if (gradeLevels.length > 0) {
    const { data: matchedStudents } = await supabase
      .from('profiles')
      .select('id, first_name, last_name, grade_level')
      .eq('role', 'student')
      .in('grade_level', gradeLevels)
      .order('first_name', { ascending: true });
    
    students = matchedStudents || [];
  }

  // Fetch existing grades loaded for the teacher's subjects
  let grades: any[] = [];
  if (activeSubjects.length > 0) {
    const subjectIds = activeSubjects.map((sub) => sub.id);
    const { data: loadedGrades } = await supabase
      .from('grades')
      .select('*')
      .in('subject_id', subjectIds);
    
    grades = loadedGrades || [];
  }

  // Fetch announcements for 'teacher' or 'all'
  const { data: announcements } = await supabase
    .from('announcements')
    .select('*')
    .in('target_role', ['teacher', 'all'])
    .order('created_at', { ascending: false })
    .limit(5);

  // Fetch unread notifications for the teacher
  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user.id)
    .eq('is_read', false)
    .order('created_at', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center text-white text-sm font-bold">
              EV
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-md">Expediente Vargas</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Docente
            </span>
            <form action={logout}>
              <button
                type="submit"
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer bg-transparent border-0 p-0"
              >
                Cerrar Sesión
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Profile Block */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Panel Operativo: Prof. {profile?.first_name} {profile?.last_name}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Carga y control de calificaciones de los lapsos correspondientes.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/teacher/library"
                className="text-xs font-semibold bg-white border border-slate-200 hover:border-brand-blue/30 text-slate-700 px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                Biblioteca Virtual
              </Link>
              <Link
                href="/dashboard/teacher/appointments"
                className="text-xs font-semibold bg-white border border-slate-200 hover:border-brand-blue/30 text-slate-700 px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                Agenda de Citas
              </Link>
              <Link
                href="/dashboard/teacher/announcements"
                className="text-xs font-semibold bg-white border border-slate-200 hover:border-brand-blue/30 text-slate-700 px-3.5 py-2 rounded-lg transition-colors shadow-xs"
              >
                Crear Comunicados
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications list */}
        {notifications && notifications.length > 0 && (
          <div className="space-y-2">
            {notifications.map((notif: any) => (
              <div
                key={notif.id}
                className="p-3 bg-indigo-50 border border-indigo-200 text-indigo-900 rounded-lg text-sm flex gap-3"
              >
                <svg className="h-5 w-5 text-indigo-650 flex-shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <div>
                  <span className="font-bold">{notif.title}:</span> {notif.message}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Grade Loader Component */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight font-sans">Control de Notas</h2>
            <TeacherGradesManager
              subjects={activeSubjects}
              students={students}
              initialGrades={grades}
            />
          </div>

          {/* Announcements Sidebar */}
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Comunicados Internos</h2>
            <div className="space-y-4">
              {!announcements || announcements.length === 0 ? (
                <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500 text-sm">
                  No hay comunicados publicados para docentes en este momento.
                </div>
              ) : (
                announcements.map((ann: any) => (
                  <div key={ann.id} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm space-y-2">
                    <span className="inline-block text-[10px] font-bold text-slate-750 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                      Circular
                    </span>
                    <h3 className="font-bold text-slate-900 text-sm">{ann.title}</h3>
                    <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line">
                      {ann.content}
                    </p>
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                      <span>Dirección General</span>
                      <span>
                        {new Date(ann.created_at).toLocaleDateString('es-ES', {
                          day: 'numeric',
                          month: 'short',
                        })}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
