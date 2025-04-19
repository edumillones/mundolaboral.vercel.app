import Image from "next/image"
import Link from "next/link"
import { Users, Globe, Award, CheckCircle, TrendingUp } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div
            className="h-[400px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop')",
            }}
          >
            <div className="container relative z-20 h-full flex flex-col justify-center">
              <div className="max-w-2xl text-white">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Sobre MundoLaboral</h1>
                <p className="text-lg">
                  Conectamos a profesionales sudamericanos con oportunidades laborales globales para impulsar carreras
                  sin fronteras.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Nuestra Historia</h2>
                <p className="text-gray-700 mb-4">
                  MundoLaboral nació en 2018 en Lima, Perú, con una misión clara: transformar la manera en que los
                  profesionales sudamericanos acceden a oportunidades laborales internacionales.
                </p>
                <p className="text-gray-700 mb-4">
                  Fundada por un equipo de expertos en recursos humanos y migración laboral, nuestra plataforma surgió
                  como respuesta a la creciente demanda de talento sudamericano en mercados globales y la necesidad de
                  un puente confiable entre profesionales y empleadores internacionales.
                </p>
                <p className="text-gray-700">
                  Hoy, MundoLaboral se ha convertido en el referente para miles de profesionales que buscan expandir sus
                  horizontes laborales más allá de las fronteras de Sudamérica, facilitando no solo la conexión con
                  empleadores, sino también brindando asesoría integral en todo el proceso migratorio.
                </p>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=600&auto=format&fit=crop"
                  alt="Equipo de MundoLaboral"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestra Misión y Visión</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Trabajamos con un propósito claro y una visión ambiciosa para el futuro del talento sudamericano.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Misión</h3>
                <p className="text-gray-700">
                  Conectar el talento sudamericano con oportunidades laborales globales, facilitando procesos
                  migratorios y brindando asesoría integral para que profesionales de la región puedan desarrollar
                  carreras exitosas en el extranjero, mejorando su calidad de vida y contribuyendo al intercambio global
                  de conocimiento.
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
                  <TrendingUp className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Visión</h3>
                <p className="text-gray-700">
                  Ser la plataforma líder en Sudamérica para la movilidad laboral internacional, reconocida por
                  transformar positivamente la vida de miles de profesionales a través de oportunidades globales,
                  contribuyendo al desarrollo económico de la región y posicionando el talento sudamericano como
                  referente de excelencia en el mercado laboral mundial.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-white">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestros Valores</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Los principios que guían nuestro trabajo y compromiso con los profesionales sudamericanos.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Integridad</h3>
                <p className="text-gray-600">
                  Actuamos con honestidad y transparencia en cada interacción, priorizando siempre el bienestar de
                  nuestros usuarios.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-secondary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Excelencia</h3>
                <p className="text-gray-600">
                  Nos esforzamos por ofrecer un servicio de la más alta calidad, superando expectativas y mejorando
                  constantemente.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="h-8 w-8 text-yellow-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Compromiso</h3>
                <p className="text-gray-600">
                  Estamos dedicados a acompañar a cada profesional en su camino hacia el éxito laboral internacional.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Nuestro Equipo</h2>
              <p className="text-gray-700 max-w-3xl mx-auto">
                Profesionales apasionados por conectar talento sudamericano con oportunidades globales.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Alejandra Méndez",
                  role: "CEO & Fundadora",
                  image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format&fit=crop",
                },
                {
                  name: "Carlos Herrera",
                  role: "Director de Operaciones",
                  image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=300&auto=format&fit=crop",
                },
                {
                  name: "Valentina Torres",
                  role: "Directora de Relaciones Internacionales",
                  image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format&fit=crop",
                },
                {
                  name: "Martín Sánchez",
                  role: "Director de Tecnología",
                  image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=300&auto=format&fit=crop",
                },
              ].map((member, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="h-64 relative">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      style={{ objectFit: "cover" }}
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-primary">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-6">¿Listo para dar el siguiente paso en tu carrera?</h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Explora oportunidades laborales en el extranjero diseñadas para profesionales sudamericanos como tú.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/jobs" className="btn bg-white text-primary hover:bg-gray-100">
                Explorar Trabajos
              </Link>
              <Link href="/contact" className="btn bg-secondary text-white hover:bg-secondary-dark">
                Contactar Asesor
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
