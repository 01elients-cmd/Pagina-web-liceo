'use client';

import { useActionState } from 'react';
import { submitEnrollment } from './actions';
import Link from 'next/link';

export default function AdmisionPage() {
  const [state, formAction, isPending] = useActionState(submitEnrollment, null);

  if (state?.success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-xl border border-slate-200 shadow-sm text-center space-y-6">
          <div className="mx-auto h-12 w-12 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-slate-900">¡Registro Exitoso!</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              La solicitud de preinscripción de su representado ha sido recibida correctamente. El departamento de administración revisará la información y se pondrá en contacto con usted a través del correo electrónico proporcionado.
            </p>
          </div>
          <div className="pt-4">
            <Link 
              href="/"
              className="inline-flex w-full justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              Volver al Inicio
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
      <div className="max-w-xl mx-auto w-full bg-white p-8 rounded-xl border border-slate-200 shadow-sm space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center text-xs font-semibold text-slate-500 hover:text-slate-900 transition-colors mb-2">
            <svg className="h-3 w-3 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Inicio
          </Link>
          <h2 className="text-2xl font-bold text-slate-900">Reserva de Cupo y Preinscripción</h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto">
            Complete el siguiente formulario con la información del representante legal y del estudiante.
          </p>
        </div>

        <form action={formAction} className="space-y-6">
          {state?.error && (
            <div className="rounded-md bg-red-50 p-3.5 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2.5">
                  <p className="text-xs font-semibold text-red-800">{state.error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sección Representante */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-1.5 uppercase tracking-wider text-xs">
              Datos del Representante Legal
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="representative_first_name" className="block text-xs font-medium text-slate-700 mb-1">
                  Nombres
                </label>
                <input
                  type="text"
                  name="representative_first_name"
                  id="representative_first_name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                  placeholder="Ej. Juan Carlos"
                />
              </div>
              <div>
                <label htmlFor="representative_last_name" className="block text-xs font-medium text-slate-700 mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="representative_last_name"
                  id="representative_last_name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                  placeholder="Ej. Pérez Gómez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="representative_email" className="block text-xs font-medium text-slate-700 mb-1">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="representative_email"
                  id="representative_email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                  placeholder="juan.perez@ejemplo.com"
                />
              </div>
              <div>
                <label htmlFor="representative_phone" className="block text-xs font-medium text-slate-700 mb-1">
                  Teléfono de Contacto
                </label>
                <input
                  type="tel"
                  name="representative_phone"
                  id="representative_phone"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                  placeholder="Ej. 04141234567"
                />
              </div>
            </div>
          </div>

          {/* Sección Estudiante */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-slate-900 border-b border-slate-100 pb-1.5 uppercase tracking-wider text-xs">
              Datos del Estudiante
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student_first_name" className="block text-xs font-medium text-slate-700 mb-1">
                  Nombres
                </label>
                <input
                  type="text"
                  name="student_first_name"
                  id="student_first_name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                  placeholder="Ej. Luis Alejandro"
                />
              </div>
              <div>
                <label htmlFor="student_last_name" className="block text-xs font-medium text-slate-700 mb-1">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="student_last_name"
                  id="student_last_name"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                  placeholder="Ej. Pérez Pérez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student_birth_date" className="block text-xs font-medium text-slate-700 mb-1">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="student_birth_date"
                  id="student_birth_date"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                />
              </div>
              <div>
                <label htmlFor="grade_level" className="block text-xs font-medium text-slate-700 mb-1">
                  Grado / Año a Cursar
                </label>
                <select
                  name="grade_level"
                  id="grade_level"
                  required
                  className="block w-full px-3 py-2 border border-slate-300 bg-white text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                >
                  <option value="">Seleccione el nivel...</option>
                  <option value="1er Año">1er Año de Bachillerato</option>
                  <option value="2do Año">2do Año de Bachillerato</option>
                  <option value="3er Año">3er Año de Bachillerato</option>
                  <option value="4to Año">4to Año de Bachillerato</option>
                  <option value="5to Año">5to Año de Bachillerato</option>
                </select>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-950 disabled:opacity-50 transition-colors shadow-sm"
            >
              {isPending && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isPending ? 'Enviando solicitud...' : 'Registrar Preinscripción'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
