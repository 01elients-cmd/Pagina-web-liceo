'use client';

import { useState } from 'react';

interface RepresentativeGradesViewProps {
  students: any[];
}

export default function RepresentativeGradesView({ students }: RepresentativeGradesViewProps) {
  const [activeStudentId, setActiveStudentId] = useState(
    students.length > 0 ? students[0].id : null
  );

  if (students.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center text-slate-500 space-y-3">
        <svg className="h-10 w-10 text-slate-350 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
        <div>
          <h3 className="font-bold text-slate-900">Sin Representados Vinculados</h3>
          <p className="text-xs text-slate-500 mt-1">
            No se han encontrado perfiles de estudiantes vinculados a su cuenta de representante.
          </p>
        </div>
      </div>
    );
  }

  const activeStudent = students.find((s) => s.id === activeStudentId) || students[0];
  const studentGrades = activeStudent.grades || [];

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
            {activeStudent.grade_level || 'Grado no asignado'}
          </span>
        </div>
      )}

      {/* Grades Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {studentGrades.length === 0 ? (
          <div className="p-8 text-center text-slate-500 space-y-2">
            <svg className="h-8 w-8 text-slate-350 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-sm font-semibold">Aún no hay calificaciones registradas para este período.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Materia</th>
                  <th className="px-6 py-3">Docente</th>
                  <th className="px-6 py-3">Lapso/Período</th>
                  <th className="px-6 py-3">Nota</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {studentGrades.map((gradeRow: any) => {
                  const subject = gradeRow.subjects;
                  const teacher = subject?.profiles;
                  return (
                    <tr key={gradeRow.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {subject?.name || 'Materia desconocida'}
                      </td>
                      <td className="px-6 py-4 text-slate-600">
                        {teacher ? `${teacher.first_name} ${teacher.last_name}` : 'Asignación pendiente'}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {gradeRow.term} <span className="text-xs text-slate-400">({gradeRow.weight}%)</span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`text-base font-bold px-2 py-0.5 rounded ${
                            gradeRow.grade >= 10
                              ? 'text-emerald-700 bg-emerald-50'
                              : 'text-rose-700 bg-rose-50'
                          }`}
                        >
                          {Number(gradeRow.grade).toFixed(2)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
