// Contenido fuente: Programa_Neurosonologia.docx (Curso 1 · Neurosonología DTC).
// Este archivo es SHARED (solo lo edita el orquestador). Los subagentes lo consumen.

export const courseMeta = {
  name: "Neurosono DTC",
  fullName:
    "Programa Integral de Mentoría y Certificación en Neurosonología y Hemodinamia Cerebral por Ultrasonido Doppler Transcraneal (DTC)",
  modality: "Híbrida — Virtual previo + Mentoría presencial + Seguimiento anual",
  duration: "40 h virtuales + 40 h presenciales + 1 año de seguimiento + Examen de Certificación",
  venue: "CDMX",
  dates: "21—25 de octubre 2026",
  seats: "8 médicos VIP",
  investment: "$2,500 USD",
  contactEmail: "neurosonologialatam@gmail.com",
};

export const programFacts = [
  { value: "40 h", label: "precurso virtual" },
  { value: "40 h", label: "práctica presencial" },
  { value: "12 m", label: "seguimiento" },
  { value: "08", label: "médicos por cohorte" },
];

// ── EL PATH · 3 estaciones (componente PathJourney, protagonista del Home) ──────
export const pathStations = [
  {
    number: "01",
    tag: "Curso",
    title: "Fase Virtual",
    meta: "40 h asincrónicas",
    copy: "Cuatro semanas para dominar física Doppler, anatomía vascular y semiología espectral antes de tocar el equipo.",
    href: "/programa",
    accent: "cyan",
    icon: "bookOpen" as const,
    image: { src: "/images/neurosono/recorrido-01-virtual.webp", theme: "Trazado DTC espectral (onda + ventana temporal)", aspect: "16 / 10", size: "1040×650 px" },
  },
  {
    number: "02",
    tag: "Mentoría",
    title: "Presencial CDMX",
    meta: "5 días / 40 h",
    copy: "Entrenamiento deliberado: dos horas de discusión clínica y seis de práctica directa cada día.",
    href: "/mentoria",
    accent: "violet",
    icon: "activity" as const,
    image: { src: "/images/neurosono/recorrido-02-presencial.webp", theme: "Equipo Doppler transcraneal en práctica supervisada", aspect: "16 / 10", size: "1040×650 px" },
  },
  {
    number: "03",
    tag: "Certificación",
    title: "Seguimiento + Examen",
    meta: "12 meses + examen NSRG-WFN",
    copy: "Webinars mensuales, comunidad de consulta y examen oficial de certificación.",
    href: "/certificacion",
    accent: "coral",
    icon: "award" as const,
    image: { src: "/images/neurosono/recorrido-03-seguimiento.webp", theme: "Certificación / examen práctico NSRG-WFN", aspect: "16 / 10", size: "1040×650 px" },
  },
];

// ── Universo de cursos (componente CourseCard + selector de Nivel 1) ─────────────
export const courses = [
  {
    id: "dtc",
    order: "01",
    name: "Neurosono DTC",
    title: "Neurosonología DTC",
    status: "active" as const,
    href: "/",
    tagline: "Doppler transcraneal y hemodinamia cerebral",
    meta: "Curso 1 · Cohorte CDMX 2026",
  },
  {
    id: "curso-2",
    order: "02",
    name: "Curso 2",
    title: "Curso 2",
    status: "soon" as const,
    href: null,
    tagline: "En preparación",
    meta: "Próximamente",
  },
  {
    id: "curso-3",
    order: "03",
    name: "Curso 3",
    title: "Curso 3",
    status: "soon" as const,
    href: null,
    tagline: "En preparación",
    meta: "Próximamente",
  },
];

// Recorrido del curso (Nivel 2 de la navegación multi-tab).
export const journeyNav = [
  { href: "/programa", label: "Programa" },
  { href: "/mentoria", label: "Mentoría" },
  { href: "/certificacion", label: "Certificación" },
  { href: "/directora", label: "Directora" },
  { href: "/inscripcion", label: "Inscripción" },
];

// Alias retrocompatible (SiteHeader histórico importaba navItems).
export const navItems = journeyNav;

export const phases = [
  {
    number: "01",
    kicker: "Antes de CDMX",
    title: "Fundamento virtual",
    copy: "Cuatro semanas para dominar física Doppler, anatomía vascular, ventanas acústicas y semiología espectral antes de tocar el equipo.",
    meta: "4 semanas · 10 h/semana",
    accent: "cyan",
  },
  {
    number: "02",
    kicker: "21—25 octubre",
    title: "Mentoría presencial",
    copy: "Cinco días de entrenamiento deliberado: discusión clínica, videoteca y seis horas diarias de práctica directa con guía experta.",
    meta: "CDMX · 40 horas",
    accent: "violet",
  },
  {
    number: "03",
    kicker: "Durante un año",
    title: "Seguimiento y examen",
    copy: "Webinars mensuales, comunidad de consulta y preparación progresiva para la evaluación teórico-práctica de certificación.",
    meta: "12 meses · casos reales",
    accent: "coral",
  },
];

// ── FASE 1 · Curso Virtual (5 módulos asincrónicos) → SA-1 ───────────────────────
export const virtualModules = [
  {
    id: "M01",
    title: "Física del Doppler, anatomía vascular y ventanas acústicas",
    objective: "Orientar el haz y mapear la circulación cerebral con una base física sólida.",
    lessons: [
      "1.1 Introducción a la neurosonología vascular",
      "1.2 Principios físicos (Doppler pulsado/continuo, ángulo, PRF, ganancia, sample volume)",
      "1.3 Equipos y transductores (1–2 MHz)",
      "1.4 Dispositivos de monitoreo continuo (cascos)",
      "1.5 Anatomía del Polígono de Willis",
      "1.6 Mapeo de las cuatro ventanas acústicas",
    ],
    assessment: "Cuestionario de 10 preguntas",
  },
  {
    id: "M02",
    title: "Espectro normal, morfología y trazo diastólico",
    objective: "Integrar la semiología auditiva y visual de los espectros normales.",
    lessons: [
      "2.1 Registros espectrales y velocidades normales",
      "2.2 Análisis morfológico de onda y diástole",
      "2.3 Alteraciones de resistencia y PPC inicial",
    ],
    assessment: "Clasificar 8 trazados anonimizados",
  },
  {
    id: "M03",
    title: "Estenosis, vasoespasmo y reactividad vasomotora",
    objective: "Aplicar criterios hemodinámicos cuantitativos en patología focal y reserva funcional.",
    lessons: [
      "3.1 Altas velocidades",
      "3.2 Vasoespasmo en HSA / Índice de Lindegaard",
      "3.3 Autorregulación y reactividad (CO₂, BHI, Acetazolamida)",
    ],
    assessment: "2 casos clínicos",
  },
  {
    id: "M04",
    title: "Microembolia (HITS) y shunt derecha–izquierda",
    objective: "Ejecutar protocolos de detección embólica y evaluación de FOP.",
    lessons: [
      "4.1 Detección y cuantificación de HITS",
      "4.2 Protocolo FOP (consenso NSRG/WFN)",
      "4.3 Patrones microangiopáticos y vasculíticos",
    ],
    assessment: "Taller HITS vs artefactos",
  },
  {
    id: "M05",
    title: "Neurointensivismo y parada circulatoria cerebral",
    objective: "Reconocer patrones progresivos de hipertensión endocraneana y deterioro de la PPC.",
    lessons: [
      "5.1 Fisiopatología de la hipertensión endocraneana (HTE)",
      "5.2 Stop circulatorio (espiga sistólica, to-and-fro)",
      "5.3 Muerte encefálica y aspectos técnico-legales",
    ],
    assessment: "Examen integrador de 30 preguntas",
  },
];

// ── FASE 2 · Mentoría Presencial CDMX (5 días · 08:00–17:00) → SA-2 ───────────────
export const onsiteDays = [
  {
    day: "Día 01",
    title: "Técnica estandarizada, anatomía y colateralización",
    detail: "Optimización del equipo, cuatro ventanas, Polígono de Willis y cascos de fijación.",
    practices: [
      "Optimización del equipo",
      "Insonación del territorio anterior (ACM / ACA / ACI) y posterior (AV / AB / ACP)",
      "Sifón carotídeo y oftálmica transorbitaria",
      "Montaje y calibración de cascos",
      "Taller en voluntarios (4 ventanas)",
    ],
  },
  {
    day: "Día 02",
    title: "Análisis morfológico, altas velocidades y vasoespasmo",
    detail: "Morfología, gradientes, HSA aneurismática, Lindegaard y seguimiento evolutivo.",
    practices: [
      "Morfología de los 3 segmentos diastólicos",
      "Estenosis y oclusiones",
      "Monitoreo de HSA",
      "Índice de Lindegaard y ratio diario",
      "Taller de velocidades y casos con videoteca",
    ],
  },
  {
    day: "Día 03",
    title: "Reactividad vasomotora, reserva hemodinámica y estímulos",
    detail: "BHI, Valsalva, CO₂, autorregulación y estímulos mecánicos, gasométricos y farmacológicos.",
    practices: [
      "Autorregulación cerebral",
      "Estímulos mecánicos/hemodinámicos (compresión carotídea, Valsalva, ortostatismo, TAM)",
      "Estímulos gasométricos (CO₂, BHI, Acetazolamida)",
      "THRR y estímulo visual de la ACP",
      "Taller BHI en tiempo real y casos pre/post-quirúrgicos",
    ],
  },
  {
    day: "Día 04",
    title: "Detección de HITS, protocolo FOP y patrón microangiopático",
    detail: "Detección embólica, test de burbujas, graduación del shunt y patrones vasculíticos.",
    practices: [
      "Detección de HITS",
      "Aplicaciones clínicas (FA, prótesis, ateromatosis, intraoperatorio)",
      "Protocolo FOP WFN/NSRG",
      "Solución salina agitada + Valsalva",
      "Semiótica de microangiopatía y taller de test de burbujas",
    ],
  },
  {
    day: "Día 05",
    title: "Neurointensivismo, TEC y muerte encefálica",
    detail: "TEC, PPC, hipertensión endocraneana, parada circulatoria y muerte encefálica.",
    practices: [
      "Monitoreo en TEC",
      "Paciente inevaluable en UCI",
      "Evolución al stop circulatorio",
      "Diagnóstico confirmatorio de ME (espiga sistólica, to-and-fro, ausencia de señal)",
      "Ética, normativas y taller de integración final",
    ],
  },
];

// ── FASE 3 · Seguimiento y Certificación (12 meses) → SA-3 ───────────────────────
export const certFollowUp = [
  {
    tag: "Mensual",
    icon: "calendar" as const,
    title: "Webinars mensuales",
    detail: "Sesiones en Zoom con la Dra. Cocorullo sobre casos reales aportados por la cohorte.",
  },
  {
    tag: "Comunidad",
    icon: "users" as const,
    title: "Comunidad exclusiva",
    detail: "Grupo privado de Telegram para consulta continua entre los mentoreados.",
  },
  {
    tag: "Recursos",
    icon: "library" as const,
    title: "Entregables",
    detail: "Repositorio bibliográfico en PDF y videoteca de patrones sonoros.",
  },
];

// Especificación del slot de imagen para la sección de Seguimiento (SA-C).
export const certFollowImage = {
  src: "/images/neurosono/recorrido-03-seguimiento.webp",
  theme: "Seguimiento longitudinal (anillos concéntricos)",
  aspect: "4 / 3",
  size: "900×675 px",
};

export const certExam = {
  title: "Examen Oficial NSRG-WFN 2026",
  frame:
    "XXVIII Congreso Iberoamericano de Enfermedad Cerebrovascular",
  venue: "Sheraton Lima Historic Center · Lima, Perú",
  dates: "12—14 noviembre 2026",
  cost: "Sin costo adicional al boleto del congreso",
  requirement:
    "CV (1 pág.) + constancias a neurosonologialatam@gmail.com antes del 31 oct 2026",
  attendance: "Asistencia obligatoria al Taller Oficial",
  process: [
    {
      step: "01",
      tag: "Prueba teórica",
      title: "Evaluación teórica",
      detail: "Opción múltiple. Mínimo 70% para avanzar.",
    },
    {
      step: "02",
      tag: "Prueba práctica",
      title: "Evaluación práctica",
      detail: "Insonación de ACI, ACM, ACA, ACP, AV y AB.",
    },
    {
      step: "03",
      tag: "Acreditación",
      title: "Certificación oficial",
      detail: "Certificación Oficial en Neurosonología por el NSRG–WFN.",
    },
  ],
};

// ── Directora → SA-4 ─────────────────────────────────────────────────────────────
export const directora = {
  name: "Dra. Silvia Viviana Cocorullo",
  role: "Directora académica",
  credentials: [
    "Neuróloga y neurosonóloga",
    "Ex-Directora de la Carrera de Médico Especialista en Neurología UBA–IDIM",
    "Certificada por la World Federation of Neurology (WFN)",
    "Miembro Fundador y Evaluador del NSRG–WFN",
  ],
};
