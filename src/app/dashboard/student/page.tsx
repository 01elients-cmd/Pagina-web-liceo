import { createClient } from '@/lib/supabase/server';
import AnnouncementFeed from '@/components/dashboard/shared/AnnouncementFeed';
import NotificationPanel from '@/components/dashboard/shared/NotificationPanel';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function StudentDashboard() {
  const supabase = await createClient();

  // Get current user session
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

  // Fetch student profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch grades with subject and teacher profile info
  const { data: grades } = await supabase
    .from('grades')
    .select(`
      id,
      grade,
      term,
      weight,
      description,
      subjects (
        id,
        name,
        grade_level,
        profiles (
          first_name,
          last_name
        )
      )
    `)
    .eq('student_id', user.id)
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
              Estudiante
            </span>
            <form action="/login/actions" method="POST">
              {/* Simple logout button */}
              <Link
                href="/login"
                className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
              >
                Cerrar Sesión
              </Link>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-xl font-bold text-slate-900">
              ¡Hola, {profile?.first_name} {profile?.last_name}!
            </h1>
            <p className="text-sm text-slate-500">
              Consulta académica del período en curso.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/student/library"
              className="text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg transition-colors shadow-xs"
            >
              Biblioteca Virtual
            </Link>
            <div className="text-left sm:text-right">
              <span className="block text-[10px] font-bold text-slate-400 uppercase tracking-wide">Grado / Nivel</span>
              <span className="text-sm font-bold text-slate-700">{profile?.grade_level || 'No asignado'}</span>
            </div>
          </div>
        </div>

        {/* Notifications / Alerts Section */}
        <NotificationPanel />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Grades Table Section */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-bold text-slate-900 tracking-tight">Calificaciones</h2>
              <span className="text-xs font-semibold text-slate-500 bg-white border border-slate-200 px-2 py-1 rounded">
                Solo Lectura
              </span>
            </div>

            <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              {!grades || grades.length === 0 ? (
                <div className="p-8 text-center text-slate-500 space-y-2">
                  <svg className="h-8 w-8 text-slate-350 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <p className="text-sm font-semibold">Aún no hay calificaciones registradas para este período.</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                    <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                      <tr>
                        <th className="px-6 py-3">Materia</th>
                        <th className="px-6 py-3">Docente</th>
                        <th className="px-6 py-3">Lapso/Período</th>
                        <th className="px-6 py-3">Nota</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {grades.map((gradeRow: any) => {
                        const subject = gradeRow.subjects;
                        const teacher = subject?.profiles;
                        return (
                          <tr key={gradeRow.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-6 py-4 font-semibold text-slate-900">
                              {subject?.name || 'Materia desconocida'}
                            </td>
                            <td className="px-6 py-4 text-slate-600">
                              {teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Asignación pendiente'}
                            </td>
                            <td className="px-6 py-4 text-slate-500">
                              {gradeRow.term} <span className="text-xs text-slate-400">({gradeRow.weight}%)</span>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`text-base font-bold px-2 py-0.5 rounded ${
                                  gradeRow.grade >= 10
                                    ? 'text-emerald-700 bg-emerald-50'
                                    : 'text-rose-700 bg-rose-50'
                                }`}
                              >
                                {Number(gradeRow.grade).toFixed(2)}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Shared Announcements Feed */}
          <div className="space-y-4">
            <AnnouncementFeed />
          </div>
        </div>

      </main>
    </div>
  );
}
