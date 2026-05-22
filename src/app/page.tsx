import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-800 flex flex-col font-sans selection:bg-brand-green selection:text-white">
      {/* Top Banner Bar */}
      <div className="bg-brand-blue text-white py-2 text-xs font-semibold text-center border-b border-brand-blue-hover/50 px-4">
        <span>Rif: J-12345678-9 • Inscrito en el M.P.P.E. • Teléfono: +58 (212) 555-0199</span>
      </div>

      {/* Header/Navbar with Glassmorphism */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Institution Shield Logo SVG */}
            <div className="h-11 w-11 rounded-full bg-gradient-to-tr from-brand-blue to-brand-green flex items-center justify-center p-0.5 shadow-md">
              <div className="h-full w-full bg-white rounded-full flex items-center justify-center overflow-hidden relative">
                <svg className="h-7 w-7 text-brand-blue" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  {/* Outer Shield Ring */}
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
                {/* Visual Accent representation of gold ring */}
                <div className="absolute right-0 top-0 w-2.5 h-2.5 bg-brand-gold rounded-full border border-white"></div>
              </div>
            </div>
            <div>
              <span className="font-extrabold text-brand-blue tracking-tight text-md block leading-none">U.E. Dr. José María Vargas</span>
              <span className="text-[10px] text-brand-green font-semibold tracking-wider uppercase block mt-0.5">Academia • Ciencia • Identidad</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-slate-600">
            <Link href="/" className="text-brand-blue border-b-2 border-brand-green pb-1 px-1">Inicio</Link>
            <Link href="/admision" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Admisión 2026</Link>
            <Link href="#pilares" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Valores</Link>
            <Link href="#testimonios" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Comunidad</Link>
            <Link href="#preguntas" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Preguntas Frecuentes</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="inline-flex items-center justify-center px-5 py-2.5 border border-slate-200 text-xs font-bold rounded-full bg-white hover:bg-slate-50 text-brand-blue shadow-xs hover:border-brand-blue/30 transition-all duration-300"
            >
              Portal Privado
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* Decorative Background Blob Grid */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-brand-green/5 rounded-full filter blur-3xl pointer-events-none -z-10 animate-float"></div>
        <div className="absolute top-80 right-1/4 w-96 h-96 bg-brand-blue/5 rounded-full filter blur-3xl pointer-events-none -z-10" style={{ animationDelay: '1.5s' }}></div>

        {/* Hero Section */}
        <section className="py-20 sm:py-28 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column Content */}
              <div className="lg:col-span-7 text-left space-y-8 animate-fade-in-up">
                <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold bg-brand-green/10 text-brand-green">
                  <span className="w-2 h-2 rounded-full bg-brand-gold animate-pulse"></span>
                  Proceso de Preinscripción Abierto 2026 - 2027
                </span>
                
                <h1 className="text-4xl sm:text-6xl font-black text-brand-blue tracking-tight leading-tight">
                  Formación Académica con <span className="bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold bg-clip-text text-transparent">Propósito y Valores</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  En la Unidad Educativa Doctor José María Vargas impulsamos la excelencia académica a través de metodologías científicas y herramientas tecnológicas avanzadas, garantizando una educación integral para los retos del mañana.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <Link 
                    href="/admision" 
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-full text-white bg-brand-green hover:bg-brand-green-hover transition-all duration-300 shadow-md hover:shadow-brand-green/20 hover:scale-[1.02]"
                  >
                    Solicitar Cupo / Preinscripción
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </Link>
                  <Link 
                    href="#pilares" 
                    className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 transition-all duration-300 hover:border-slate-300"
                  >
                    Conocer Propuesta
                  </Link>
                </div>

                {/* Metrics Badges Grid */}
                <div className="pt-8 border-t border-slate-100 grid grid-cols-3 gap-6 max-w-lg">
                  <div>
                    <span className="block text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">99%</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">Tasa de Aprobación</span>
                  </div>
                  <div>
                    <span className="block text-3xl sm:text-4xl font-extrabold text-brand-green tracking-tight">30%</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">Crecimiento Anual</span>
                  </div>
                  <div>
                    <span className="block text-3xl sm:text-4xl font-extrabold text-brand-gold tracking-tight">95%</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">Admisión Universitaria</span>
                  </div>
                </div>
              </div>

              {/* Right Column Layout Frame (Mockup Frame) */}
              <div className="lg:col-span-5 relative flex justify-center">
                <div className="relative w-80 h-96 sm:w-96 sm:h-[450px] rounded-3xl bg-gradient-to-tr from-brand-blue to-brand-green p-1.5 shadow-2xl overflow-hidden group">
                  <div className="h-full w-full bg-slate-900 rounded-[22px] overflow-hidden relative flex flex-col justify-end p-8 text-white">
                    {/* Background image overlay representation */}
                    <div className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80')]"></div>
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-transparent"></div>
                    
                    {/* Badge */}
                    <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20 text-xs font-bold">
                      📍 Sede Principal
                    </div>

                    <div className="relative space-y-2.5">
                      <span className="text-brand-gold font-bold text-xs uppercase tracking-wider block">Academia de Alto Nivel</span>
                      <h3 className="text-2xl font-black leading-tight">Instalaciones preparadas para la investigación y el desarrollo</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">Laboratorios equipados con tecnología digital para el óptimo aprendizaje en química, física y computación.</p>
                    </div>
                  </div>
                </div>
                {/* Floating Decoration Circle */}
                <div className="absolute -bottom-6 -right-6 w-24 h-24 rounded-full bg-brand-gold/15 border border-brand-gold/30 backdrop-blur-sm -z-10 flex items-center justify-center">
                  <span className="text-brand-gold font-extrabold text-2xl">★</span>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Pillars Section */}
        <section id="pilares" className="py-20 bg-slate-50 border-y border-slate-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Nuestra Propuesta Educativa
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
                Pilares Fundamentales de la Institución
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Diseñamos un ecosistema pedagógico equilibrado y centrado en el desarrollo de capacidades humanas, científicas e identitarias.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Pillar 1 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brand-green/20 transition-all duration-300 flex flex-col gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.013 5.477 14.597 5 16.3 5s3.168.477 4 1.253v13C19.168 18.477 17.584 18 15.8 18c-1.747 0-3.332.477-4 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-blue">Alto Nivel Académico</h3>
                  <p className="mt-3 text-sm text-slate-650 leading-relaxed">
                    Un programa robusto con enfoque científico-humanista, guiado por profesionales dedicados al desarrollo intelectual e inductivo de cada estudiante.
                  </p>
                </div>
              </div>

              {/* Pillar 2 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brand-green/20 transition-all duration-300 flex flex-col gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green font-bold group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-blue">Ecosistema Digital</h3>
                  <p className="mt-3 text-sm text-slate-650 leading-relaxed">
                    Biblioteca virtual especializada, control de notas inmediato y comunicación directa por mensajería interna entre representantes, docentes y directivos.
                  </p>
                </div>
              </div>

              {/* Pillar 3 */}
              <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brand-green/20 transition-all duration-300 flex flex-col gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-blue">Valores Institucionales</h3>
                  <p className="mt-3 text-sm text-slate-650 leading-relaxed">
                    Educamos bajo las directrices del legado del Dr. José María Vargas: el respeto al prójimo, el valor del esfuerzo, la ética ciudadana y el compromiso social.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonios" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Voces de Nuestra Comunidad
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
                Lo que dicen los Representantes y Alumnos
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Nuestra mayor garantía es el testimonio de quienes conviven a diario en nuestro campus educativo.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between gap-6 shadow-2xs">
                <div className="space-y-4">
                  {/* Rating Stars */}
                  <div className="flex text-brand-gold text-lg">★★★★★</div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "El portal de control académico ha mejorado muchísimo la comunicación con los docentes. Puedo ver el progreso académico de mi hijo en tiempo real y solicitar citas administrativas sin tener que perder horas."
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                  <div className="h-10 w-10 rounded-full bg-brand-blue flex items-center justify-center text-white font-bold text-sm">
                    LP
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue">Luis Pérez G.</h4>
                    <span className="text-xs text-slate-400 font-medium">Representante (4to Año)</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between gap-6 shadow-2xs">
                <div className="space-y-4">
                  <div className="flex text-brand-gold text-lg">★★★★★</div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "La exigencia científica es real. He aprendido a amar la investigación gracias a los proyectos de laboratorio y al apoyo de mis profesores de biología y física. El ambiente de estudio es genial."
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                  <div className="h-10 w-10 rounded-full bg-brand-green flex items-center justify-center text-white font-bold text-sm">
                    MS
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue">María Silva V.</h4>
                    <span className="text-xs text-slate-400 font-medium">Estudiante de 5to Año</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 flex flex-col justify-between gap-6 shadow-2xs">
                <div className="space-y-4">
                  <div className="flex text-brand-gold text-lg">★★★★★</div>
                  <p className="text-sm text-slate-600 italic leading-relaxed">
                    "La formación en valores se nota. No solo se preocupan por que saquen buenas calificaciones, sino por enseñarles a ser ciudadanos educados, respetuosos y comprometidos con el desarrollo del país."
                  </p>
                </div>
                <div className="flex items-center gap-3.5 pt-4 border-t border-slate-200/60">
                  <div className="h-10 w-10 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold text-sm">
                    AR
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-brand-blue">Ana Rodríguez</h4>
                    <span className="text-xs text-slate-400 font-medium">Representante (1er Año)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQs Section */}
        <section id="preguntas" className="py-20 bg-slate-50 border-t border-slate-100">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 space-y-4">
              <span className="text-xs font-bold text-brand-blue bg-brand-blue/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Preguntas Frecuentes
              </span>
              <h2 className="text-3xl font-extrabold text-brand-blue tracking-tight">
                Resuelve tus dudas al instante
              </h2>
            </div>

            <div className="space-y-4">
              {/* FAQ 1 */}
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-2xs">
                <summary className="flex items-center justify-between font-bold text-brand-blue text-sm sm:text-base">
                  <span>¿Cómo funciona el proceso de preinscripción?</span>
                  <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-150 p-1.5 text-slate-500 group-open:rotate-180 transition-transform duration-300">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-slate-650 leading-relaxed pl-1 border-t border-slate-100 pt-4">
                  Es completamente digital. Debe hacer clic en "Solicitar Cupo / Preinscripción", rellenar los datos del representante y estudiante, y nuestro departamento de admisiones revisará la información. Le llegará una notificación al correo electrónico con la confirmación de fecha para la entrevista presencial.
                </p>
              </details>

              {/* FAQ 2 */}
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-2xs">
                <summary className="flex items-center justify-between font-bold text-brand-blue text-sm sm:text-base">
                  <span>¿Cuáles son los lapsos académicos y cómo consulto las notas?</span>
                  <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-150 p-1.5 text-slate-500 group-open:rotate-180 transition-transform duration-300">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-slate-650 leading-relaxed pl-1 border-t border-slate-100 pt-4">
                  El año escolar se divide en 3 lapsos o periodos académicos. Las calificaciones se cargan al sistema por cada docente evaluador y tanto representantes como alumnos las pueden visualizar en tiempo real iniciando sesión en el Portal Privado.
                </p>
              </details>

              {/* FAQ 3 */}
              <details className="group bg-white p-6 rounded-2xl border border-slate-200 [&_summary::-webkit-details-marker]:hidden cursor-pointer shadow-2xs">
                <summary className="flex items-center justify-between font-bold text-brand-blue text-sm sm:text-base">
                  <span>¿Cómo agendar una reunión o cita con un docente?</span>
                  <span className="ml-1.5 flex-shrink-0 rounded-full bg-slate-150 p-1.5 text-slate-500 group-open:rotate-180 transition-transform duration-300">
                    <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </summary>
                <p className="mt-4 text-xs sm:text-sm text-slate-650 leading-relaxed pl-1 border-t border-slate-100 pt-4">
                  El representante puede acceder a su módulo de "Agenda de Citas" dentro del Portal Privado. Allí podrá seleccionar al docente o directivo correspondiente, proponer una fecha y hora, y el sistema notificará la aprobación o reprogramación de la cita.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* CTA Banner Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative rounded-3xl bg-gradient-to-tr from-brand-blue to-brand-green px-8 py-14 sm:p-16 overflow-hidden shadow-2xl flex flex-col items-center text-center text-white space-y-6">
              {/* Blur Circle background decor */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full filter blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/10 rounded-full filter blur-2xl"></div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight relative max-w-2xl">
                Comienza tu camino hacia una educación de excelencia
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-lg relative leading-relaxed">
                El proceso de preinscripción online solo toma unos minutos. Registra los datos de tu representado y asegura su cupo para el periodo escolar 2026.
              </p>
              <div className="pt-4 relative w-full sm:w-auto">
                <Link 
                  href="/admision"
                  className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-brand-gold hover:bg-brand-gold-hover text-slate-900 font-bold rounded-full transition-all duration-300 shadow-md hover:scale-[1.02]"
                >
                  Registrar Preinscripción de Inmediato
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-blue text-slate-400 border-t border-brand-blue-hover py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-brand-blue font-bold text-sm">
                V
              </div>
              <span className="font-extrabold text-white text-sm tracking-tight">U.E. Dr. José María Vargas</span>
            </div>
            <p className="leading-relaxed">
              Formación humanista, científica e identitaria de las nuevas generaciones bajo principios éticos y tecnológicos.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Enlaces Útiles</h4>
            <ul className="space-y-2.5">
              <li><Link href="/" className="hover:text-white transition-colors">Inicio</Link></li>
              <li><Link href="/admision" className="hover:text-white transition-colors">Admisión 2026</Link></li>
              <li><Link href="/login" className="hover:text-white transition-colors">Portal de Notas</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Módulos</h4>
            <ul className="space-y-2.5">
              <li><span className="hover:text-white cursor-pointer">Control Administrativo</span></li>
              <li><span className="hover:text-white cursor-pointer">Biblioteca Virtual</span></li>
              <li><span className="hover:text-white cursor-pointer">Agenda de Citas</span></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-white text-sm mb-4">Contacto Institucional</h4>
            <p className="leading-relaxed">
              Av. Principal con Calle Los Colegios, Sede Vargas.<br />
              Caracas, Venezuela.<br />
              Email: <span className="text-white hover:underline cursor-pointer">contacto@vargas.edu.ve</span>
            </p>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-brand-blue-hover/50 text-center flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} U.E. Dr. José María Vargas. Todos los derechos reservados.</p>
          <p className="text-[10px] text-slate-500">Diseñado con propósitos de alto rendimiento académico y conexiones digitales eficientes.</p>
        </div>
      </footer>
    </div>
  );
}

