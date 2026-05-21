'use client';

import { useState, useTransition } from 'react';
import { createAnnouncement, deleteAnnouncement } from '@/app/dashboard/actions';

interface AnnouncementManagerProps {
  initialAnnouncements: any[];
  userRole: 'teacher' | 'admin';
}

export default function AnnouncementManager({
  initialAnnouncements,
  userRole,
}: AnnouncementManagerProps) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [targetRole, setTargetRole] = useState<'all' | 'admin' | 'teacher' | 'student' | 'representative'>(
    userRole === 'teacher' ? 'student' : 'all'
  );
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!title.trim() || !content.trim()) {
      setErrorMessage('Por favor complete todos los campos.');
      return;
    }

    startTransition(async () => {
      const res = await createAnnouncement({
        title,
        content,
        targetRole,
      });

      if (res.error) {
        setErrorMessage(res.error);
      } else {
        setSuccessMessage('¡Anuncio publicado correctamente!');
        setTitle('');
        setContent('');
        // Append to local list optimistically
        setAnnouncements([
          {
            id: Math.random().toString(),
            title,
            content,
            target_role: targetRole,
            created_at: new Date().toISOString(),
          },
          ...announcements,
        ]);
        setTimeout(() => setSuccessMessage(''), 3000);
      }
    });
  };

  const handleDelete = (id: string) => {
    if (!confirm('¿Está seguro de que desea eliminar este anuncio?')) {
      return;
    }

    startTransition(async () => {
      const res = await deleteAnnouncement(id);
      if (res.error) {
        alert(res.error);
      } else {
        setAnnouncements(announcements.filter((ann) => ann.id !== id));
      }
    });
  };

  const getTargetRoleLabel = (role: string) => {
    switch (role) {
      case 'all':
        return 'Toda la Comunidad';
      case 'teacher':
        return 'Docentes';
      case 'student':
        return 'Estudiantes';
      case 'representative':
        return 'Representantes';
      default:
        return role;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Create Announcement Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit space-y-4">
        <h3 className="text-md font-bold text-slate-900 tracking-tight">Publicar Comunicado</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMessage && (
            <div className="bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold p-2.5 rounded">
              {errorMessage}
            </div>
          )}

          {successMessage && (
            <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold p-2.5 rounded">
              {successMessage}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Título del Anuncio
            </label>
            <input
              type="text"
              required
              placeholder="Ej. Suspensión de actividades / Entrega de boletas..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Audiencia Destino
            </label>
            <select
              value={targetRole}
              onChange={(e) => setTargetRole(e.target.value as any)}
              className="block w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-800"
            >
              {userRole === 'admin' ? (
                <>
                  <option value="all">Toda la Comunidad ('all')</option>
                  <option value="teacher">Solo Docentes ('teacher')</option>
                  <option value="student">Solo Estudiantes ('student')</option>
                  <option value="representative">Solo Representantes ('representative')</option>
                </>
              ) : (
                <>
                  <option value="student">Solo Estudiantes ('student')</option>
                  <option value="representative">Solo Representantes ('representative')</option>
                </>
              )}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Contenido del Mensaje
            </label>
            <textarea
              required
              placeholder="Escriba el comunicado detallado aquí..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={6}
              className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            {isPending ? 'Publicando...' : 'Publicar Anuncio'}
          </button>
        </form>
      </div>

      {/* Published Announcements List */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-md font-bold text-slate-900 tracking-tight">Mis Publicaciones</h3>

        <div className="space-y-4">
          {announcements.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
              No ha publicado ningún comunicado recientemente.
            </div>
          ) : (
            announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] font-bold text-indigo-750 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                        Destinatarios: {getTargetRoleLabel(ann.target_role)}
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
                    <h4 className="font-bold text-slate-900 text-sm leading-snug">
                      {ann.title}
                    </h4>
                    <p className="text-xs text-slate-600 whitespace-pre-wrap leading-relaxed">
                      {ann.content}
                    </p>
                  </div>
                </div>

                <div className="flex justify-end pt-3 border-t border-slate-100">
                  <button
                    onClick={() => handleDelete(ann.id)}
                    disabled={isPending}
                    className="text-xs font-semibold text-rose-650 hover:text-rose-800 transition-colors"
                  >
                    Eliminar Anuncio
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
