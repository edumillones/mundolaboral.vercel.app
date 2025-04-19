"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Mail, Send, CheckCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
    // Clear error when user types
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formState.name.trim()) {
      newErrors.name = "El nombre es requerido"
    }

    if (!formState.email.trim()) {
      newErrors.email = "El email es requerido"
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = "El email no es válido"
    }

    if (!formState.subject) {
      newErrors.subject = "El asunto es requerido"
    }

    if (!formState.message.trim()) {
      newErrors.message = "El mensaje es requerido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      setFormState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 1500)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Contacta con Nosotros</h1>
              <p className="text-lg">
                Estamos aquí para ayudarte a encontrar oportunidades laborales en el extranjero. Nuestro equipo de
                asesores está listo para responder tus preguntas.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Información de Contacto</h2>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Dirección</h3>
                        <p className="text-gray-600">Av. Javier Prado 2456, San Isidro, Lima, Perú</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Phone className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Teléfono</h3>
                        <p className="text-gray-600">+51 (1) 234-5678</p>
                        <p className="text-gray-600">+51 987 654 321</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-gray-600">info@mundolaboral.pe</p>
                        <p className="text-gray-600">soporte@mundolaboral.pe</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="font-semibold text-lg mb-3">Horario de Atención</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>Lunes a Viernes: 9:00 AM - 6:00 PM</p>
                      <p>Sábados: 9:00 AM - 1:00 PM</p>
                      <p>Domingos: Cerrado</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-md p-6">
                  <h2 className="text-2xl font-bold mb-6">Envíanos un Mensaje</h2>

                  {isSubmitted ? (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-bold text-green-800 mb-2">¡Mensaje Enviado!</h3>
                      <p className="text-green-700 mb-4">
                        Gracias por contactarnos. Uno de nuestros asesores se pondrá en contacto contigo pronto.
                      </p>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="btn bg-green-600 text-white hover:bg-green-700"
                      >
                        Enviar otro mensaje
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Completo *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formState.name}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Tu nombre"
                          />
                          {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                        </div>

                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email *
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formState.email}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="tu@email.com"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono (Opcional)
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formState.phone}
                            onChange={handleChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="+51 987 654 321"
                          />
                        </div>

                        <div>
                          <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                            Asunto *
                          </label>
                          <select
                            id="subject"
                            name="subject"
                            value={formState.subject}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.subject ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Selecciona un asunto</option>
                            <option value="Información general">Información general</option>
                            <option value="Asesoría laboral">Asesoría laboral</option>
                            <option value="Requisitos de visa">Requisitos de visa</option>
                            <option value="Oportunidades laborales">Oportunidades laborales</option>
                            <option value="Otro">Otro</option>
                          </select>
                          {errors.subject && <p className="mt-1 text-sm text-red-600">{errors.subject}</p>}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                          Mensaje *
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formState.message}
                          onChange={handleChange}
                          rows={5}
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.message ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="¿En qué podemos ayudarte?"
                        ></textarea>
                        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message}</p>}
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-primary w-full flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              ></circle>
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                              ></path>
                            </svg>
                            Enviando...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-5 w-5" /> Enviar Mensaje
                          </>
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-8">Nuestra Ubicación</h2>
            <div className="rounded-lg overflow-hidden shadow-md h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.6789430124!2d-77.03800492394182!3d-12.09747914583576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c85a5b5c73f3%3A0x9a354d10c8f12584!2sAv.%20Javier%20Prado%20Este%2C%20San%20Isidro%2015036%2C%20Peru!5e0!3m2!1sen!2sus!4v1682458123456!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8">Preguntas Frecuentes</h2>

              <div className="space-y-6">
                {[
                  {
                    question: "¿Cómo puedo aplicar a un trabajo en el extranjero?",
                    answer:
                      "Para aplicar a un trabajo, simplemente navega a nuestra sección de 'Trabajos', encuentra una oportunidad que te interese y haz clic en 'Postular Ahora'. Nuestro equipo revisará tu aplicación y te contactará para los siguientes pasos.",
                  },
                  {
                    question: "¿Qué documentos necesito para trabajar en el extranjero?",
                    answer:
                      "Los documentos varían según el país de destino, pero generalmente necesitarás pasaporte vigente, visa de trabajo, títulos académicos apostillados, certificados de experiencia laboral y, en algunos casos, certificados de idiomas. Puedes consultar nuestra sección de 'Requisitos de Visa' para información específica por país.",
                  },
                  {
                    question: "¿MundoLaboral cobra por sus servicios?",
                    answer:
                      "La búsqueda y aplicación a trabajos en nuestra plataforma es completamente gratuita. Ofrecemos servicios premium de asesoría personalizada, preparación de CV internacional y coaching para entrevistas que tienen un costo. Contáctanos para más detalles sobre estos servicios.",
                  },
                  {
                    question: "¿Cuánto tiempo toma el proceso de obtener un trabajo en el extranjero?",
                    answer:
                      "El tiempo varía según el país, la industria y tu perfil profesional. En promedio, desde la aplicación hasta la obtención de visa y traslado, el proceso puede tomar entre 3 y 6 meses. Nuestros asesores te guiarán para optimizar los tiempos en cada etapa del proceso.",
                  },
                ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
