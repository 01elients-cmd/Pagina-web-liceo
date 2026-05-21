import { createClient } from '@/lib/supabase/server';
import StaffAppointmentsManager from '@/components/dashboard/staff/StaffAppointmentsManager';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminAppointmentsPage() {
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

  // Fetch all appointments in the system for admin audit/management
  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      id,
      appointment_date,
      appointment_time,
      status,
      reason,
      notes,
      representative:profiles!appointments_representative_id_fkey (
        id,
        first_name,
        last_name
      )
    `)
    .order('appointment_date', { ascending: false });

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
          <h1 className="text-xl font-bold text-slate-900">Consola General de Citas</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Supervisión y gestión global de reuniones y citas programadas en el plantel.
          </p>
        </div>

        {/* Manager Workspace */}
        <StaffAppointmentsManager initialAppointments={appointments || []} />

      </main>
    </div>
  );
}
