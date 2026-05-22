import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminDashboardPage() {
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

  // Fetch Admin profile
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center text-white text-sm font-bold">
              EV
            </span>
            <span className="font-bold text-slate-900 tracking-tight text-md">Expediente Vargas</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Administración
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
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">
            Panel de Control: {profile?.first_name} {profile?.last_name}
          </h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Acceso a los módulos centrales de administración y comunicación del plantel.
          </p>
        </div>

        {/* Console Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Announcements Card */}
          <Link
            href="/dashboard/admin/announcements"
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Módulo Informativo
              </span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                Boletín Oficial
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Publique y administre comunicados oficiales dirigidos a docentes, estudiantes y representantes.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Gestionar Anuncios</span>
              <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Appointments Card */}
          <Link
            href="/dashboard/admin/appointments"
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Módulo de Planificación
              </span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                Consola General de Citas
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Supervise y gestione todas las solicitudes de citas y reuniones entre representantes y personal del plantel.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Ver Agenda de Citas</span>
              <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Users Card */}
          <Link
            href="/dashboard/admin/users"
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Control de Cuentas
              </span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                Gestión de Usuarios y Roles
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Asigne roles a nuevos perfiles registrados y asocie estudiantes con sus respectivos representantes familiares.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Administrar Cuentas</span>
              <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          {/* Finance Card */}
          <Link
            href="/dashboard/admin/finance"
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md hover:border-brand-blue/30 transition-all flex flex-col justify-between group"
          >
            <div className="space-y-2">
              <span className="inline-block text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                Módulo Cobros
              </span>
              <h2 className="text-lg font-bold text-slate-900 group-hover:text-brand-blue transition-colors">
                Alertas Financieras
              </h2>
              <p className="text-xs text-slate-500 leading-relaxed">
                Genere notificaciones urgentes e individuales de morosidad o compromisos de pago para los representantes.
              </p>
            </div>
            <div className="mt-6 flex items-center justify-between text-xs font-semibold text-slate-800">
              <span>Emitir Avisos de Pago</span>
              <svg className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

        </div>

      </main>
    </div>
  );
}
