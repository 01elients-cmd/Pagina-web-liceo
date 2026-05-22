'use client';

import { useActionState, useState } from 'react';
import { login } from './actions';
import Link from 'next/link';

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#071629] relative overflow-hidden px-4 py-12 sm:px-6 lg:px-8 font-sans">
      {/* Background blobs for depth */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-brand-blue/35 filter blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-brand-green/25 filter blur-[120px] pointer-events-none"></div>

      <div className="max-w-md w-full space-y-8 bg-white/95 backdrop-blur-md p-10 rounded-3xl border border-white/20 shadow-2xl z-10 animate-fade-in-up">
        <div className="space-y-4">
          <div className="flex justify-center">
            {/* Elegant Institutional Shield Logo */}
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-blue to-brand-green flex items-center justify-center p-0.5 shadow-lg relative group">
              <div className="h-full w-full bg-white rounded-full flex items-center justify-center overflow-hidden relative">
                <img src="/logo-liceo.png" alt="Logo U.E. Dr. José María Vargas" className="h-full w-full object-cover" />
              </div>
              <div className="absolute -right-1 -top-1 w-4 h-4 bg-brand-gold rounded-full border border-white flex items-center justify-center shadow-xs">
                <span className="text-white text-[8px]">★</span>
              </div>
            </div>
          </div>
          
          <div className="text-center space-y-1.5">
            <h2 className="text-2xl font-black text-brand-blue tracking-tight">
              U.E. Dr. José María Vargas
            </h2>
            <p className="text-xs font-semibold text-brand-green uppercase tracking-widest">
              Expediente Vargas
            </p>
            <p className="text-xs text-slate-400">
              Control de Acceso Educativo y Administrativo
            </p>
          </div>
        </div>
        
        <form className="mt-8 space-y-6" action={formAction}>
          {state?.error && (
            <div className="rounded-2xl bg-rose-50 p-4 border border-rose-250 animate-fade-in">
              <div className="flex gap-2">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-rose-600" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-rose-800">Error de Autenticación</p>
                  <p className="text-[11px] text-rose-700 mt-0.5">{state.error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">
                Correo Electrónico
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.206" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full pl-10 pr-3 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green text-sm transition-all bg-slate-50/50 focus:bg-white"
                  placeholder="ejemplo@vargas.edu.ve"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1.5 pl-1">
                Contraseña
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="appearance-none block w-full pl-10 pr-10 py-2.5 border border-slate-200 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-green/10 focus:border-brand-green text-sm transition-all bg-slate-50/50 focus:bg-white"
                  placeholder="••••••••"
                />
                {/* Show/Hide password toggle */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-650 transition-colors"
                >
                  {showPassword ? (
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-brand-blue focus:ring-brand-green border-slate-300 rounded-sm focus:ring-2 accent-brand-green"
              />
              <label htmlFor="remember-me" className="ml-2 block text-slate-500 font-semibold">
                Recordarme
              </label>
            </div>

            <div>
              <a href="#" className="font-semibold text-brand-green hover:text-brand-green-hover transition-colors">
                ¿Olvidó su contraseña?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={isPending}
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-brand-green hover:bg-brand-green-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-green-hover disabled:opacity-50 transition-all shadow-md hover:scale-[1.01]"
            >
              {isPending ? (
                <div className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span>Iniciando sesión...</span>
                </div>
              ) : (
                'Ingresar al Portal'
              )}
            </button>
          </div>
        </form>
        
        <div className="text-center pt-2">
          <Link href="/" className="inline-flex items-center text-xs font-bold text-slate-500 hover:text-brand-blue transition-colors gap-1">
            <svg className="h-3.5 w-3.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}

