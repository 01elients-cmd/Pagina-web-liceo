'use client';

import { useActionState } from 'react';
import { login } from './actions';
import Link from 'next/link';

export default function LoginPage() {
  // useActionState handles server actions state, dispatching and loading state natively
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex justify-center">
            {/* Institutional Academic Shield Icon */}
            <div className="h-12 w-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-800">
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5zm0 0v6" />
              </svg>
            </div>
          </div>
          <h2 className="mt-6 text-center text-2xl font-bold text-slate-900 tracking-tight">
            U.E. Dr. José María Vargas
          </h2>
          <p className="mt-1 text-center text-sm text-slate-500">
            Control de Acceso Educativo y Administrativo
          </p>
        </div>
        
        <form className="mt-8 space-y-5" action={formAction}>
          {state?.error && (
            <div className="rounded-md bg-red-50 p-3 border border-red-200">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-2">
                  <p className="text-xs font-semibold text-red-800">{state.error}</p>
                </div>
              </div>
            </div>
          )}
          
          <div className="space-y-3">
            <div>
              <label htmlFor="email" className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                placeholder="ejemplo@vargas.edu"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-medium text-slate-700 uppercase tracking-wider mb-1">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-800 focus:border-slate-800 text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 text-slate-800 focus:ring-slate-800 border-slate-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-1.5 block text-slate-600">
                Recordarme
              </label>
            </div>

            <div className="text-xs">
              <a href="#" className="font-medium text-slate-800 hover:underline">
                ¿Olvidó su contraseña?
              </a>
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-semibold rounded-md text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-950 disabled:opacity-50 transition-colors"
            >
              {isPending && (
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              )}
              {isPending ? 'Iniciando sesión...' : 'Ingresar'}
            </button>
          </div>
        </form>
        
        <div className="mt-4 text-center">
          <Link href="/" className="inline-flex items-center text-xs font-semibold text-slate-600 hover:text-slate-900 transition-colors">
            <svg className="h-3.5 w-3.5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Volver a la página principal
          </Link>
        </div>
      </div>
    </div>
  );
}
