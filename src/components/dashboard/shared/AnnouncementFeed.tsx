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
        <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
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
              className="bg-white p-5 rounded-2xl border border-slate-200/60 shadow-xs space-y-3 hover:border-brand-green/30 hover:shadow-md transition-all duration-300 relative overflow-hidden pl-6"
            >
              {/* Left role accent indicator bar */}
              <div
                className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                  ann.author?.role === 'admin' ? 'bg-brand-gold' : 'bg-brand-green'
                }`}
              ></div>

              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-3">
                  {/* Circle avatar */}
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs flex-shrink-0 ${
                    ann.author?.role === 'admin'
                      ? 'bg-brand-blue'
                      : 'bg-brand-green'
                  }`}>
                    {ann.author
                      ? `${ann.author.first_name[0]}${ann.author.last_name[0]}`.toUpperCase()
                      : 'S'}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-slate-900 leading-none">
                        {ann.author ? `${ann.author.first_name} ${ann.author.last_name}` : 'Sistema'}
                      </span>
                      <span className={`text-[8px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        ann.author?.role === 'admin'
                          ? 'bg-brand-gold/10 text-brand-gold'
                          : 'bg-brand-green/10 text-brand-green'
                      }`}>
                        {ann.author?.role === 'admin' ? 'Dirección' : 'Docente'}
                      </span>
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {new Date(ann.created_at).toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-extrabold text-brand-blue text-sm leading-snug">
                  {ann.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-wrap">
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
