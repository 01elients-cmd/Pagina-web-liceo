'use client';

import { useState, useTransition } from 'react';
import { updateAppointmentStatus } from '@/app/dashboard/actions';

interface StaffAppointmentsManagerProps {
  initialAppointments: any[];
}

export default function StaffAppointmentsManager({
  initialAppointments,
}: StaffAppointmentsManagerProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [notesInput, setNotesInput] = useState<{ [apptId: string]: string }>({});
  const [isPending, startTransition] = useTransition();

  const handleAction = (
    appointmentId: string,
    status: 'approved' | 'rejected' | 'completed'
  ) => {
    const notes = notesInput[appointmentId] || '';

    startTransition(async () => {
      const result = await updateAppointmentStatus(appointmentId, status, notes);

      if (result.error) {
        alert(result.error);
      } else {
        // Update local state status
        setAppointments(
          appointments.map((appt) =>
            appt.id === appointmentId
              ? { ...appt, status, notes: notes || appt.notes }
              : appt
          )
        );
        // Clear notes input for this appointment
        setNotesInput((prev) => {
          const updated = { ...prev };
          delete updated[appointmentId];
          return updated;
        });
      }
    });
  };

  const handleNotesChange = (apptId: string, val: string) => {
    setNotesInput((prev) => ({
      ...prev,
      [apptId]: val,
    }));
  };

  const pendingAppts = appointments.filter((a) => a.status === 'pending');
  const approvedAppts = appointments.filter((a) => a.status === 'approved');
  const pastAppts = appointments.filter((a) => a.status === 'rejected' || a.status === 'completed');

  return (
    <div className="space-y-8">
      {/* 1. Solicitudes Pendientes */}
      <div className="space-y-4">
        <h3 className="text-md font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Solicitudes Pendientes</span>
          {pendingAppts.length > 0 && (
            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-250">
              {pendingAppts.length}
            </span>
          )}
        </h3>

        {pendingAppts.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
            No tiene solicitudes de citas pendientes de atención.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pendingAppts.map((appt: any) => (
              <div
                key={appt.id}
                className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded uppercase">
                      Representante
                    </span>
                    <span className="text-xs font-semibold text-slate-900">
                      {appt.representative?.first_name} {appt.representative?.last_name}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 leading-relaxed bg-slate-50 p-3 rounded border border-slate-150">
                    <p><strong>Fecha/Hora:</strong> {new Date(appt.appointment_date + 'T00:00:00').toLocaleDateString('es-ES')} a las {appt.appointment_time}</p>
                    <p className="mt-1"><strong>Motivo:</strong> "{appt.reason}"</p>
                  </div>
                </div>

                <div className="space-y-3 pt-2 border-t border-slate-100">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                      Nota de respuesta (Opcional)
                    </label>
                    <input
                      type="text"
                      placeholder="Ej. Reunión por Meet / Favor asistir con cédula..."
                      value={notesInput[appt.id] || ''}
                      onChange={(e) => handleNotesChange(appt.id, e.target.value)}
                      className="appearance-none block w-full px-2.5 py-1.5 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs"
                    />
                  </div>
                  <div className="flex gap-2 justify-end">
                    <button
                      onClick={() => handleAction(appt.id, 'rejected')}
                      disabled={isPending}
                      className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 font-semibold rounded text-xs transition-colors"
                    >
                      Rechazar
                    </button>
                    <button
                      onClick={() => handleAction(appt.id, 'approved')}
                      disabled={isPending}
                      className="px-3 py-1.5 bg-slate-900 text-white hover:bg-slate-800 font-semibold rounded text-xs transition-colors"
                    >
                      Aprobar Cita
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 2. Citas Aprobadas (Agenda) */}
      <div className="space-y-4">
        <h3 className="text-md font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <span>Agenda (Citas Aprobadas)</span>
          {approvedAppts.length > 0 && (
            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-250">
              {approvedAppts.length}
            </span>
          )}
        </h3>

        {approvedAppts.length === 0 ? (
          <div className="bg-white p-6 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
            No hay citas confirmadas en su agenda actual.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {approvedAppts.map((appt: any) => (
              <div
                key={appt.id}
                className="bg-white p-5 rounded-xl border border-slate-200 border-l-4 border-l-emerald-500 shadow-sm flex flex-col justify-between gap-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800">
                      {appt.representative?.first_name} {appt.representative?.last_name}
                    </span>
                    <span className="text-[9px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded uppercase">
                      Confirmada
                    </span>
                  </div>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Fecha/Hora:</strong> {new Date(appt.appointment_date + 'T00:00:00').toLocaleDateString('es-ES')} a las {appt.appointment_time}</p>
                    <p><strong>Asunto:</strong> {appt.reason}</p>
                    {appt.notes && <p><strong>Respuesta:</strong> "{appt.notes}"</p>}
                  </div>
                </div>

                <div className="flex justify-end pt-2 border-t border-slate-100">
                  <button
                    onClick={() => handleAction(appt.id, 'completed')}
                    disabled={isPending}
                    className="px-3 py-1.5 bg-slate-100 text-slate-700 hover:bg-slate-200 font-semibold rounded text-xs transition-colors"
                  >
                    Marcar como Realizada
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 3. Historial (Citas pasadas o rechazadas) */}
      {pastAppts.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-md font-bold text-slate-900 tracking-tight">Historial de Reuniones</h3>
          
          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                <thead className="bg-slate-50 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-3">Representante</th>
                    <th className="px-6 py-3">Fecha/Hora</th>
                    <th className="px-6 py-3">Asunto</th>
                    <th className="px-6 py-3">Estatus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white">
                  {pastAppts.map((appt: any) => (
                    <tr key={appt.id} className="hover:bg-slate-50 transition-colors text-slate-700">
                      <td className="px-6 py-4 font-semibold text-slate-900">
                        {appt.representative?.first_name} {appt.representative?.last_name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {new Date(appt.appointment_date + 'T00:00:00').toLocaleDateString('es-ES')} - {appt.appointment_time}
                      </td>
                      <td className="px-6 py-4 max-w-xs truncate">
                        {appt.reason}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase ${
                          appt.status === 'completed'
                            ? 'text-slate-700 bg-slate-100 border-slate-250'
                            : 'text-rose-700 bg-rose-50 border-rose-250'
                        }`}>
                          {appt.status === 'completed' ? 'Realizada' : 'Rechazada'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
