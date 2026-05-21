import { createClient } from '@/lib/supabase/server';
import RepresentativeAppointmentsManager from '@/components/dashboard/representative/RepresentativeAppointmentsManager';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RepresentativeAppointmentsPage() {
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

  // Fetch all staff members (teachers and admins)
  const { data: staff } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, role')
    .in('role', ['teacher', 'admin'])
    .order('first_name', { ascending: true });

  // Fetch representative's requested appointments
  const { data: appointments } = await supabase
    .from('appointments')
    .select(`
      id,
      appointment_date,
      appointment_time,
      status,
      reason,
      notes,
      host:profiles!appointments_target_user_id_fkey (
        id,
        first_name,
        last_name,
        role
      )
    `)
    .eq('representative_id', user.id)
    .order('appointment_date', { ascending: false });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/representative" className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center text-white text-sm font-bold hover:bg-slate-800 transition-colors">
              EV
            </Link>
            <span className="font-bold text-slate-900 tracking-tight text-md">Expediente Vargas</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/representative"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Volver al Panel
            </Link>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Representante
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header Block */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Agenda de Citas</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Solicite reuniones con docentes o directivos del liceo y supervise su agenda de compromisos.
          </p>
        </div>

        {/* Manager Layout */}
        <RepresentativeAppointmentsManager
          staffList={staff || []}
          initialAppointments={appointments || []}
        />

      </main>
    </div>
  );
}
