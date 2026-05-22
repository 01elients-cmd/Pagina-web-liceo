import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function StudentLibraryPage() {
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

  // Fetch Student Profile (to obtain grade_level)
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  // Fetch academic materials filtered by the student's grade level
  let resources: any[] = [];
  if (profile?.grade_level) {
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
      .eq('subjects.grade_level', profile.grade_level)
      .order('created_at', { ascending: false });

    resources = matchedResources || [];
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans pb-12">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/student" className="h-8 w-8 rounded bg-slate-900 flex items-center justify-center text-white text-sm font-bold hover:bg-slate-800 transition-colors">
              EV
            </Link>
            <span className="font-bold text-slate-900 tracking-tight text-md">Expediente Vargas</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard/student"
              className="text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors"
            >
              Volver al Panel
            </Link>
            <span className="text-xs font-semibold bg-slate-100 text-slate-700 px-2.5 py-1 rounded-md uppercase tracking-wider">
              Estudiante
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Header section */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Biblioteca Virtual</h1>
            <p className="text-sm text-slate-500 mt-0.5">
              Guías de estudio, lecturas recomendadas y material didáctico oficial.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <span className="block text-xs font-semibold text-slate-400 uppercase tracking-wide">Nivel de consulta</span>
            <span className="text-sm font-bold text-slate-700">{profile?.grade_level || 'Sin nivel'}</span>
          </div>
        </div>

        {/* Resources Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 tracking-tight">Recursos Disponibles</h2>
          
          {resources.length === 0 ? (
            <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500 space-y-2">
              <svg className="h-10 w-10 text-slate-300 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
              </svg>
              <p className="text-sm font-semibold">No se han subido materiales de estudio para su grado todavía.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resources.map((res: any) => {
                const subject = res.subjects;
                const teacher = res.profiles;
                return (
                  <div
                    key={res.id}
                    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xs hover:border-brand-blue/30 transition-all flex flex-col justify-between overflow-hidden"
                  >
                    <div className="p-5 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded uppercase tracking-wide">
                          {subject?.name || 'Materia'}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {new Date(res.created_at).toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'short',
                          })}
                        </span>
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-900 text-sm tracking-tight leading-snug line-clamp-1">
                          {res.title}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                          {res.description || 'Sin descripción adicional disponible.'}
                        </p>
                      </div>
                    </div>
                    {/* Card Footer */}
                    <div className="bg-slate-50 border-t border-slate-150 px-5 py-3.5 flex items-center justify-between">
                      <div className="text-left">
                        <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wide">Subido por:</span>
                        <span className="text-[10px] font-semibold text-slate-650">
                          {teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Docente'}
                        </span>
                      </div>
                      <a
                        href={res.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-3 py-1.5 rounded transition-colors"
                      >
                        Descargar
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

      </main>
    </div>
  );
}
