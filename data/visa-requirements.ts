export interface VisaRequirement {
  id: string
  country: string
  flag: string
  workVisaTypes: VisaType[]
  generalRequirements: string[]
  processingTime: string
  averageCost: string
  officialWebsite: string
  additionalInfo?: string
}

export interface VisaType {
  name: string
  description: string
  duration: string
  requirements: string[]
  eligibility: string[]
}

export const visaRequirements: VisaRequirement[] = [
  {
    id: "spain",
    country: "España",
    flag: "🇪🇸",
    workVisaTypes: [
      {
        name: "Visado de Trabajo por Cuenta Ajena",
        description: "Para profesionales contratados por una empresa española.",
        duration: "1 año inicial, renovable",
        requirements: [
          "Oferta de trabajo de una empresa española",
          "Título académico homologado (si es requerido para el puesto)",
          "Certificado médico",
          "Certificado de antecedentes penales",
          "Pasaporte con vigencia mínima de 1 año",
        ],
        eligibility: [
          "La empresa debe demostrar que no hay candidatos locales para el puesto",
          "El puesto debe estar en la lista de ocupaciones de difícil cobertura",
        ],
      },
      {
        name: "Visado para Profesionales Altamente Cualificados",
        description: "Para profesionales con alta cualificación o especialización.",
        duration: "2 años, renovable",
        requirements: [
          "Título universitario o 5 años de experiencia profesional",
          "Oferta de trabajo con salario superior a 40.000€ anuales",
          "Certificado de antecedentes penales",
          "Seguro médico",
        ],
        eligibility: [
          "Profesionales con cualificaciones específicas en sectores estratégicos",
          "Investigadores y académicos",
        ],
      },
    ],
    generalRequirements: [
      "Formulario de solicitud de visado nacional",
      "Fotografías recientes tamaño pasaporte",
      "Pago de tasas consulares",
      "Seguro médico con cobertura mínima de 30.000€",
    ],
    processingTime: "2-3 meses",
    averageCost: "€80-€120 (tasas consulares)",
    officialWebsite: "http://www.exteriores.gob.es/",
    additionalInfo:
      "España tiene acuerdos bilaterales con varios países sudamericanos que facilitan el proceso de obtención de visas de trabajo.",
  },
  {
    id: "canada",
    country: "Canadá",
    flag: "🇨🇦",
    workVisaTypes: [
      {
        name: "Permiso de Trabajo Temporal",
        description: "Para trabajadores con una oferta de empleo específica.",
        duration: "Hasta 3 años, según la oferta de trabajo",
        requirements: [
          "Oferta de trabajo de un empleador canadiense",
          "LMIA (Labour Market Impact Assessment) positiva",
          "Prueba de fondos suficientes para mantenerse",
          "Certificado de antecedentes penales",
          "Examen médico",
        ],
        eligibility: [
          "Tener una oferta de trabajo válida",
          "Demostrar intención de regresar al país de origen al finalizar el permiso",
        ],
      },
      {
        name: "Express Entry",
        description: "Sistema para inmigración permanente de trabajadores cualificados.",
        duration: "Residencia permanente",
        requirements: [
          "Educación post-secundaria",
          "Experiencia laboral calificada (mínimo 1 año)",
          "Competencia en inglés o francés (examen IELTS o TEF)",
          "Fondos de asentamiento (excepto si ya tiene trabajo en Canadá)",
          "Puntaje CRS suficiente para recibir una invitación",
        ],
        eligibility: [
          "Profesionales con experiencia en ocupaciones NOC 0, A o B",
          "Puntaje mínimo en el sistema Comprehensive Ranking System (CRS)",
        ],
      },
    ],
    generalRequirements: [
      "Pasaporte válido",
      "Formularios de solicitud completos",
      "Fotografías según especificaciones",
      "Prueba de fondos suficientes",
      "Carta de motivación",
    ],
    processingTime: "2-6 meses (dependiendo del programa)",
    averageCost: "CAD $155-$1,325 (según el tipo de permiso)",
    officialWebsite: "https://www.canada.ca/en/immigration-refugees-citizenship.html",
  },
  {
    id: "australia",
    country: "Australia",
    flag: "🇦🇺",
    workVisaTypes: [
      {
        name: "Temporary Skill Shortage visa (subclass 482)",
        description: "Para trabajadores patrocinados por un empleador australiano.",
        duration: "De 1 a 4 años, según la ocupación",
        requirements: [
          "Patrocinio de un empleador australiano aprobado",
          "Nominación para una ocupación en la lista de ocupaciones elegibles",
          "Evaluación positiva de habilidades",
          "Nivel de inglés competente (IELTS 5.0 o equivalente)",
          "Experiencia laboral relevante (mínimo 2 años)",
        ],
        eligibility: [
          "Tener las calificaciones y experiencia requeridas para la ocupación",
          "Cumplir con los requisitos de salud y carácter",
        ],
      },
      {
        name: "Skilled Independent visa (subclass 189)",
        description: "Para profesionales calificados sin necesidad de patrocinio.",
        duration: "Residencia permanente",
        requirements: [
          "Ocupación en la lista de ocupaciones elegibles",
          "Evaluación positiva de habilidades",
          "Menos de 45 años",
          "Nivel de inglés competente (IELTS 6.0 o equivalente)",
          "Puntaje mínimo en la invitación SkillSelect",
        ],
        eligibility: [
          "Profesionales con habilidades en demanda en Australia",
          "Puntaje suficiente en el sistema de puntos",
        ],
      },
    ],
    generalRequirements: [
      "Pasaporte válido",
      "Certificado de antecedentes penales",
      "Examen médico",
      "Seguro de salud",
      "Declaración de valores australianos",
    ],
    processingTime: "3-12 meses",
    averageCost: "AUD $1,265-$4,115",
    officialWebsite: "https://immi.homeaffairs.gov.au/",
  },
  {
    id: "usa",
    country: "Estados Unidos",
    flag: "🇺🇸",
    workVisaTypes: [
      {
        name: "Visa H-1B",
        description: "Para profesionales en ocupaciones especializadas.",
        duration: "3 años, extensible hasta 6 años",
        requirements: [
          "Patrocinio de un empleador estadounidense",
          "Título universitario relacionado con la posición (mínimo licenciatura)",
          "La posición debe calificar como 'ocupación especializada'",
          "Salario acorde al mercado laboral",
        ],
        eligibility: [
          "Profesionales con título universitario o experiencia equivalente",
          "Estar seleccionado en la lotería H-1B (si aplica)",
        ],
      },
      {
        name: "Visa O-1",
        description: "Para individuos con habilidades extraordinarias.",
        duration: "Hasta 3 años, extensible anualmente",
        requirements: [
          "Demostrar habilidad extraordinaria en ciencias, artes, educación, negocios o deportes",
          "Reconocimiento nacional o internacional",
          "Patrocinio de un empleador o agente",
          "Plan de trabajo específico",
        ],
        eligibility: [
          "Personas con reconocimiento sustancial en su campo",
          "Premios importantes, publicaciones, contribuciones significativas",
        ],
      },
    ],
    generalRequirements: [
      "Formulario DS-160 completado",
      "Pasaporte válido por al menos 6 meses después de la estancia prevista",
      "Fotografía según especificaciones",
      "Pago de tarifas de solicitud",
      "Entrevista consular",
    ],
    processingTime: "3-6 meses (procesamiento regular)",
    averageCost: "$190 (tarifa de solicitud) + $460-$2,500 (petición)",
    officialWebsite: "https://travel.state.gov/content/travel/en/us-visas/employment.html",
  },
  {
    id: "germany",
    country: "Alemania",
    flag: "🇩🇪",
    workVisaTypes: [
      {
        name: "Visa de Trabajo para Profesionales Cualificados",
        description: "Para profesionales con cualificación reconocida.",
        duration: "Hasta 4 años",
        requirements: [
          "Oferta de trabajo concreta de un empleador alemán",
          "Título profesional reconocido en Alemania",
          "Salario mínimo según regulaciones (generalmente €43,800 anuales)",
          "Seguro médico",
          "Conocimientos básicos de alemán (nivel A1-B1, dependiendo del trabajo)",
        ],
        eligibility: [
          "Profesionales con títulos universitarios o formación profesional reconocida",
          "Profesiones en demanda según la lista de ocupaciones",
        ],
      },
      {
        name: "Tarjeta Azul UE (EU Blue Card)",
        description: "Para profesionales altamente cualificados.",
        duration: "4 años (puede llevar a residencia permanente después de 33 meses)",
        requirements: [
          "Título universitario reconocido",
          "Oferta de trabajo con salario mínimo de €56,800 anuales (o €44,304 para profesiones con escasez)",
          "Seguro médico",
        ],
        eligibility: ["Profesionales con título universitario", "Especialistas en áreas STEM o medicina"],
      },
    ],
    generalRequirements: [
      "Formulario de solicitud de visa",
      "Pasaporte válido",
      "Fotografías biométricas",
      "Prueba de seguro médico",
      "Prueba de alojamiento en Alemania",
      "Prueba de fondos suficientes",
    ],
    processingTime: "1-3 meses",
    averageCost: "€75-€100",
    officialWebsite: "https://www.make-it-in-germany.com/",
  },
]
