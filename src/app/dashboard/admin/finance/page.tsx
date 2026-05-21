import { createClient } from '@/lib/supabase/server';
import FinanceAlertManager from '@/components/dashboard/admin/FinanceAlertManager';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminFinancePage() {
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

  // Check admin role
  const { data: adminProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (adminProfile?.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        Acceso Denegado.
      </div>
    );
  }

  // Fetch representatives profiles
  const { data: representatives } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, email')
    .eq('role', 'representative')
    .order('first_name', { ascending: true });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/admin" className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center text-white text-sm font-bold hover:bg-slate-800 transition-colors">
              EV
            </Link>
            <span className="font-bold text-slate-900 tracking-tight text-md">Expediente Vargas</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/admin"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Volver al Panel
            </Link>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Administración
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Title Block */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Control de Alertas Financieras</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Gestione y emita avisos urgentes sobre estados de morosidad y cobro administrativo a representantes legales.
          </p>
        </div>

        {/* Form Container */}
        <FinanceAlertManager representatives={representatives || []} />

      </main>
    </div>
  );
}
