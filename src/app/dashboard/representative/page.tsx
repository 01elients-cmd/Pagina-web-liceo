import { createClient } from '@/lib/supabase/server';
import RepresentativeGradesView from '@/components/dashboard/representative/RepresentativeGradesView';
import AnnouncementFeed from '@/components/dashboard/shared/AnnouncementFeed';
import NotificationPanel from '@/components/dashboard/shared/NotificationPanel';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RepresentativeDashboard() {
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

  // Fetch Representative profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch all students represented by this user, including their grades and subject details
  const { data: students } = await supabase
    .from('profiles')
    .select(`
      id,
      first_name,
      last_name,
      grade_level,
      grades (
        id,
        grade,
        term,
        weight,
        description,
        subjects (
          id,
          name,
          profiles (
            first_name,
            last_name
          )
        )
      )
    `)
    .eq('representative_id', user.id)
    .order('first_name', { ascending: true });

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
              Representante
            </span>
            <Link
              href="/login"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Cerrar Sesión
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Welcome Block */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-slate-900">
                Bienvenido, Representante {profile?.first_name} {profile?.last_name}
              </h1>
              <p className="text-sm text-slate-500 mt-0.5">
                Portal administrativo de consulta académica y solicitud de citas.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/dashboard/representative/library"
                className="text-xs font-semibold bg-white border border-slate-350 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-lg transition-colors"
              >
                Biblioteca Virtual
              </Link>
              <Link
                href="/dashboard/representative/appointments"
                className="text-xs font-semibold bg-white border border-slate-350 hover:bg-slate-50 text-slate-700 px-3.5 py-2 rounded-lg transition-colors"
              >
                Agenda de Citas
              </Link>
            </div>
          </div>
        </div>

        {/* Notifications (e.g. Financial notifications) */}
        <NotificationPanel />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Grades Panel */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-bold text-slate-900 tracking-tight">Rendimiento Académico</h2>
            <RepresentativeGradesView students={students || []} />
          </div>

          {/* Sidebar - Announcements & Quick Actions */}
          <div className="space-y-6">
            <AnnouncementFeed />
          </div>
        </div>

      </main>
    </div>
  );
}
