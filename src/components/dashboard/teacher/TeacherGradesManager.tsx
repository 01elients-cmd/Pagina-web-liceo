'use client';

import { useState, useTransition } from 'react';
import { saveGrade, deleteGrade } from '@/app/dashboard/actions';

interface TeacherGradesManagerProps {
  subjects: any[];
  students: any[];
  initialGrades: any[];
}

export default function TeacherGradesManager({
  subjects,
  students,
  initialGrades,
}: TeacherGradesManagerProps) {
  const [selectedSubjectId, setSelectedSubjectId] = useState(
    subjects.length > 0 ? subjects[0].id : ''
  );
  const [selectedTerm, setSelectedTerm] = useState('1er Lapso');
  const [grades, setGrades] = useState(initialGrades);
  
  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalStudent, setModalStudent] = useState<any>(null);
  const [modalGradeId, setModalGradeId] = useState<string | undefined>(undefined);
  const [gradeInput, setGradeInput] = useState('');
  const [weightInput, setWeightInput] = useState('20');
  const [descriptionInput, setDescriptionInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const [isPending, startTransition] = useTransition();

  if (subjects.length === 0) {
    return (
      <div className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center text-slate-500">
        <svg className="h-10 w-10 text-slate-400 mx-auto mb-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 006 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 016 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 016-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0018 18a8.967 8.967 0 00-6 2.292m0-14.25v14.25" />
        </svg>
        <h3 className="font-bold text-slate-900">Sin Materias Asignadas</h3>
        <p className="text-xs text-slate-500 mt-1">
          No tiene materias asignadas en el sistema. Comuníquese con la dirección del plantel.
        </p>
      </div>
    );
  }

  const activeSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];
  
  // Filter students whose grade_level matches the active subject
  const activeStudents = students.filter(
    (student) => student.grade_level === activeSubject.grade_level
  );

  const openGradeModal = (student: any, existingGrade?: any) => {
    setModalStudent(student);
    setErrorMessage('');
    if (existingGrade) {
      setModalGradeId(existingGrade.id);
      setGradeInput(existingGrade.grade.toString());
      setWeightInput(existingGrade.weight.toString());
      setDescriptionInput(existingGrade.description || '');
    } else {
      setModalGradeId(undefined);
      setGradeInput('');
      setWeightInput('20');
      setDescriptionInput('');
    }
    setIsModalOpen(true);
  };

  const handleModalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    const numGrade = parseFloat(gradeInput);
    const numWeight = parseFloat(weightInput);

    if (isNaN(numGrade) || numGrade < 0 || numGrade > 20) {
      setErrorMessage('La calificación debe estar comprendida entre 0.00 y 20.00.');
      return;
    }

    if (isNaN(numWeight) || numWeight <= 0 || numWeight > 100) {
      setErrorMessage('El peso debe estar entre 0.01% y 100%.');
      return;
    }

    startTransition(async () => {
      const result = await saveGrade({
        id: modalGradeId,
        studentId: modalStudent.id,
        subjectId: activeSubject.id,
        grade: numGrade,
        term: selectedTerm,
        weight: numWeight,
        description: descriptionInput,
      });

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        // Optimistically update UI local state or rely on revalidation.
        // Let's just update local state to reflect changes instantly.
        if (modalGradeId) {
          setGrades(
            grades.map((g) =>
              g.id === modalGradeId
                ? { ...g, grade: numGrade, weight: numWeight, description: descriptionInput }
                : g
            )
          );
        } else {
          // Temporarily add to local state until full page refresh finishes
          setGrades([
            ...grades,
            {
              id: Math.random().toString(), // Temp ID
              student_id: modalStudent.id,
              subject_id: activeSubject.id,
              grade: numGrade,
              term: selectedTerm,
              weight: numWeight,
              description: descriptionInput,
            },
          ]);
        }
        setIsModalOpen(false);
      }
    });
  };

  const handleDelete = (gradeId: string) => {
    if (!confirm('¿Está seguro de que desea eliminar esta calificación?')) return;

    startTransition(async () => {
      const result = await deleteGrade(gradeId);
      if (result.error) {
        alert(result.error);
      } else {
        setGrades(grades.filter((g) => g.id !== gradeId));
      }
    });
  };

  return (
    <div className="space-y-6">
      {/* Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          {/* Subject Selector */}
          <div className="flex-1 sm:flex-none">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Asignatura / Materia
            </label>
            <select
              value={selectedSubjectId}
              onChange={(e) => setSelectedSubjectId(e.target.value)}
              className="block w-full px-3 py-1.5 border border-slate-300 bg-white text-slate-900 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
            >
              {subjects.map((sub) => (
                <option key={sub.id} value={sub.id}>
                  {sub.name} ({sub.grade_level})
                </option>
              ))}
            </select>
          </div>

          {/* Term Selector */}
          <div className="flex-1 sm:flex-none">
            <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
              Lapso Académico
            </label>
            <select
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="block w-full px-3 py-1.5 border border-slate-300 bg-white text-slate-900 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-slate-800"
            >
              <option value="1er Lapso">1er Lapso</option>
              <option value="2do Lapso">2do Lapso</option>
              <option value="3er Lapso">3er Lapso</option>
            </select>
          </div>
        </div>

        <div className="text-xs text-slate-500 font-semibold bg-slate-50 px-3 py-1.5 rounded-lg border">
          Estudiantes en nivel: <span className="font-bold text-slate-900">{activeSubject.grade_level}</span>
        </div>
      </div>

      {/* Students and Grades Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
        {activeStudents.length === 0 ? (
          <div className="p-8 text-center text-slate-500">
            No hay estudiantes registrados en el nivel {activeSubject.grade_level}.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
              <thead className="bg-slate-50 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-3">Estudiante</th>
                  <th className="px-6 py-3">Descripción</th>
                  <th className="px-6 py-3">Peso</th>
                  <th className="px-6 py-3">Calificación</th>
                  <th className="px-6 py-3 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {activeStudents.map((student) => {
                  // Find grade for this student, selected subject, and selected term
                  const gradeRecord = grades.find(
                    (g) =>
                      g.student_id === student.id &&
                      g.subject_id === activeSubject.id &&
                      g.term === selectedTerm
                  );

                  return (
                    <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {student.first_name} {student.last_name}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {gradeRecord ? gradeRecord.description || 'Sin descripción' : '—'}
                      </td>
                      <td className="px-6 py-4 text-slate-500">
                        {gradeRecord ? `${gradeRecord.weight}%` : '—'}
                      </td>
                      <td className="px-6 py-4">
                        {gradeRecord ? (
                          <span
                            className={`text-sm font-bold px-2 py-0.5 rounded ${
                              gradeRecord.grade >= 10
                                ? 'text-emerald-700 bg-emerald-50'
                                : 'text-rose-700 bg-rose-50'
                            }`}
                          >
                            {Number(gradeRecord.grade).toFixed(2)} / 20.00
                          </span>
                        ) : (
                          <span className="text-xs text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                            Sin calificar
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {gradeRecord ? (
                          <div className="inline-flex gap-2">
                            <button
                              onClick={() => openGradeModal(student, gradeRecord)}
                              className="text-xs font-semibold text-slate-700 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded transition-colors"
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => handleDelete(gradeRecord.id)}
                              className="text-xs font-semibold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-1 rounded transition-colors"
                            >
                              Eliminar
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => openGradeModal(student)}
                            className="text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 px-2.5 py-1 rounded transition-colors"
                          >
                            Cargar Nota
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Grade Loading/Editing Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl border border-slate-200 shadow-xl max-w-md w-full overflow-hidden">
            {/* Modal Header */}
            <div className="bg-slate-50 border-b border-slate-150 px-6 py-4 flex items-center justify-between">
              <h3 className="font-bold text-slate-900">
                {modalGradeId ? 'Editar Calificación' : 'Cargar Calificación'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 outline-none"
              >
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleModalSubmit} className="p-6 space-y-4">
              <div className="text-xs bg-slate-50 p-2.5 rounded border border-slate-150 text-slate-650">
                <p>
                  <strong>Estudiante:</strong> {modalStudent?.first_name} {modalStudent?.last_name}
                </p>
                <p className="mt-1">
                  <strong>Evaluación:</strong> {activeSubject.name} — {selectedTerm}
                </p>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs font-semibold p-2.5 rounded">
                  {errorMessage}
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                  Nota (0.00 a 20.00)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  max="20"
                  required
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  placeholder="Ej. 18.50"
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Peso (%)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.1"
                    max="100"
                    required
                    value={weightInput}
                    onChange={(e) => setWeightInput(e.target.value)}
                    placeholder="Ej. 20"
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                    Detalle (Ej. Examen 1)
                  </label>
                  <input
                    type="text"
                    value={descriptionInput}
                    onChange={(e) => setDescriptionInput(e.target.value)}
                    placeholder="Ej. Examen Álgebra"
                    className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-sm"
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-slate-200 text-slate-700 rounded-md text-xs font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="px-4 py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center"
                >
                  {isPending ? 'Guardando...' : 'Guardar Calificación'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
