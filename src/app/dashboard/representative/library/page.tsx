import { createClient } from '@/lib/supabase/server';
import RepresentativeLibraryView from '@/components/dashboard/representative/RepresentativeLibraryView';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function RepresentativeLibraryPage() {
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

  // Fetch all represented students
  const { data: students } = await supabase
    .from('profiles')
    .select('id, first_name, last_name, grade_level')
    .eq('representative_id', user.id)
    .order('first_name', { ascending: true });

  const activeStudents = students || [];
  const gradeLevels = activeStudents.map((s) => s.grade_level).filter(Boolean);

  // Fetch resources matching the students' grade levels
  let resources: any[] = [];
  if (gradeLevels.length > 0) {
    const { data: matchedResources } = await supabase
      .from('library_resources')
      .select(`
        id,
        title,
        description,
        file_url,
        created_at,
        subjects!inner (
          id,
          name,
          grade_level
        ),
        profiles (
          first_name,
          last_name
        )
      `)
      .in('subjects.grade_level', gradeLevels)
      .order('created_at', { ascending: false });

    resources = matchedResources || [];
  }

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
        
        {/* Title workspace */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h1 className="text-xl font-bold text-slate-900">Biblioteca Virtual</h1>
          <p className="text-sm text-slate-500 mt-0.5">
            Recursos y guías de estudio asignados a sus representados para el período académico.
          </p>
        </div>

        {/* Dynamic view */}
        <RepresentativeLibraryView
          students={activeStudents}
          resources={resources}
        />

      </main>
    </div>
  );
}
