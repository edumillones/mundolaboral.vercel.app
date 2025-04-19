import Image from "next/image"

interface Testimonial {
  id: number
  name: string
  role: string
  company: string
  comment: string
  avatar: string
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Carlos Mendoza",
      role: "Ingeniero de Software",
      company: "TechGlobal España",
      comment:
        "Gracias a MundoLaboral encontré un excelente trabajo en España. El proceso fue sencillo y el equipo me apoyó con todos los trámites migratorios.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 2,
      name: "Luciana Vargas",
      role: "Especialista en Marketing Digital",
      company: "GlobalMedia Canadá",
      comment:
        "Estaba buscando oportunidades internacionales y MundoLaboral me conectó con una empresa en Canadá. Ahora tengo un mejor salario y calidad de vida.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
    },
    {
      id: 3,
      name: "Alejandro Fuentes",
      role: "Chef Ejecutivo",
      company: "Grand Resort Australia",
      comment:
        "Como profesional gastronómico, siempre soñé con trabajar en el extranjero. MundoLaboral hizo este sueño realidad conectándome con un resort en Australia.",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
    },
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <h2 className="text-3xl font-bold text-center mb-8">Lo Que Dicen Nuestros Usuarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-700 italic mb-4">"{testimonial.comment}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full mr-4"
                />
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-gray-500">
                    {testimonial.role}, {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
