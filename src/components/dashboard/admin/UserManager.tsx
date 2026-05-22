'use client';

import { useState } from 'react';
import { updateUserProfile } from '@/app/dashboard/actions';

interface Profile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  phone: string;
  grade_level: string | null;
  representative_id: string | null;
}

export default function UserManager({
  initialProfiles,
  representatives,
}: {
  initialProfiles: Profile[];
  representatives: Profile[];
}) {
  const [profiles, setProfiles] = useState<Profile[]>(initialProfiles);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editRole, setEditRole] = useState<string>('');
  const [editRepId, setEditRepId] = useState<string>('');
  const [editGrade, setEditGrade] = useState<string>('');
  const [isSaving, setIsSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleEditClick = (profile: Profile) => {
    setEditingId(profile.id);
    setEditRole(profile.role);
    setEditRepId(profile.representative_id || '');
    setEditGrade(profile.grade_level || '');
  };

  const handleCancel = () => {
    setEditingId(null);
  };

  const handleSave = async (id: string) => {
    setIsSaving(true);
    const updates = {
      role: editRole,
      representative_id: editRole === 'student' && editRepId ? editRepId : null,
      grade_level: editRole === 'student' && editGrade ? editGrade : null,
    };

    const result = await updateUserProfile(id, updates);
    setIsSaving(false);

    if (result.success) {
      setProfiles((prev) =>
        prev.map((p) =>
          p.id === id
            ? {
                ...p,
                role: editRole,
                representative_id: updates.representative_id,
                grade_level: updates.grade_level,
              }
            : p
        )
      );
      setEditingId(null);
    } else {
      alert(result.error || 'Ocurrió un error al actualizar el perfil.');
    }
  };

  // Filter profiles based on search term
  const filteredProfiles = profiles.filter((p) => {
    const fullName = `${p.first_name} ${p.last_name}`.toLowerCase();
    const email = p.email.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase()) || email.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="space-y-6">
      
      {/* Search and stats bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            type="text"
            placeholder="Buscar por nombre o correo electrónico..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
          />
        </div>
        <div className="text-xs text-slate-500 font-semibold">
          Mostrando {filteredProfiles.length} de {profiles.length} usuarios registrados
        </div>
      </div>

      {/* Grid / Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
            <thead className="bg-slate-50 text-xs font-bold text-slate-500 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Nombre Completo</th>
                <th className="px-6 py-3.5">Correo Electrónico</th>
                <th className="px-6 py-3.5">Rol Actual</th>
                <th className="px-6 py-3.5">Vinculación / Grado</th>
                <th className="px-6 py-3.5 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {filteredProfiles.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    No se encontraron usuarios coincidentes.
                  </td>
                </tr>
              ) : (
                filteredProfiles.map((p) => {
                  const isEditing = editingId === p.id;
                  const rep = representatives.find((r) => r.id === p.representative_id);

                  return (
                    <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-slate-900">
                          {p.first_name} {p.last_name}
                        </div>
                        <div className="text-xs text-slate-400">Tlf: {p.phone || 'No registrado'}</div>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{p.email}</td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          <select
                            value={editRole}
                            onChange={(e) => setEditRole(e.target.value)}
                            className="bg-white border border-slate-200 text-xs rounded-md p-1.5 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                          >
                            <option value="admin">Administrador</option>
                            <option value="teacher">Docente</option>
                            <option value="student">Estudiante</option>
                            <option value="representative">Representante</option>
                            <option value="visitor">Visitante</option>
                          </select>
                        ) : (
                          <span
                            className={`inline-block text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
                              p.role === 'admin'
                                ? 'bg-slate-900 text-white'
                                : p.role === 'teacher'
                                ? 'bg-indigo-50 text-indigo-700'
                                : p.role === 'student'
                                ? 'bg-emerald-50 text-emerald-700'
                                : p.role === 'representative'
                                ? 'bg-amber-50 text-amber-700'
                                : 'bg-slate-100 text-slate-600'
                            }`}
                          >
                            {p.role === 'admin'
                              ? 'Admin'
                              : p.role === 'teacher'
                              ? 'Docente'
                              : p.role === 'student'
                              ? 'Estudiante'
                              : p.role === 'representative'
                              ? 'Representante'
                              : 'Visitante'}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        {isEditing ? (
                          editRole === 'student' ? (
                            <div className="space-y-2">
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase">Grado</label>
                                <select
                                  value={editGrade}
                                  onChange={(e) => setEditGrade(e.target.value)}
                                  className="w-full bg-white border border-slate-200 text-xs rounded-md p-1.5 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                                >
                                  <option value="">Seleccione Grado...</option>
                                  <option value="1er Año">1er Año</option>
                                  <option value="2do Año">2do Año</option>
                                  <option value="3er Año">3er Año</option>
                                  <option value="4to Año">4to Año</option>
                                  <option value="5to Año">5to Año</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-[10px] font-bold text-slate-400 uppercase">Representante</label>
                                <select
                                  value={editRepId}
                                  onChange={(e) => setEditRepId(e.target.value)}
                                  className="w-full bg-white border border-slate-200 text-xs rounded-md p-1.5 focus:outline-hidden focus:ring-1 focus:ring-slate-900"
                                >
                                  <option value="">Vincular Representante...</option>
                                  {representatives.map((r) => (
                                    <option key={r.id} value={r.id}>
                                      {r.first_name} {r.last_name} ({r.email})
                                    </option>
                                  ))}
                                </select>
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )
                        ) : p.role === 'student' ? (
                          <div className="space-y-0.5">
                            <div className="text-xs font-semibold text-slate-700">
                              Nivel: <span className="font-bold">{p.grade_level || 'No asignado'}</span>
                            </div>
                            <div className="text-[11px] text-slate-500">
                              Tutor: {rep ? `${rep.first_name} ${rep.last_name}` : <span className="text-rose-500 font-medium">Sin Vincular</span>}
                            </div>
                          </div>
                        ) : (
                          <span className="text-xs text-slate-400">—</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {isEditing ? (
                          <div className="flex gap-2 justify-end">
                            <button
                              onClick={() => handleSave(p.id)}
                              disabled={isSaving}
                              className="text-xs font-semibold bg-slate-900 text-white px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition-colors disabled:opacity-50"
                            >
                              {isSaving ? 'Guardando...' : 'Guardar'}
                            </button>
                            <button
                              onClick={handleCancel}
                              disabled={isSaving}
                              className="text-xs font-semibold bg-white border border-slate-300 text-slate-700 px-2.5 py-1.5 rounded-md hover:bg-slate-50 transition-colors disabled:opacity-50"
                            >
                              Cancelar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleEditClick(p)}
                            className="text-xs font-semibold border border-slate-200 text-slate-700 px-3 py-1.5 rounded-lg hover:bg-slate-50 transition-colors"
                          >
                            Modificar
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
      
    </div>
  );
}
