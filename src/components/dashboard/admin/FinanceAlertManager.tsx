'use client';

import { useState } from 'react';
import { sendFinancialAlert } from '@/app/dashboard/actions';

interface Representative {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export default function FinanceAlertManager({
  representatives,
}: {
  representatives: Representative[];
}) {
  const [selectedRepId, setSelectedRepId] = useState('');
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRepId) {
      setStatusMsg({ type: 'error', text: 'Por favor seleccione un representante.' });
      return;
    }
    if (!concept) {
      setStatusMsg({ type: 'error', text: 'Por favor ingrese el concepto del compromiso de pago.' });
      return;
    }

    setLoading(true);
    setStatusMsg(null);

    const title = 'Compromiso de Pago Pendiente';
    const finalMessage = amount
      ? `${concept} — Monto estimado: Ref ${amount}`
      : concept;

    const result = await sendFinancialAlert(selectedRepId, title, finalMessage);
    setLoading(false);

    if (result.success) {
      setStatusMsg({ type: 'success', text: 'Alerta financiera emitida e insertada con éxito.' });
      setSelectedRepId('');
      setConcept('');
      setAmount('');
    } else {
      setStatusMsg({ type: 'error', text: result.error || 'Ocurrió un error al emitir la alerta.' });
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
      
      <div className="bg-slate-900 px-6 py-4 text-white">
        <h2 className="text-base font-bold">Generación de Alerta de Cobro</h2>
        <p className="text-xs text-slate-350 mt-0.5">
          Notifique inmediatamente al representante seleccionado sobre cuotas, mensualidades u obligaciones administrativas vencidas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        
        {/* Representative Dropdown */}
        <div className="space-y-1.5">
          <label htmlFor="representative" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
            Representante Legal *
          </label>
          <select
            id="representative"
            value={selectedRepId}
            onChange={(e) => setSelectedRepId(e.target.value)}
            disabled={loading}
            className="w-full bg-white border border-slate-355 rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            required
          >
            <option value="">-- Seleccione el Representante a notificar --</option>
            {representatives.map((rep) => (
              <option key={rep.id} value={rep.id}>
                {rep.first_name} {rep.last_name} ({rep.email})
              </option>
            ))}
          </select>
        </div>

        {/* Concept Input */}
        <div className="space-y-1.5">
          <label htmlFor="concept" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
            Concepto de Obligación *
          </label>
          <textarea
            id="concept"
            rows={3}
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            disabled={loading}
            placeholder="Ej. Mensualidad escolar correspondiente al mes de Mayo 2026. Por favor acudir a caja."
            className="w-full bg-white border border-slate-355 rounded-lg p-2.5 text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            required
          />
        </div>

        {/* Amount Input (Optional) */}
        <div className="space-y-1.5">
          <label htmlFor="amount" className="block text-xs font-bold text-slate-700 uppercase tracking-wide">
            Monto Referencial (Opcional)
          </label>
          <div className="relative">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm font-semibold">
              $
            </span>
            <input
              id="amount"
              type="number"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={loading}
              placeholder="0.00"
              className="w-full pl-7 pr-4 py-2.5 border border-slate-355 rounded-lg text-sm focus:outline-hidden focus:ring-1 focus:ring-slate-900 focus:border-slate-900"
            />
          </div>
          <span className="block text-[10px] text-slate-400">
            Se concatenará en la alerta para facilitar la visualización del saldo.
          </span>
        </div>

        {/* Status Message */}
        {statusMsg && (
          <div
            className={`p-3.5 rounded-lg text-xs font-semibold ${
              statusMsg.type === 'success'
                ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
                : 'bg-rose-50 border border-rose-200 text-rose-800'
            }`}
          >
            {statusMsg.text}
          </div>
        )}

        {/* Action Button */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto text-xs font-bold bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg transition-colors shadow-xs disabled:opacity-50"
          >
            {loading ? 'Emitiendo Alerta...' : 'Emitir Alerta Financiera'}
          </button>
        </div>

      </form>
    </div>
  );
}
