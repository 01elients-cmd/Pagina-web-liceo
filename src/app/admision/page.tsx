'use client';

import { useActionState } from 'react';
import { submitEnrollment } from './actions';
import Link from 'next/link';

export default function AdmisionPage() {
  const [state, formAction, isPending] = useActionState(submitEnrollment, null);

  if (state?.success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
        {/* Background gradient blur */}
        <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-blue/5 filter blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-brand-green/5 filter blur-[120px] pointer-events-none"></div>

        <div className="max-w-md w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl text-center space-y-6 z-10 animate-fade-in-up">
          <div className="mx-auto h-16 w-16 rounded-full bg-brand-green/10 flex items-center justify-center text-brand-green shadow-xs">
            <svg className="h-8 w-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <div className="space-y-3">
            <span className="inline-block text-[10px] font-extrabold uppercase tracking-widest bg-brand-green/10 text-brand-green px-3 py-1 rounded-full">
              Trámite Recibido
            </span>
            <h2 className="text-2xl font-black text-brand-blue leading-tight">¡Registro de Preinscripción Exitoso!</h2>
            <div className="h-px bg-slate-100 my-4"></div>
            <p className="text-xs text-slate-500 leading-relaxed text-left bg-slate-50 p-4 rounded-2xl border border-slate-150">
              La solicitud de preinscripción de su representado ha sido registrada en nuestro sistema de admisión 2026. 
              <br /><br />
              El departamento de control de admisiones revisará la información adjunta y le enviará un correo electrónico para indicarle los pasos a seguir y agendar su entrevista presencial en el plantel.
            </p>
          </div>

          <div className="pt-4 flex flex-col gap-2">
            <Link 
              href="/"
              className="inline-flex w-full justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-green hover:bg-brand-green-hover transition-all duration-300 shadow-md hover:scale-[1.01]"
            >
              Volver al Inicio
            </Link>
            <span className="text-[10px] text-slate-400 font-medium">U.E. Dr. José María Vargas • Admisión 2026</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-4 sm:px-6 lg:px-8 flex flex-col justify-center relative overflow-hidden font-sans">
      {/* Background blobs */}
      <div className="absolute top-[-25%] left-[-20%] w-[65%] h-[60%] rounded-full bg-brand-blue/5 filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-25%] right-[-20%] w-[65%] h-[60%] rounded-full bg-brand-green/5 filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-xl mx-auto w-full bg-white p-8 sm:p-10 rounded-3xl border border-slate-200 shadow-xl space-y-8 z-10 animate-fade-in-up">
        
        {/* Header Navigation Link */}
        <div className="flex justify-between items-center border-b border-slate-100 pb-4">
          <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-brand-blue transition-colors gap-1">
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver al Inicio
          </Link>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-gold animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-blue">Proceso Online</span>
          </div>
        </div>

        {/* Form Title */}
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-brand-blue tracking-tight">Reserva de Cupo y Preinscripción</h2>
          <p className="text-xs text-slate-400 max-w-sm mx-auto leading-normal">
            Complete el siguiente expediente digital con la información del representante legal y del estudiante aspirante.
          </p>
        </div>

        <form action={formAction} className="space-y-8">
          {state?.error && (
            <div className="rounded-2xl bg-rose-50 p-4 border border-rose-200 animate-fade-in">
              <div className="flex gap-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-rose-800">Verifique los Datos</p>
                  <p className="text-[11px] text-rose-700 mt-0.5">{state.error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Sección Representante (Paso 1) */}
          <div className="space-y-4 bg-slate-50/50 p-5 sm:p-6 rounded-2xl border border-slate-150">
            <div className="flex items-center gap-2.5 border-b border-slate-150/60 pb-3">
              <span className="h-7 w-7 rounded-lg bg-brand-blue flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                1
              </span>
              <h3 className="text-xs font-black text-brand-blue uppercase tracking-widest">
                Datos del Representante Legal
              </h3>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="representative_first_name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Nombres
                </label>
                <input
                  type="text"
                  name="representative_first_name"
                  id="representative_first_name"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue text-sm transition-all bg-white"
                  placeholder="Ej. Juan Carlos"
                />
              </div>
              <div>
                <label htmlFor="representative_last_name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="representative_last_name"
                  id="representative_last_name"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue text-sm transition-all bg-white"
                  placeholder="Ej. Pérez Gómez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="representative_email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  name="representative_email"
                  id="representative_email"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue text-sm transition-all bg-white"
                  placeholder="juan.perez@ejemplo.com"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="representative_phone" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                    Teléfono de Contacto Principal
                  </label>
                  <input
                    type="tel"
                    name="representative_phone"
                    id="representative_phone"
                    required
                    className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue text-sm transition-all bg-white"
                    placeholder="Ej. 04141234567"
                  />
                </div>
                <div>
                  <label htmlFor="representative_phone_alt" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                    Teléfono Secundario (Opcional)
                  </label>
                  <input
                    type="tel"
                    name="representative_phone_alt"
                    id="representative_phone_alt"
                    className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-blue/15 focus:border-brand-blue text-sm transition-all bg-white"
                    placeholder="Ej. 04247654321"
                  />
                </div>
              </div>
            </div>

          {/* Sección Estudiante (Paso 2) */}
          <div className="space-y-4 bg-slate-50/50 p-5 sm:p-6 rounded-2xl border border-slate-150">
            <div className="flex items-center gap-2.5 border-b border-slate-150/60 pb-3">
              <span className="h-7 w-7 rounded-lg bg-brand-green flex items-center justify-center text-white text-xs font-extrabold shadow-sm">
                2
              </span>
              <h3 className="text-xs font-black text-brand-green uppercase tracking-widest">
                Datos del Estudiante Aspirante
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student_first_name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Nombres
                </label>
                <input
                  type="text"
                  name="student_first_name"
                  id="student_first_name"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm transition-all bg-white"
                  placeholder="Ej. Luis Alejandro"
                />
              </div>
              <div>
                <label htmlFor="student_last_name" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Apellidos
                </label>
                <input
                  type="text"
                  name="student_last_name"
                  id="student_last_name"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm transition-all bg-white"
                  placeholder="Ej. Pérez Pérez"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="student_birth_date" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  name="student_birth_date"
                  id="student_birth_date"
                  required
                  className="appearance-none block w-full px-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm transition-all bg-white cursor-pointer"
                />
              </div>
              <div>
                <label htmlFor="grade_level" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-0.5">
                  Grado / Año a Cursar
                </label>
                <select
                  name="grade_level"
                  id="grade_level"
                  required
                  className="block w-full px-3 py-2.5 border border-slate-200 bg-white text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/15 focus:border-brand-green text-sm transition-all cursor-pointer"
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
              className="w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-green hover:bg-brand-green-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-hover disabled:opacity-50 transition-all shadow-md hover:scale-[1.01]"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Registrando solicitud...</span>
                </div>
              ) : (
                'Enviar Solicitud de Preinscripción'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

