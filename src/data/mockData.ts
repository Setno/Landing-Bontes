import { ServiceItem, CaseStudy, FaqItem } from '../types';

export const BONTES_SERVICES: ServiceItem[] = [
  {
    id: 'claims-delay-analysis',
    title: 'Gestión de Claims & Delay Analysis (SCL Protocol)',
    shortDesc: 'Reconstrucción técnico-legal de la ruta crítica mediante metodología As-Built vs. Planned para justificar extensiones de plazo y mayores gastos generales.',
    fullDesc: 'Desarrollamos reclamaciones irrefutables de tiempo y costo utilizando metodologías estandarizadas por la Society of Construction Law (SCL Protocol) y AACE International. Cuantificamos los retrasos imputables al mandante, aceleraciones no pagadas e interferencias de terceros.',
    iconName: 'ClockAlert',
    deliverables: [
      'Análisis de Ventanas (Window Analysis) & Time Impact Analysis (TIA)',
      'Cuantificación de Mayores Gastos Generales (Directos e Indirectos)',
      'Informe Técnico-Legal de Sustento de Extensiones de Plazo',
      'Matriz de Interferencias y Eventos Compensables'
    ],
    applicableTo: ['Obras Viales MOP', 'Concesiones Urbanas', 'Edificación Privada de Alta Altura', 'Proyectos Mineros e Industriales'],
    roiImpact: 'Mitigación de hasta el 100% de las multas por atraso retenidas por el mandante.'
  },
  {
    id: 'ingenieria-contractual',
    title: 'Ingeniería Contractual Preventiva & Reajustes',
    shortDesc: 'Acompañamiento continuo durante la ejecución del proyecto para la administración de riesgos, modificaciones de obras y cartas formales con reserva de derechos.',
    fullDesc: 'Blindamos su contrato desde la licitación hasta la recepción definitiva. Prevenimos vicios en el procedimiento de notificación de hallazgos, aumentos de obra y órdenes de cambio no formalizadas, asegurando la trazabilidad probatoria necesaria.',
    iconName: 'ShieldCheck',
    deliverables: [
      'Auditoría Contractual del Libro de Obras y Comunicaciones Oficiales',
      'Redacción Estratégica de Cartas de Reserva de Derechos y Reclamos Formativos',
      'Análisis de Reajustes Polinómicos y Variación de Precios de Insumos',
      'Matriz de Alerta Temprana de Hitos Contractuales'
    ],
    applicableTo: ['Contratistas MOP (DS 75)', 'SERVIU (DS 236)', 'Contratos EPC / EPCM Privados', 'Subcontratistas Especializados'],
    roiImpact: 'Evita pérdidas de derechos por caducidad de plazos procesales contractuales.'
  },
  {
    id: 'peritaje-judicial',
    title: 'Peritajes Técnicos e Informes Arbitrales',
    shortDesc: 'Dictámenes periciales independientes de alta rigurosidad científica para su presentación ante Tribunales, Paneles de Expertos o Instancias Arbitrales.',
    fullDesc: 'Nuestros informes combinan la ingeniería de detalle con la dogmática jurídica de contratos de construcción para sostener posiciones en litigios complejos y respaldar pretensiones económicas.',
    iconName: 'Gavel',
    deliverables: [
      'Informe Pericial Técnico-Económico de Cuantificación del Daño',
      'Defensa Presencial del Peritaje en Audiencias Arbitrales',
      'Contraperitajes y Contradicción de Informes de la Contraparte',
      'Análisis Causal de Fallas Estructurales o Vicios del Proyecto'
    ],
    applicableTo: ['Tribunales Arbitrales de Construcción', 'Juicios Ordinarios de Mayor Cuantía', 'Paneles de Concesiones MOP', 'Mediaciones Privadas'],
    roiImpact: 'Sustento metodológico riguroso para fundamentar fallos o acuerdos favorables.'
  },
  {
    id: 'defensa-multas-mop',
    title: 'Defensa de Multas & Cobro de Gastos Generales (MOP / SERVIU)',
    shortDesc: 'Impugnación administrativa y legal de sanciones impuestas por Inspecciones Fiscales (IF) por supuestos retrasos en obras públicas.',
    fullDesc: 'Expertos en el Reglamento de Contratos de Obras Públicas (DS MOP N° 75) y normativas SERVIU. Gestionamos recursos administrativos, apelaciones ante la Dirección General de Obras Públicas y cobro de indemnizaciones por mayores permanencias.',
    iconName: 'Building2',
    deliverables: [
      'Impugnación de Multas del Libro de Obras y Resoluciones IF',
      'Demanda de Indemnización de Gastos Generales por Paralización',
      'Revisión de Liquidaciones Contratadas y Finiquitos',
      'Defensa ante Contraloría General de la República (CGR)'
    ],
    applicableTo: ['Obras MOP Vialidad', 'Obras Hidráulicas (DOH)', 'Arquitectura MOP', 'Servicios de Vivienda y Urbanización'],
    roiImpact: 'Recuperación de montos descontados en estados de pago mensuales.'
  },
  {
    id: 'boletas-garantia-rescate',
    title: 'Auditoría & Rescate de Boletas de Garantía',
    shortDesc: 'Estrategia legal y técnica para impedir la ejecución intempestiva de boletas de fiel cumplimiento e impulsar la recepción definitiva.',
    fullDesc: 'Protegemos su liquidez financiera ante la amenaza de cobro injustificado de garantías bancarias o pólizas de seguro por parte de mandantes intransigentes.',
    iconName: 'FileCheck2',
    deliverables: [
      'Medidas Prejudiciales Provisionales para paralizar cobro de Garantías',
      'Informe Expedito de Cumplimiento de Hitos de Subsanación',
      'Estrategia de Cierre y Liquidación de Contrato',
      'Negociación de Devolución Proporcional de Retenciones'
    ],
    applicableTo: ['Empresas Constructoras con Boletas Activas', 'Consorcios Viales', 'Contratistas de Infraestructura'],
    roiImpact: 'Resguardo inmediato de las líneas de crédito y capital de trabajo de la empresa.'
  }
];

export const BONTES_CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-mop-valparaiso',
    title: 'Recuperación de UF 85.000 por Mayor Permanencia en Obra Vial Concesionada',
    clientCategory: 'Constructora de Infraestructura Vial (MOP Región Valparaíso)',
    conflictType: 'Atraso no imputable por hallazgos arqueológicos y expropiaciones tardías',
    amountInDispute: 'UF 92.000 en Multas y Gastos Generales',
    recoveredAmount: 'UF 85.400 Recuperadas / Mitigadas',
    timeframe: '12 Meses de Tramitación Técnico-Legal',
    methodology: 'Time Impact Analysis (TIA) + Protocolo SCL',
    summary: 'La Inspección Fiscal pretendía aplicar multas por 140 días de retraso en la entrega de la ruta. Bontes demostró mediante reconstrucción fotográfica y cronogramas As-Built que el camino crítico estuvo bloqueado por la demora de la Inspección Fiscal en autorizar el rescate arqueológico.',
    keyOutcomes: [
      'Liberación inmediata del 100% de retenciones aplicadas en estados de pago.',
      'Reconocimiento de 125 días de extensión de plazo oficial.',
      'Pago de mayores gastos generales directos por UF 42.000.'
    ]
  },
  {
    id: 'case-edificacion-santiago',
    title: 'Anulación de Multas por $450 Millones CLP en Edificación Hospitalaria',
    clientCategory: 'Consorcio Constructora Hospitalaria (Región Metropolitana)',
    conflictType: 'Modificaciones de especialidades no pagadas e interferencias MEP',
    amountInDispute: '$480.000.000 CLP en multas de entrega parcial',
    recoveredAmount: '$450.000.000 CLP Libres de multa',
    timeframe: '5 Meses de Mediación Experta',
    methodology: 'Windows Analysis + Informe de Interferencia MEP',
    summary: 'El mandante exigía el pago de liquidación diferida sosteniendo que el edificio tenía retrasos por falta de personal. Se comprobó que el proyecto ejecutivo presentaba más de 300 RFI (solicitudes de información) no respondidas a tiempo, parando los trabajos de climatización y redes sanitarias.',
    keyOutcomes: [
      'Devolución de retenes de garantía por $310M CLP.',
      'Aprobación de 85 días adicionales sin penalizaciones.',
      'Firma de finiquito consensuado sin ir a juicio arbitral.'
    ]
  },
  {
    id: 'case-minero-antofagasta',
    title: 'Defensa Exitosa en Arbitraje por Contrato EPCM Minero',
    clientCategory: 'Empresa de Obras Civiles Complejas (Región de Antofagasta)',
    conflictType: 'Terminación anticipada injustificada y retención de equipos',
    amountInDispute: 'USD $3.800.000',
    recoveredAmount: 'USD $3.450.000 en Indemnización Final',
    timeframe: '14 Meses en Tribunal Arbitral Especializado',
    methodology: 'Peritaje Técnico Integral + Análisis Contable de Daño Emergente',
    summary: 'Frente a una gran minera privada que pretendía ejecutar la boleta de fiel cumplimiento alegando incumplimiento de plazo, Bontes presentó un informe integral que acreditó que los atrasos derivaban de la entrega tardía de la ingeniería básica por parte de la minera.',
    keyOutcomes: [
      'Prohibición judicial preventiva de cobrar la boleta de garantía.',
      'Fallo arbitral favorable restituyendo costos de desmovilización.',
      'Pago de rentabilidades esperadas de las obras no ejecutadas.'
    ]
  }
];

export const BONTES_METHODOLOGY_STEPS = [
  {
    step: '01',
    title: 'Auditoría Diagnóstica Exprés (48 Horas)',
    desc: 'Revisión exhaustiva del Libro de Obras, bases de licitación, programa Gantt contractual y correspondencia formal para detectar fortalezas y vacíos probatorios.',
    details: 'Analizamos los plazos procedimentales para asegurar que no existan caducidades de reclamos conforme a las cláusulas del contrato.'
  },
  {
    step: '02',
    title: 'Reconstrucción de Ruta Crítica (As-Built)',
    desc: 'Modelación científica de la historia real de la obra. Comparamos el cronograma planificado inicial contra los hitos efectivamente ejecutados.',
    details: 'Aplicamos metodologías SCL (Window Analysis, Collapsed As-Built, Time Impact Analysis) para aislar cada evento perturbador.'
  },
  {
    step: '03',
    title: 'Cuantificación Económica del Daño & Claims',
    desc: 'Traducción de los días de retraso no imputable a montos financieros concretos: mayores gastos generales directos, indirectos, mano de obra ociosa e inflación.',
    details: 'Calculamos el reajuste polinómico exacto y el costo diario de permanencia con criterios contables exigidos en arbitrajes.'
  },
  {
    step: '04',
    title: 'Estrategia de Blindaje & Defensa Negociadora',
    desc: 'Acompañamiento en mesas directas de negociación con el mandante, inspecciones fiscales o representación técnica en procesos arbitrales.',
    details: 'Armamos la carpeta probatoria irrefutable que obliga a la contraparte a sentarse a acordar antes de arriesgar un fallo judicial adverso.'
  }
];

export const BONTES_FAQS: FaqItem[] = [
  {
    category: 'claims',
    question: '¿Qué es un Claim de Construcción y cuándo debe presentarse?',
    answer: 'Un claim o reclamación contractual es una petición formal respaldada técnica y legalmente que realiza el contratista para solicitar una extensión del plazo de ejecución, la devolución de multas o el pago de compensaciones adicionales (gastos generales) debido a eventos imprevistos, cambios de proyecto o interferencias atribuibles al mandante. Debe prepararse inmediatamente al detectar el evento desviador para evitar caducidades contractuales.'
  },
  {
    category: 'mop_serviu',
    question: '¿Cómo nos defiende Bontes frente a multas aplicadas por la Inspección Fiscal del MOP (DS 75)?',
    answer: 'Bontes realiza un análisis forense de la ruta crítica del proyecto bajo la metodología SCL. Demostramos formalmente que las demoras no son imputables a su empresa (ej. entregas tardías de terreno, modificaciones de trazado, hallazgos no previstos o falta de respuesta a RFIs). Presentamos recursos administrativos fundados ante la Dirección General de Obras Públicas e impulsamos la restitución de retenciones.'
  },
  {
    category: 'contratos',
    question: '¿Qué es el Protocolo SCL (Society of Construction Law) y por qué es clave?',
    answer: 'El Protocolo SCL es el estándar internacional más prestigioso para la gestión y resolución de disputas de tiempo y costo en construcción. Proporciona principios objetivos para demostrar la relación causal entre los retrasos y el camino crítico del proyecto. Los tribunales arbitrales en Chile privilegian ampliamente los informes basados en normas SCL por su objetividad matemática e irrefutabilidad.'
  },
  {
    category: 'arbitraje',
    question: 'Nuestra constructora tiene un conflicto de $600M CLP, ¿conviene ir a arbitraje o negociar?',
    answer: 'Siempre recomendamos iniciar con un informe técnico y dossier de claim irrefutable para la negociación directa o mediación. En la mayoría de los casos que asumimos en Bontes, el mandante accede a un acuerdo extrajudicial favorable una vez que constata la solidez de la carpeta técnica preparativa. Si la negociación no prospera, la carpeta ya queda 100% lista para instancias arbitrales.'
  }
];

