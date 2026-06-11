import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#fcfdfe] text-slate-800 flex flex-col font-sans selection:bg-brand-green selection:text-white">
      {/* Top Banner Bar */}
      <div className="bg-brand-green text-white py-2 text-xs font-semibold text-center border-b border-brand-green-hover/50 px-4">
        <span>RIF: J-41037200-1 • Código DEA: PD04971705 • Aprobada por el M.P.P.E. • Altagracia, Municipio Gómez, Nueva Esparta</span>
      </div>

      {/* Header/Navbar with Glassmorphism */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Institution Shield Logo - bigger */}
            <div className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-green to-brand-blue flex items-center justify-center p-0.5 shadow-md flex-shrink-0">
              <div className="h-full w-full bg-white rounded-full flex items-center justify-center overflow-hidden relative">
                <img src="/logo-liceo.png" alt="Logo U.E. Dr. José María Vargas" className="h-full w-full object-cover" />
              </div>
            </div>
            <div>
              <span className="font-extrabold text-brand-blue tracking-tight text-base block leading-tight">U.E. Dr. José María Vargas</span>
              <span className="text-[10px] text-brand-green font-bold tracking-wider block mt-0.5">Academia • Ciencia e Identidad</span>
              <span className="text-[9px] text-slate-400 font-medium tracking-wide block">Excelencia Educativa al Servicio de la Comunidad</span>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 text-sm font-semibold text-slate-600">
            <Link href="/" className="text-brand-blue border-b-2 border-brand-green pb-1 px-1">Inicio</Link>
            <Link href="/admision" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Admisión 2026</Link>
            <Link href="#pilares" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Misión y Visión</Link>
            <Link href="#galeria" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Galería</Link>
            <Link href="#testimonios" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Comunidad</Link>
            <Link href="#preguntas" className="hover:text-brand-green hover:border-b-2 hover:border-brand-green/30 pb-1 px-1 transition-all">Preguntas</Link>
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
                  Preinscripción Abierta 2025-2026 • Municipio Gómez, Nueva Esparta
                </span>
                
                <h1 className="text-4xl sm:text-6xl font-black text-brand-blue tracking-tight leading-tight">
                  Identidad, Valores y <span className="bg-gradient-to-r from-brand-blue via-brand-green to-brand-gold bg-clip-text text-transparent">Excelencia Académica</span>
                </h1>
                
                <p className="text-base sm:text-lg text-slate-600 max-w-2xl leading-relaxed">
                  La Unidad Educativa Doctor José María Vargas, institución privada ubicada en Altagracia, Municipio Gómez del Estado Nueva Esparta, fundada en 2017. Formamos ciudadanos integrales con identidad neoespartana, venezolana y latinoamericana, bajo principios académicos, científicos y humanistas.
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
                      📍 Altagracia, Nueva Esparta
                    </div>

                    <div className="relative space-y-2.5">
                      <span className="text-brand-gold font-bold text-xs uppercase tracking-wider block">Institución Privada • Desde 2017</span>
                      <h3 className="text-2xl font-black leading-tight">Formando el nuevo republicano neoespartano con identidad y excelencia</h3>
                      <p className="text-xs text-slate-300 leading-relaxed">Aprobada por el M.P.P.E. • Código DEA: PD04971705 • RIF: J-41037200-1. Comprometidos con la formación integral escuela-familia-comunidad.</p>
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

        {/* Mision Vision Section */}
        <section id="pilares" className="py-20 bg-slate-50 border-y border-slate-100 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
              <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider">
                Nuestra Propuesta Educativa
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
                Misión, Visión y Valores
              </h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Formamos ciudadanos integrales con identidad neoespartana, venezolana y latinoamericana, bajo principios académicos, científicos y humanistas.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Mision */}
              <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brand-green/20 transition-all duration-300 flex flex-col gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-brand-green/10 flex items-center justify-center text-brand-green font-bold group-hover:bg-brand-green group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.168.477 4 1.253m0-13C13.013 5.477 14.597 5 16.3 5s3.168.477 4 1.253v13C19.168 18.477 17.584 18 15.8 18c-1.747 0-3.332.477-4 1.253" /></svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-blue">Misión</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Garantizar a niños, niñas y adolescentes una formación integral en las diferentes áreas del saber, competencias y valores, en la búsqueda permanente de la excelencia, en un ambiente de sana convivencia que valore nuestra identidad neoespartana, venezolana y latinoamericana.
                  </p>
                </div>
              </div>
              {/* Vision */}
              <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brand-green/20 transition-all duration-300 flex flex-col gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-brand-blue/10 flex items-center justify-center text-brand-blue font-bold group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-blue">Visión</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    Ser una institución educativa de referencia en el Estado Nueva Esparta, reconocida por la calidad académica y humana de sus egresados, la sólida vinculación escuela-familia-comunidad y el fomento de la identidad cultural como pilar del nuevo republicano venezolano.
                  </p>
                </div>
              </div>
              {/* Valores */}
              <div className="bg-white p-8 rounded-3xl border border-slate-150 shadow-xs hover:shadow-xl hover:-translate-y-1 hover:border-brand-green/20 transition-all duration-300 flex flex-col gap-6 group">
                <div className="h-14 w-14 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold font-bold group-hover:bg-brand-gold group-hover:text-white transition-all duration-300">
                  <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h3 className="font-extrabold text-lg text-brand-blue">Valores Institucionales</h3>
                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                    <strong className="text-brand-blue">Respeto • Responsabilidad • Honestidad • Solidaridad • Identidad • Excelencia.</strong> Valores construidos en colectivo por estudiantes, docentes, directivos y representantes que guían la convivencia varguense.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Epónimo Section */}
        <section className="py-20 bg-white border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6">
                <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">
                  Nuestro Epónimo
                </span>
                <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">
                  Dr. José María Vargas
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  Nació el <strong>10 de marzo de 1786</strong> en La Guaira, Venezuela. Médico cirujano, científico, catedrático, rector de la Universidad de Caracas y <strong>primer presidente civil de Venezuela</strong> (1835-1836).
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Su presidencia es recordada como un hito civilista: promulgó el Primer Código de la República, organizó el Registro Público y reformó la enseñanza primaria y superior. Su legado de servicio, ética y amor por la educación es el norte que guía a nuestra comunidad educativa.
                </p>
                <div className="grid grid-cols-2 gap-4 pt-2">
                  <div className="bg-brand-blue/5 p-4 rounded-2xl border border-brand-blue/10">
                    <span className="block text-xl font-extrabold text-brand-blue">1786</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">Año de Nacimiento</span>
                  </div>
                  <div className="bg-brand-green/5 p-4 rounded-2xl border border-brand-green/10">
                    <span className="block text-xl font-extrabold text-brand-green">1835</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">Primer Pdte. Civil</span>
                  </div>
                  <div className="bg-brand-gold/5 p-4 rounded-2xl border border-brand-gold/10">
                    <span className="block text-xl font-extrabold text-brand-gold">2017</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">Fundación de la U.E.</span>
                  </div>
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="block text-xl font-extrabold text-slate-700">NE</span>
                    <span className="block text-xs font-semibold text-slate-500 mt-1">Nueva Esparta</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-tr from-brand-blue/10 to-brand-gold/10 rounded-3xl p-8 border border-brand-blue/10 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-brand-blue flex items-center justify-center text-white text-lg">⚕️</div>
                    <div>
                      <h4 className="font-bold text-brand-blue text-sm">Médico y Científico</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">Estudió medicina, cirugía, química, botánica y anatomía en Caracas y Edimburgo. Miembro del Real Colegio de Cirujanos de Londres.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-brand-green flex items-center justify-center text-white text-lg">📚</div>
                    <div>
                      <h4 className="font-bold text-brand-blue text-sm">Educador y Rector</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">Profesor de Anatomía y Rector de la Universidad de Caracas. Introdujo reformas históricas en la educación venezolana.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="h-10 w-10 flex-shrink-0 rounded-xl bg-brand-gold flex items-center justify-center text-white text-lg">🏛️</div>
                    <div>
                      <h4 className="font-bold text-brand-blue text-sm">Estadista Civilista</h4>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">Presidente electo en 1835, símbolo del civismo venezolano. Promulgó el Primer Código de la República y reformó el sistema educativo nacional.</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-brand-blue/10 text-center">
                    <p className="text-xs text-slate-500 italic">&ldquo;Su legado de conocimiento, ética y servicio público es el faro que ilumina nuestra misión educativa en Altagracia.&rdquo;</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="galeria" className="py-20 bg-slate-50 border-y border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-xs font-bold text-brand-green bg-brand-green/10 px-3 py-1 rounded-full uppercase tracking-wider">Galería Institucional</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">Nuestra Comunidad Varguense</h2>
              <p className="text-slate-600 text-sm leading-relaxed">Conoce los momentos, promociones y actividades que hacen única a nuestra institución.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-brand-green/10 to-brand-blue/10 rounded-2xl h-48 flex flex-col items-center justify-center border border-brand-green/20 gap-3">
                <span className="text-4xl">🎓</span>
                <span className="text-sm font-bold text-brand-blue">Primera Promoción</span>
                <span className="text-xs text-slate-400">Fotos próximamente</span>
              </div>
              <div className="bg-gradient-to-br from-brand-gold/10 to-brand-green/10 rounded-2xl h-48 flex flex-col items-center justify-center border border-brand-gold/20 gap-3">
                <span className="text-4xl">🏫</span>
                <span className="text-sm font-bold text-brand-blue">Actividades Culturales</span>
                <span className="text-xs text-slate-400">Fotos próximamente</span>
              </div>
              <div className="bg-gradient-to-br from-brand-blue/10 to-brand-gold/10 rounded-2xl h-48 flex flex-col items-center justify-center border border-brand-blue/20 gap-3">
                <span className="text-4xl">📚</span>
                <span className="text-sm font-bold text-brand-blue">Vida Académica</span>
                <span className="text-xs text-slate-400">Fotos próximamente</span>
              </div>
            </div>
            <p className="text-center text-xs text-slate-400 mt-6">Galería en construcción — envía tus fotos institucionales para publicarlas aquí.</p>
          </div>
        </section>

        {/* Community Section */}
        <section id="testimonios" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
              <span className="text-xs font-bold text-brand-gold bg-brand-gold/10 px-3 py-1 rounded-full uppercase tracking-wider">Nuestra Comunidad</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-brand-blue tracking-tight">El Colectivo Varguense</h2>
              <p className="text-slate-600 text-sm leading-relaxed">Somos escuela, familia y comunidad. Unidos por la identidad neoespartana y el compromiso con la educación de excelencia.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-brand-green/5 border border-brand-green/15 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">👨‍🏫</span>
                <h4 className="font-bold text-brand-blue">Cuerpo Docente</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Personal directivo, docente, administrativo y ambientalista comprometido con la excelencia varguense.</p>
              </div>
              <div className="bg-brand-blue/5 border border-brand-blue/15 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
                <h4 className="font-bold text-brand-blue">Familias Varguenses</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Padres, madres y representantes como aliados fundamentales en el proceso educativo de sus hijos.</p>
              </div>
              <div className="bg-brand-gold/5 border border-brand-gold/15 p-6 rounded-2xl text-center space-y-2">
                <span className="text-3xl">🌟</span>
                <h4 className="font-bold text-brand-blue">Estudiantes</h4>
                <p className="text-xs text-slate-500 leading-relaxed">Jóvenes con identidad, valores y conocimiento, listos para enfrentar los retos de la sociedad moderna.</p>
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
            <div className="relative rounded-3xl bg-gradient-to-tr from-brand-green to-brand-blue px-8 py-14 sm:p-16 overflow-hidden shadow-2xl flex flex-col items-center text-center text-white space-y-6">
              {/* Blur Circle background decor */}
              <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full filter blur-2xl"></div>
              <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-gold/10 rounded-full filter blur-2xl"></div>

              <h2 className="text-3xl sm:text-5xl font-black tracking-tight relative max-w-2xl">
                Asegura el cupo de tu hijo en la U.E. Dr. José María Vargas
              </h2>
              <p className="text-xs sm:text-sm text-slate-200 max-w-lg relative leading-relaxed">
                El proceso de preinscripción online solo toma unos minutos. Asegura el cupo de tu representado para el periodo escolar 2025-2026 en Altagracia, Municipio Gómez, Nueva Esparta.
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
              <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center overflow-hidden p-0.5">
                <img src="/logo-liceo.png" alt="Logo U.E. Dr. José María Vargas" className="h-full w-full object-cover rounded-full" />
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
              Altagracia, Municipio Gómez,<br />
              Estado Nueva Esparta, Venezuela.<br />
              RIF: J-41037200-1<br />
              Código DEA: PD04971705
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

