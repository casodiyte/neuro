export const programFacts = [
  { value: "40 h", label: "precurso virtual" },
  { value: "40 h", label: "práctica presencial" },
  { value: "12 m", label: "seguimiento" },
  { value: "08", label: "médicos por cohorte" },
];

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

export const virtualModules = [
  {
    id: "M01",
    title: "Física, anatomía y ventanas acústicas",
    objective: "Orientar el haz y mapear la circulación cerebral con una base física sólida.",
    lessons: [
      "Introducción a la neurosonología vascular",
      "Principios físicos del ultrasonido Doppler",
      "Equipos, transductores y dispositivos de monitoreo",
      "Anatomía del Polígono de Willis",
      "Mapeo de las cuatro ventanas acústicas",
    ],
    assessment: "Cuestionario de física e insonación",
  },
  {
    id: "M02",
    title: "Espectro normal y morfología de onda",
    objective: "Integrar la semiología auditiva y visual de los espectros normales.",
    lessons: [
      "Registros espectrales y velocidades normales",
      "Análisis de los tres segmentos diastólicos",
      "Resistencia vascular y presión de perfusión cerebral",
    ],
    assessment: "Clasificación de ocho trazados anonimizados",
  },
  {
    id: "M03",
    title: "Estenosis, vasoespasmo y reactividad",
    objective: "Aplicar criterios hemodinámicos cuantitativos en patología focal y reserva funcional.",
    lessons: [
      "Evaluación de altas velocidades",
      "Vasoespasmo en HSA aneurismática",
      "Índice de Lindegaard",
      "Autorregulación, CO₂, BHI y acetazolamida",
    ],
    assessment: "Dos casos con cálculo de Lindegaard y BHI",
  },
  {
    id: "M04",
    title: "Microembolia y shunt derecha–izquierda",
    objective: "Ejecutar protocolos de detección embólica y evaluación de FOP.",
    lessons: [
      "Detección y cuantificación de HITS",
      "Protocolo FOP y solución salina agitada",
      "Patrones microangiopáticos y vasculíticos",
    ],
    assessment: "Discriminación de HITS frente a artefactos",
  },
  {
    id: "M05",
    title: "Neurointensivismo y parada circulatoria",
    objective: "Reconocer patrones progresivos de hipertensión endocraneana y deterioro de la PPC.",
    lessons: [
      "Fisiopatología de la hipertensión endocraneana",
      "Proceso de parada circulatoria cerebral",
      "Muerte encefálica y aspectos técnico-legales",
    ],
    assessment: "Examen integrador de 30 preguntas",
  },
];

export const onsiteDays = [
  { day: "Día 01", title: "Técnica estandarizada y anatomía", detail: "Configuración del equipo, cuatro ventanas, Polígono de Willis y cascos de fijación." },
  { day: "Día 02", title: "Altas velocidades y vasoespasmo", detail: "Morfología, gradientes, HSA aneurismática, Lindegaard y seguimiento evolutivo." },
  { day: "Día 03", title: "Reserva hemodinámica", detail: "BHI, Valsalva, CO₂, autorregulación y estímulos mecánicos, gasométricos y farmacológicos." },
  { day: "Día 04", title: "HITS, FOP y microangiopatía", detail: "Detección embólica, test de burbujas, graduación del shunt y patrones vasculíticos." },
  { day: "Día 05", title: "Neurointensivismo", detail: "TEC, PPC, hipertensión endocraneana, parada circulatoria y muerte encefálica." },
];

export const navItems = [
  { href: "/programa", label: "Programa" },
  { href: "/mentoria", label: "Mentoría" },
  { href: "/certificacion", label: "Certificación" },
  { href: "/directora", label: "Directora" },
];
