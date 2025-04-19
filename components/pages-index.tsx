import React from "react"
import Link from "next/link"
import { FileText, Users, Briefcase, Globe, Phone, BookOpen, HelpCircle, FileCheck } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface PageLink {
  title: string
  description: string
  icon: React.ReactNode
  url: string
  status: "available" | "coming-soon"
}

export default function PagesIndex() {
  const pageLinks: PageLink[] = [
    {
      title: "Inicio",
      description: "Página principal de MundoLaboral",
      icon: <FileText className="h-6 w-6" />,
      url: "/",
      status: "available",
    },
    {
      title: "Sobre Nosotros",
      description: "Conoce más sobre nuestra misión y equipo",
      icon: <Users className="h-6 w-6" />,
      url: "/about",
      status: "available",
    },
    {
      title: "Trabajos",
      description: "Explora oportunidades laborales en el extranjero",
      icon: <Briefcase className="h-6 w-6" />,
      url: "/jobs",
      status: "available",
    },
    {
      title: "Requisitos de Visa",
      description: "Información sobre visas para diferentes países",
      icon: <FileCheck className="h-6 w-6" />,
      url: "/visas",
      status: "available",
    },
    {
      title: "Blog",
      description: "Artículos y consejos sobre trabajo en el extranjero",
      icon: <BookOpen className="h-6 w-6" />,
      url: "/blog",
      status: "coming-soon",
    },
    {
      title: "Preguntas Frecuentes",
      description: "Respuestas a las dudas más comunes",
      icon: <HelpCircle className="h-6 w-6" />,
      url: "/faq",
      status: "coming-soon",
    },
    {
      title: "Destinos",
      description: "Información sobre países populares para trabajar",
      icon: <Globe className="h-6 w-6" />,
      url: "/destinations",
      status: "coming-soon",
    },
    {
      title: "Contacto",
      description: "Ponte en contacto con nuestro equipo",
      icon: <Phone className="h-6 w-6" />,
      url: "/contact",
      status: "available",
    },
  ]

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <section className="py-16">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">Páginas de MundoLaboral</h1>
              <p className="text-lg text-gray-600">
                Explora todas las secciones y recursos disponibles en nuestra plataforma para ayudarte a encontrar
                oportunidades laborales en el extranjero.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pageLinks.map((page, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="p-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                      {React.cloneElement(page.icon as React.ReactElement, {
                        className: "h-6 w-6 text-primary",
                      })}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{page.title}</h3>
                    <p className="text-gray-600 mb-4">{page.description}</p>
                    {page.status === "available" ? (
                      <Link
                        href={page.url}
                        className="text-primary font-medium hover:text-primary-dark transition-colors"
                      >
                        Visitar página →
                      </Link>
                    ) : (
                      <span className="text-yellow-600 bg-yellow-100 px-3 py-1 rounded-full text-sm font-medium">
                        Próximamente
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 bg-primary">
          <div className="container text-center">
            <h2 className="text-3xl font-bold text-white mb-6">¿No encuentras lo que buscas?</h2>
            <p className="text-white text-lg mb-8 max-w-2xl mx-auto">
              Si necesitas información adicional o tienes alguna consulta específica, nuestro equipo está listo para
              ayudarte.
            </p>
            <Link href="/contact" className="btn bg-white text-primary hover:bg-gray-100">
              Contactar Ahora
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
