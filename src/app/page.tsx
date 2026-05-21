import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Header/Navbar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-lg bg-slate-900 flex items-center justify-center text-white">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 tracking-tight text-lg">U.E. Dr. José María Vargas</span>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="text-slate-900 hover:text-slate-950">Inicio</Link>
            <Link href="/admision" className="hover:text-slate-950">Admisión 2026</Link>
            <Link href="#pilares" className="hover:text-slate-950">Valores</Link>
          </nav>

          <div>
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-4 py-1.5 border border-slate-200 text-sm font-semibold rounded-md bg-white hover:bg-slate-50 text-slate-900 shadow-sm transition-all"
            >
              Portal Privado
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200 py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 text-center sm:px-6 lg:px-8">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-800 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Proceso de Preinscripción Abierto
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Formación Académica con Propósito y Valores
          </h1>
          <p className="mt-6 text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            En la U.E. Dr. José María Vargas impulsamos la excelencia académica a través de herramientas tecnológicas avanzadas, garantizando una educación integral y adaptada a los retos del futuro.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/admision" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-md text-white bg-slate-900 hover:bg-slate-800 transition-colors shadow-sm"
            >
              Solicitar Cupo / Preinscripción
            </Link>
            <Link 
              href="#pilares" 
              className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold rounded-md border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-colors"
            >
              Conocer Propuesta Educativa
            </Link>
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section id="pilares" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex-1">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pilares de Nuestra Institución
          </h2>
          <p className="mt-3 text-slate-600 text-sm sm:text-base">
            Diseñamos un ecosistema formativo óptimo centrado en el desarrollo de capacidades.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 font-bold">
              01
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Alto Nivel Académico</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Currículo educativo enfocado en ciencias, matemáticas y humanidades, con seguimiento cercano por parte de docentes especializados.
              </p>
            </div>
          </div>

          {/* Pillar 2 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 font-bold">
              02
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Ecosistema Digital</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Acceso a biblioteca virtual, control de calificaciones y comunicación en tiempo real para representantes y estudiantes.
              </p>
            </div>
          </div>

          {/* Pillar 3 */}
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col gap-4">
            <div className="h-10 w-10 rounded-lg bg-slate-100 flex items-center justify-center text-slate-900 font-bold">
              03
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900">Valores Institucionales</h3>
              <p className="mt-2 text-sm text-slate-600 leading-relaxed">
                Formamos ciudadanos responsables, éticos y comprometidos con el desarrollo social, inspirados en el legado del Dr. José María Vargas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-2">
          <p className="font-semibold text-slate-700">U.E. Dr. José María Vargas</p>
          <p>© {new Date().getFullYear()} Todos los derechos reservados. Diseñado para un alto rendimiento y conexiones eficientes.</p>
        </div>
      </footer>
    </div>
  );
}
