'use client';

import { useState, useTransition } from 'react';
import { requestAppointment } from '@/app/dashboard/actions';

interface RepresentativeAppointmentsManagerProps {
  staffList: any[];
  initialAppointments: any[];
}

export default function RepresentativeAppointmentsManager({
  staffList,
  initialAppointments,
}: RepresentativeAppointmentsManagerProps) {
  const [appointments, setAppointments] = useState(initialAppointments);
  const [targetUserId, setTargetUserId] = useState(
    staffList.length > 0 ? staffList[0].id : ''
  );
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [isPending, startTransition] = useTransition();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    if (!targetUserId || !date || !time || !reason) {
      setErrorMessage('Por favor complete todos los campos obligatorios.');
      return;
    }

    // Basic date validation (must be future date)
    const selectedDate = new Date(`${date}T${time}`);
    const now = new Date();
    if (selectedDate <= now) {
      setErrorMessage('La fecha y hora sugeridas deben ser en el futuro.');
      return;
    }

    startTransition(async () => {
      const result = await requestAppointment({
        targetUserId,
        date,
        time,
        reason,
      });

      if (result.error) {
        setErrorMessage(result.error);
      } else {
        setSuccessMessage('¡Solicitud de cita enviada exitosamente!');
        setDate('');
        setTime('');
        setReason('');

        // Optimistically add the new appointment to the local list
        const targetStaff = staffList.find((s) => s.id === targetUserId);
        setAppointments([
          {
            id: Math.random().toString(),
            appointment_date: date,
            appointment_time: time,
            status: 'pending',
            reason: reason,
            notes: null,
            host: targetStaff,
            created_at: new Date().toISOString(),
          },
          ...appointments,
        ]);

        setTimeout(() => setSuccessMessage(''), 3000);
      }
    });
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'approved':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'rejected':
        return 'text-rose-700 bg-rose-50 border-rose-200';
      case 'completed':
        return 'text-slate-700 bg-slate-100 border-slate-200';
      default:
        return 'text-amber-700 bg-amber-50 border-amber-200';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Aprobada';
      case 'rejected':
        return 'Rechazada';
      case 'completed':
        return 'Completada';
      default:
        return 'Pendiente';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Request Form */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit space-y-4">
        <h3 className="text-md font-bold text-slate-900 tracking-tight">Solicitar Cita</h3>

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
              Personal a contactar
            </label>
            <select
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="block w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-slate-800"
            >
              {staffList.map((staff) => (
                <option key={staff.id} value={staff.id}>
                  {staff.role === 'admin' ? '[Directivo]' : '[Docente]'} {staff.first_name} {staff.last_name}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Fecha Sugerida
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hora Sugerida
              </label>
              <input
                type="time"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Motivo de la reunión
            </label>
            <textarea
              required
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describa brevemente el asunto a tratar..."
              rows={3}
              className="appearance-none block w-full px-3 py-2 border border-slate-300 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 text-xs resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2 bg-slate-900 text-white rounded-md text-xs font-semibold hover:bg-slate-800 transition-colors flex items-center justify-center"
          >
            {isPending ? 'Enviando solicitud...' : 'Solicitar Reunión'}
          </button>
        </form>
      </div>

      {/* Appointment History */}
      <div className="lg:col-span-2 space-y-4">
        <h3 className="text-md font-bold text-slate-900 tracking-tight">Historial de Citas</h3>

        <div className="space-y-3">
          {appointments.length === 0 ? (
            <div className="bg-white p-8 rounded-xl border border-slate-200 text-center text-slate-500 text-xs">
              Usted no ha solicitado ninguna cita todavía.
            </div>
          ) : (
            appointments.map((appt: any) => (
              <div
                key={appt.id}
                className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3 flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded uppercase">
                      {appt.host?.role === 'admin' ? 'Dirección' : 'Docente'}
                    </span>
                    <span className="text-[10px] font-semibold text-slate-800">
                      {appt.host?.first_name} {appt.host?.last_name}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm leading-snug">
                    {appt.reason}
                  </h4>
                  {appt.notes && (
                    <p className="text-xs text-slate-650 bg-slate-50 p-2.5 rounded border border-slate-150">
                      <strong>Nota de respuesta:</strong> {appt.notes}
                    </p>
                  )}
                </div>

                <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-2">
                  <div className="text-left md:text-right">
                    <span className="block text-xs font-bold text-slate-900">
                      {new Date(appt.appointment_date + 'T00:00:00').toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      })}
                    </span>
                    <span className="text-xs text-slate-400 block mt-0.5">{appt.appointment_time}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadgeClass(appt.status)}`}>
                    {getStatusText(appt.status)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
