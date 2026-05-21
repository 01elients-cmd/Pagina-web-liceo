'use client';

import { useState } from 'react';

interface RepresentativeLibraryViewProps {
  students: any[];
  resources: any[];
}

export default function RepresentativeLibraryView({
  students,
  resources,
}: RepresentativeLibraryViewProps) {
  const [activeStudentId, setActiveStudentId] = useState(
    students.length > 0 ? students[0].id : null
  );

  if (students.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500">
        No se han encontrado estudiantes vinculados a su cuenta.
      </div>
    );
  }

  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0];
  
  // Filter resources to those matching the active student's grade level
  const studentResources = resources.filter(
    (res) => res.subjects?.grade_level === activeStudent.grade_level
  );

  return (
    <div className="space-y-6">
      {/* Student Selector Tabs */}
      {students.length > 1 && (
        <div className="flex border-b border-slate-200 overflow-x-auto pb-px">
          {students.map((student) => (
            <button
              key={student.id}
              onClick={() => setActiveStudentId(student.id)}
              className={`py-2.5 px-4 font-semibold text-sm border-b-2 whitespace-nowrap transition-colors -mb-px outline-none ${
                activeStudentId === student.id
                  ? 'border-slate-900 text-slate-900 font-bold'
                  : 'border-transparent text-slate-500 hover:text-slate-950'
              }`}
            >
              {student.first_name} {student.last_name}
              <span className="ml-2 text-xs font-normal text-slate-400">
                ({student.grade_level || 'Sin grado'})
              </span>
            </button>
          ))}
        </div>
      )}

      {/* Single Student Info Bar */}
      {students.length === 1 && (
        <div className="bg-white px-4 py-3 rounded-lg border border-slate-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Estudiante:</span>
            <span className="text-sm font-bold text-slate-900">
              {activeStudent.first_name} {activeStudent.last_name}
            </span>
          </div>
          <span className="text-xs font-semibold text-slate-650 bg-slate-50 border px-2 py-0.5 rounded">
            {activeStudent.grade_level || 'Sin nivel'}
          </span>
        </div>
      )}

      {/* Resources Display */}
      {studentResources.length === 0 ? (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center text-slate-500 space-y-2">
          <svg className="h-10 w-10 text-slate-300 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
          </svg>
          <p className="text-xs font-semibold">No se han subido materiales de estudio para el grado de este estudiante.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentResources.map((res: any) => {
            const subject = res.subjects;
            const teacher = res.profiles;
            return (
              <div
                key={res.id}
                className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xs hover:border-slate-350 transition-all flex flex-col justify-between overflow-hidden"
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
  );
}
