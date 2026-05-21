'use client';

import { useState } from 'react';
import { markNotificationAsRead } from '@/app/dashboard/actions';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  created_at: string;
}

export default function NotificationList({
  initialNotifications,
}: {
  initialNotifications: Notification[];
}) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const handleMarkAsRead = async (id: string) => {
    setLoadingId(id);
    const result = await markNotificationAsRead(id);
    setLoadingId(null);

    if (result.success) {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } else {
      alert(result.error || 'No se pudo marcar la notificación como leída.');
    }
  };

  const activeNotifications = notifications.filter((n) => !n.is_read);

  if (activeNotifications.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3 w-full">
      {activeNotifications.map((notif) => {
        const isFinancial = notif.type === 'financial';

        return (
          <div
            key={notif.id}
            className={`p-4 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all shadow-sm ${
              isFinancial
                ? 'bg-rose-50 border-rose-200 text-rose-905'
                : 'bg-indigo-50 border-indigo-200 text-indigo-905'
            }`}
          >
            <div className="flex gap-3 items-start">
              <div className="flex-shrink-0 pt-0.5">
                {isFinancial ? (
                  <div className="h-9 w-9 rounded-lg bg-rose-100 flex items-center justify-center text-rose-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                ) : (
                  <div className="h-9 w-9 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                    </svg>
                  </div>
                )}
              </div>
              <div>
                <span
                  className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                    isFinancial ? 'bg-rose-100 text-rose-700' : 'bg-indigo-100 text-indigo-700'
                  }`}
                >
                  {isFinancial ? 'Compromiso Pendiente' : 'Notificación'}
                </span>
                <h4 className="text-sm font-bold mt-1 text-slate-900">{notif.title}</h4>
                <p className="text-xs text-slate-700 mt-0.5 leading-relaxed">{notif.message}</p>
              </div>
            </div>
            
            <button
              onClick={() => handleMarkAsRead(notif.id)}
              disabled={loadingId === notif.id}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg border transition-colors flex-shrink-0 self-end sm:self-center ${
                isFinancial
                  ? 'bg-white border-rose-300 hover:bg-rose-100 text-rose-700 disabled:opacity-50'
                  : 'bg-white border-indigo-300 hover:bg-indigo-100 text-indigo-700 disabled:opacity-50'
              }`}
            >
              {loadingId === notif.id ? 'Procesando...' : 'Marcar como leído'}
            </button>
          </div>
        );
      })}
    </div>
  );
}
