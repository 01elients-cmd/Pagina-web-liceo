import { createClient } from '@/lib/supabase/server';

export default async function AnnouncementFeed() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  // Get user profile role
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  const userRole = profile?.role || 'student';

  // Fetch announcements where target_role = 'all' or matches the user's role
  const { data: announcements } = await supabase
    .from('announcements')
    .select(`
      id,
      title,
      content,
      created_at,
      author:profiles!announcements_author_id_fkey (
        first_name,
        last_name,
        role
      )
    `)
    .or(`target_role.eq.all,target_role.eq.${userRole}`)
    .order('created_at', { ascending: false });

  const list = announcements || [];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-bold text-slate-900 tracking-tight">
          Tablón de Anuncios
        </h2>
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
          Oficial
        </span>
      </div>

      {list.length === 0 ? (
        <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
          No hay comunicados o avisos recientes en este momento.
        </div>
      ) : (
        <div className="space-y-4">
          {list.map((ann: any) => (
            <div
              key={ann.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-2 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-[9px] font-bold text-slate-700 bg-slate-100 px-2 py-0.5 rounded uppercase tracking-wider">
                    {ann.author?.role === 'admin' ? 'Dirección' : 'Docente'}
                  </span>
                  <span className="text-[10px] font-semibold text-slate-600">
                    {ann.author ? `${ann.author.first_name} ${ann.author.last_name}` : 'Sistema'}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">
                  {new Date(ann.created_at).toLocaleDateString('es-ES', {
                    day: 'numeric',
                    month: 'short',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-slate-900 text-sm leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-650 leading-relaxed whitespace-pre-wrap">
                  {ann.content}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
