export interface JobOffer {
  id: number
  title: string
  description: string
  payout: string
  link: string
  logo?: string
  location?: string
  type?: string
  sponsored?: string
  detailPage?: boolean
}

export const jobOffers: JobOffer[] = [
  {
    id: 3737,
    title: "Niñera Virtual con Enfoque en Apoyo Educativo",
    description:
      "Oportunidad para estudiantes en Perú para trabajar remotamente con niños en Canadá y Estados Unidos.",
    payout: "$10 USD por hora",
    link: "/jobs/3737",
    location: "Remoto, Perú",
    type: "Remoto",
    logo: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=80&auto=format&fit=crop",
    detailPage: true,
  },
  {
    id: 3738,
    title: "Programador Junior - Ingeniería de Sistemas",
    description:
      "Buscamos estudiantes de Ingeniería de Sistemas a partir del 4to ciclo para desarrollar aplicaciones web y móviles en una startup tecnológica peruana.",
    payout: "S/. 1,500 - S/. 2,500 mensuales",
    link: "/jobs/3738",
    location: "Lima, Perú",
    type: "Tiempo Parcial",
    logo: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=80&auto=format&fit=crop",
    detailPage: true,
  },
  {
    id: 3739,
    title: "Especialista en Marketing Digital",
    description:
      "Importante agencia de marketing en Argentina busca especialista para gestionar campañas digitales y estrategias de contenido para clientes internacionales.",
    payout: "ARS 250,000 - 350,000 mensuales",
    link: "/jobs/3739",
    location: "Buenos Aires, Argentina",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1557838923-2985c318be48?q=80&w=80&auto=format&fit=crop",
    detailPage: true,
  },
  {
    id: 3732,
    title: "Enfermero/a en Hospitales de España",
    description:
      "Oportunidad para enfermeros calificados en hospitales públicos españoles. Incluye homologación de título.",
    payout: "€2,200 - €2,800 mensuales",
    link: "https://mundolaboral.pe/empleos/enfermeria-espana",
    location: "Madrid, España",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1584982751601-97dcc096659c?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3731,
    title: "Desarrollador Full Stack en Canadá",
    description:
      "Empresa tecnológica busca desarrolladores sudamericanos para trabajar en Toronto con visa de trabajo.",
    payout: "CAD $85,000 - $110,000 anuales",
    link: "https://mundolaboral.pe/empleos/desarrollador-canada",
    location: "Toronto, Canadá",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?q=80&w=80&auto=format&fit=crop",
    sponsored: "TechNorth Inc.",
  },
  {
    id: 3730,
    title: "Chef de Cocina Peruana en Australia",
    description: "Restaurante de comida peruana en Sydney busca chef con experiencia. Patrocinio de visa disponible.",
    payout: "AUD $75,000 - $85,000 anuales",
    link: "https://mundolaboral.pe/empleos/chef-australia",
    location: "Sydney, Australia",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3734,
    title: "Ingeniero Civil en Proyectos de Alemania",
    description: "Importante constructora alemana busca ingenieros civiles para proyectos de infraestructura.",
    payout: "€55,000 - €70,000 anuales",
    link: "https://mundolaboral.pe/empleos/ingeniero-alemania",
    location: "Berlín, Alemania",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3729,
    title: "Profesor de Español en Japón",
    description: "Academia de idiomas en Tokio busca profesores nativos de español de Sudamérica.",
    payout: "¥280,000 - ¥350,000 mensuales",
    link: "https://mundolaboral.pe/empleos/profesor-japon",
    location: "Tokio, Japón",
    type: "Contrato",
    logo: "https://images.unsplash.com/photo-1580894894513-541e068a3e2b?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3735,
    title: "Especialista en Marketing Digital en Estados Unidos",
    description:
      "Agencia de marketing busca profesionales bilingües para trabajar remotamente desde Perú para clientes de EE.UU.",
    payout: "$3,500 - $5,000 mensuales",
    link: "https://mundolaboral.pe/empleos/marketing-eeuu",
    location: "Remoto (EE.UU.)",
    type: "Remoto",
    logo: "https://images.unsplash.com/photo-1611174743420-3d7df880ce32?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3788,
    title: "Técnico en Energías Renovables en Chile",
    description: "Empresa líder en energía solar busca técnicos para proyectos en el norte de Chile.",
    payout: "CLP $1,200,000 - $1,500,000 mensuales",
    link: "https://mundolaboral.pe/empleos/tecnico-chile",
    location: "Antofagasta, Chile",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3728,
    title: "Contador con experiencia internacional en México",
    description:
      "Multinacional busca contadores con conocimiento en normas internacionales para su sede en Ciudad de México.",
    payout: "MXN $45,000 - $60,000 mensuales",
    link: "https://mundolaboral.pe/empleos/contador-mexico",
    location: "Ciudad de México, México",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3733,
    title: "Gerente de Operaciones Hoteleras en Dubai",
    description:
      "Cadena de hoteles de lujo busca gerentes con experiencia en el sector turístico para sus propiedades en EAU.",
    payout: "AED 20,000 - 30,000 mensuales",
    link: "https://mundolaboral.pe/empleos/gerente-dubai",
    location: "Dubai, EAU",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=80&auto=format&fit=crop",
  },
  {
    id: 3736,
    title: "Programador Backend en Nueva Zelanda",
    description:
      "Startup tecnológica busca programadores con experiencia en Python y Django. Patrocinio de visa disponible.",
    payout: "NZD $90,000 - $120,000 anuales",
    link: "https://mundolaboral.pe/empleos/programador-nueva-zelanda",
    location: "Auckland, Nueva Zelanda",
    type: "Tiempo Completo",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?q=80&w=80&auto=format&fit=crop",
    sponsored: "TechKiwi Solutions",
  },
]
