"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MapPin, Clock, DollarSign, Share2, Heart, CheckCircle, AlertCircle, Upload } from "lucide-react"
import type { JobOffer } from "@/data/job-offers"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface JobDetailPageProps {
  job: JobOffer
}

export default function JobDetailMarketing({ job }: JobDetailPageProps) {
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    education: "",
    experience: "",
    englishLevel: "",
    portfolio: "",
    coverLetter: "",
    resumeFile: null as File | null,
    termsAccepted: false,
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [resumeFileName, setResumeFileName] = useState("")

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: job.title,
          text: job.description,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard.writeText(window.location.href)
      alert("Enlace copiado al portapapeles")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData({
      ...formData,
      [name]: checked,
    })

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      setFormData({
        ...formData,
        resumeFile: file,
      })
      setResumeFileName(file.name)

      if (errors.resumeFile) {
        setErrors({
          ...errors,
          resumeFile: "",
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "El nombre es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.education.trim()) newErrors.education = "La formación académica es requerida"
    if (!formData.experience.trim()) newErrors.experience = "La experiencia es requerida"
    if (!formData.englishLevel) newErrors.englishLevel = "El nivel de inglés es requerido"
    if (!formData.coverLetter.trim()) newErrors.coverLetter = "La carta de presentación es requerida"
    if (!formData.resumeFile) newErrors.resumeFile = "El CV es requerido"
    if (!formData.termsAccepted) newErrors.termsAccepted = "Debes aceptar los términos y condiciones"

    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementsByName(firstErrorField)[0]
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsSubmitting(true)

    try {
      const formDataObj = new FormData()
      formDataObj.append("name", formData.name)
      formDataObj.append("email", formData.email)
      formDataObj.append("phone", formData.phone)
      formDataObj.append("education", formData.education)
      formDataObj.append("experience", formData.experience)
      formDataObj.append("englishLevel", formData.englishLevel)
      formDataObj.append("portfolio", formData.portfolio)
      formDataObj.append("coverLetter", formData.coverLetter)
      formDataObj.append("termsAccepted", String(formData.termsAccepted))
      formDataObj.append("jobTitle", job.title)

      if (formData.resumeFile) {
        formDataObj.append("resumeFile", formData.resumeFile)
      }

      const response = await fetch("/api/send-email", {
        method: "POST",
        body: formDataObj,
      })

      if (!response.ok) throw new Error("Error en la petición")

      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)

        setTimeout(() => {
          const params = new URLSearchParams({
            name: encodeURIComponent(formData.name),
            email: encodeURIComponent(formData.email),
            job: encodeURIComponent(job.title),
          })
          router.push(`/register?${params.toString()}`)
        }, 2000)
      } else {
        alert(result.error || "Ocurrió un error al enviar tu aplicación. Por favor, intenta nuevamente.")
        setIsSubmitting(false)
      }
    } catch (error) {
      console.error("Error al enviar el formulario:", error)
      alert("Ocurrió un error al enviar tu aplicación. Por favor, intenta nuevamente.")
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Job Detail Section */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              {/* Breadcrumbs */}
              <div className="mb-6 text-sm">
                <Link href="/" className="text-gray-500 hover:text-primary">
                  Inicio
                </Link>{" "}
                /{" "}
                <Link href="/jobs" className="text-gray-500 hover:text-primary">
                  Trabajos
                </Link>{" "}
                / <span className="text-gray-700">{job.title}</span>
              </div>

              {/* Job Header */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 md:p-8">
                  <div className="flex flex-col md:flex-row md:items-center">
                    <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                      <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                        <Image
                          src={job.logo || `/placeholder.svg?height=80&width=80`}
                          alt={job.title}
                          width={80}
                          height={80}
                        />
                      </div>
                    </div>

                    <div className="flex-grow">
                      <h1 className="text-2xl md:text-3xl font-bold mb-3">{job.title}</h1>
                      <p className="text-gray-600 mb-4">{job.description}</p>

                      <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                        {job.location && (
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-1" />
                            <span>{job.location}</span>
                          </div>
                        )}

                        {job.type && (
                          <div className="flex items-center">
                            <Clock size={16} className="mr-1" />
                            <span>{job.type}</span>
                          </div>
                        )}

                        <div className="flex items-center text-green-600 font-medium">
                          <DollarSign size={16} className="mr-1" />
                          <span>{job.payout}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center mt-4 md:mt-0 space-x-3">
                      <button
                        onClick={toggleFavorite}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Add to favorites"
                      >
                        <Heart
                          size={20}
                          fill={isFavorite ? "currentColor" : "none"}
                          className={isFavorite ? "text-red-500" : "text-gray-500"}
                        />
                      </button>
                      <button
                        onClick={handleShare}
                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                        aria-label="Share job"
                      >
                        <Share2 size={20} className="text-gray-500" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Job Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content */}
                <div className="md:col-span-2">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                    <div className="p-6 md:p-8">
                      <h2 className="text-xl font-bold mb-4">Descripción del Puesto</h2>
                      <div className="prose max-w-none">
                        <p className="mb-4">
                          ¿Eres un apasionado del marketing digital con experiencia en estrategias de contenido y
                          campañas publicitarias? ¡Esta es tu oportunidad para unirte a una agencia líder en Argentina y
                          trabajar con clientes internacionales!
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Sobre la Empresa</h3>
                        <p className="mb-4">
                          Somos una agencia de marketing digital en pleno crecimiento con sede en Buenos Aires,
                          Argentina. Trabajamos con clientes de diversos sectores en América Latina, Estados Unidos y
                          Europa, ofreciendo soluciones integrales de marketing digital que generan resultados
                          tangibles.
                        </p>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Responsabilidades</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          <li>
                            Desarrollar e implementar estrategias de marketing digital para clientes nacionales e
                            internacionales.
                          </li>
                          <li>
                            Gestionar campañas publicitarias en plataformas como Google Ads, Facebook Ads, Instagram Ads
                            y LinkedIn Ads.
                          </li>
                          <li>Crear y supervisar estrategias de contenido para redes sociales, blogs y newsletters.</li>
                          <li>Realizar análisis de datos y métricas para optimizar campañas y mejorar el ROI.</li>
                          <li>Elaborar informes mensuales de rendimiento para clientes.</li>
                          <li>
                            Mantenerse actualizado sobre las últimas tendencias y mejores prácticas en marketing
                            digital.
                          </li>
                          <li>Colaborar con el equipo creativo para desarrollar materiales de marketing efectivos.</li>
                          <li>
                            Gestionar presupuestos de marketing y asegurar una utilización eficiente de los recursos.
                          </li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Requisitos</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          <li>Licenciatura en Marketing, Comunicación, Publicidad o campos relacionados.</li>
                          <li>Al menos 3 años de experiencia en marketing digital, preferiblemente en agencias.</li>
                          <li>
                            Conocimiento profundo de plataformas publicitarias (Google Ads, Facebook Business Manager,
                            etc.).
                          </li>
                          <li>Experiencia en SEO/SEM y analítica web (Google Analytics, Search Console).</li>
                          <li>Habilidades avanzadas en gestión de redes sociales y creación de contenido.</li>
                          <li>Capacidad para analizar datos y tomar decisiones basadas en métricas.</li>
                          <li>Excelentes habilidades de comunicación escrita y verbal.</li>
                          <li>
                            Nivel de inglés avanzado (indispensable para comunicación con clientes internacionales).
                          </li>
                          <li>Capacidad para trabajar en equipo y gestionar múltiples proyectos simultáneamente.</li>
                          <li>Conocimiento de herramientas de diseño como Canva o Adobe Creative Suite (deseable).</li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Ofrecemos</h3>
                        <ul className="list-disc pl-5 space-y-2 mb-4">
                          <li>
                            Salario competitivo: ARS 250,000 - 350,000 mensuales (según experiencia y habilidades).
                          </li>
                          <li>Contrato a tiempo completo.</li>
                          <li>Horario flexible y posibilidad de trabajo híbrido (3 días presenciales, 2 remotos).</li>
                          <li>Oportunidades de crecimiento profesional y desarrollo de carrera.</li>
                          <li>Capacitación continua y participación en eventos del sector.</li>
                          <li>Ambiente de trabajo dinámico y colaborativo.</li>
                          <li>Oficinas modernas en el centro de Buenos Aires.</li>
                          <li>
                            Beneficios adicionales: seguro médico privado, días adicionales de vacaciones, bonos por
                            desempeño.
                          </li>
                        </ul>

                        <h3 className="text-lg font-semibold mt-6 mb-3">Proceso de Selección</h3>
                        <ol className="list-decimal pl-5 space-y-2 mb-4">
                          <li>Revisión de CV y carta de presentación.</li>
                          <li>Entrevista inicial (virtual).</li>
                          <li>
                            Prueba práctica: desarrollo de una estrategia de marketing digital para un caso hipotético.
                          </li>
                          <li>Entrevista final con el director de la agencia y el equipo de trabajo.</li>
                          <li>Oferta laboral.</li>
                        </ol>

                        <p className="mt-6">
                          Si estás buscando un entorno desafiante donde puedas aplicar y expandir tus conocimientos en
                          marketing digital, ¡esta es tu oportunidad! Únete a nuestro equipo y forma parte de proyectos
                          emocionantes con clientes de todo el mundo.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="md:col-span-1">
                  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8 sticky top-24">
                    <div className="p-6">
                      <h2 className="text-xl font-bold mb-4">Resumen</h2>
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Ubicación</h3>
                          <p className="font-medium">{job.location}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Tipo de Empleo</h3>
                          <p className="font-medium">{job.type}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Salario</h3>
                          <p className="font-medium text-green-600">{job.payout}</p>
                        </div>
                        <div>
                          <h3 className="text-sm font-medium text-gray-500">Fecha de Publicación</h3>
                          <p className="font-medium">20 de Abril, 2024</p>
                        </div>
                      </div>

                      <div className="mt-6">
                        <a href="#application-form" className="btn btn-primary w-full flex items-center justify-center">
                          Postular Ahora
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div id="application-form" className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Postular a esta Oferta</h2>

                  {isSubmitted ? (
                    <div className="text-center py-4 sm:py-8">
                      <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                        <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                      </div>
                      <h3 className="text-lg sm:text-2xl font-bold text-green-700 mb-3 sm:mb-4">
                        ¡Ahora completa tu registro!
                      </h3>
                      <p className="text-base sm:text-lg text-gray-700 mb-4 sm:mb-6 mx-auto">
                        Hemos recibido tu postulación para el puesto de {job.title}. Redireccionando para completar tu
                        registro...
                      </p>
                      <div className="flex justify-center">
                        <div className="animate-spin rounded-full h-6 w-6 sm:h-8 sm:w-8 border-b-2 border-primary"></div>
                      </div>
                    </div>
                  ) : (
                    <form ref={formRef} onSubmit={handleSubmit}>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Nombre Completo *
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.name ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Tu nombre completo"
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
                            value={formData.email}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.email ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="tu@email.com"
                          />
                          {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                        </div>

                        <div>
                          <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            Teléfono *
                          </label>
                          <input
                            type="tel"
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.phone ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="+54 11 1234 5678"
                          />
                          {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                        </div>

                        <div>
                          <label htmlFor="education" className="block text-sm font-medium text-gray-700 mb-1">
                            Formación Académica *
                          </label>
                          <input
                            type="text"
                            id="education"
                            name="education"
                            value={formData.education}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.education ? "border-red-500" : "border-gray-300"
                            }`}
                            placeholder="Ej: Licenciatura en Marketing, Universidad de Buenos Aires"
                          />
                          {errors.education && <p className="mt-1 text-sm text-red-600">{errors.education}</p>}
                        </div>

                        <div>
                          <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                            Años de Experiencia *
                          </label>
                          <select
                            id="experience"
                            name="experience"
                            value={formData.experience}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.experience ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Selecciona tu experiencia</option>
                            <option value="1-2 años">1-2 años</option>
                            <option value="3-5 años">3-5 años</option>
                            <option value="5-7 años">5-7 años</option>
                            <option value="Más de 7 años">Más de 7 años</option>
                          </select>
                          {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                        </div>

                        <div>
                          <label htmlFor="englishLevel" className="block text-sm font-medium text-gray-700 mb-1">
                            Nivel de Inglés *
                          </label>
                          <select
                            id="englishLevel"
                            name="englishLevel"
                            value={formData.englishLevel}
                            onChange={handleInputChange}
                            className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                              errors.englishLevel ? "border-red-500" : "border-gray-300"
                            }`}
                          >
                            <option value="">Selecciona tu nivel</option>
                            <option value="Básico">Básico</option>
                            <option value="Intermedio">Intermedio</option>
                            <option value="Avanzado">Avanzado</option>
                            <option value="Nativo">Nativo</option>
                          </select>
                          {errors.englishLevel && <p className="mt-1 text-sm text-red-600">{errors.englishLevel}</p>}
                        </div>

                        <div>
                          <label htmlFor="portfolio" className="block text-sm font-medium text-gray-700 mb-1">
                            Portfolio o Sitio Web (Opcional)
                          </label>
                          <input
                            type="url"
                            id="portfolio"
                            name="portfolio"
                            value={formData.portfolio}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                            placeholder="https://tuportfolio.com"
                          />
                        </div>
                      </div>

                      <div className="mb-6">
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                          Carta de Presentación *
                        </label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          rows={5}
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.coverLetter ? "border-red-500" : "border-gray-300"
                          }`}
                          placeholder="Explica tu experiencia en marketing digital, tus logros más destacados y por qué te interesa esta posición..."
                        ></textarea>
                        {errors.coverLetter && <p className="mt-1 text-sm text-red-600">{errors.coverLetter}</p>}
                      </div>

                      <div className="mb-6">
                        <label htmlFor="resumeFile" className="block text-sm font-medium text-gray-700 mb-1">
                          Curriculum Vitae (PDF) *
                        </label>
                        <div
                          className={`border-2 border-dashed rounded-md p-6 text-center ${
                            errors.resumeFile ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <input
                            type="file"
                            id="resumeFile"
                            name="resumeFile"
                            accept=".pdf"
                            onChange={handleFileChange}
                            className="hidden"
                          />
                          {resumeFileName ? (
                            <div>
                              <p className="text-green-600 font-medium mb-2">Archivo seleccionado:</p>
                              <p className="text-gray-700">{resumeFileName}</p>
                              <button
                                type="button"
                                onClick={() => document.getElementById("resumeFile")?.click()}
                                className="mt-3 text-primary hover:text-primary-dark underline"
                              >
                                Cambiar archivo
                              </button>
                            </div>
                          ) : (
                            <>
                              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                              <p className="text-gray-700 mb-2">
                                Arrastra y suelta tu CV aquí, o{" "}
                                <button
                                  type="button"
                                  onClick={() => document.getElementById("resumeFile")?.click()}
                                  className="text-primary hover:text-primary-dark underline"
                                >
                                  selecciona un archivo
                                </button>
                              </p>
                              <p className="text-gray-500 text-sm">Solo archivos PDF (máx. 5MB)</p>
                            </>
                          )}
                        </div>
                        {errors.resumeFile && <p className="mt-1 text-sm text-red-600">{errors.resumeFile}</p>}
                      </div>

                      <div className="mb-6">
                        <div className="flex items-start">
                          <div className="flex items-center h-5">
                            <input
                              id="termsAccepted"
                              name="termsAccepted"
                              type="checkbox"
                              checked={formData.termsAccepted}
                              onChange={handleCheckboxChange}
                              className={`h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded ${
                                errors.termsAccepted ? "border-red-500" : ""
                              }`}
                            />
                          </div>
                          <div className="ml-3 text-sm">
                            <label htmlFor="termsAccepted" className="font-medium text-gray-700">
                              Acepto los términos y condiciones *
                            </label>
                            <p className="text-gray-500">
                              Al enviar este formulario, acepto que MundoLaboral procese mis datos personales de acuerdo
                              con la{" "}
                              <a href="#" className="text-primary hover:underline">
                                Política de Privacidad
                              </a>
                              .
                            </p>
                            {errors.termsAccepted && (
                              <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                        <div className="flex">
                          <div className="flex-shrink-0">
                            <AlertCircle className="h-5 w-5 text-yellow-400" />
                          </div>
                          <div className="ml-3">
                            <p className="text-sm text-yellow-700">
                              Asegúrate de destacar en tu CV y carta de presentación tus logros cuantificables en
                              campañas de marketing digital y tu experiencia con clientes internacionales.
                            </p>
                          </div>
                        </div>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full btn btn-primary py-3 text-lg flex items-center justify-center"
                      >
                        {isSubmitting ? (
                          <>
                            <svg
                              className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
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
                          "Continuar Postulación"
                        )}
                      </button>
                    </form>
                  )}
                </div>
              </div>

              {/* Related Jobs */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-6 md:p-8">
                  <h2 className="text-2xl font-bold mb-6">Trabajos Similares</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                      {
                        title: "Especialista en Marketing Digital en Estados Unidos",
                        location: "Remoto (EE.UU.)",
                        type: "Remoto",
                        payout: "$3,500 - $5,000 mensuales",
                        link: "/jobs",
                      },
                      {
                        title: "Gerente de Marketing Digital",
                        location: "Ciudad de México, México",
                        type: "Tiempo Completo",
                        payout: "MXN $45,000 - $60,000 mensuales",
                        link: "/jobs",
                      },
                    ].map((relatedJob, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <h3 className="font-semibold mb-2">{relatedJob.title}</h3>
                        <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-3">
                          {relatedJob.location && (
                            <div className="flex items-center">
                              <MapPin size={14} className="mr-1" />
                              <span>{relatedJob.location}</span>
                            </div>
                          )}
                          {relatedJob.type && (
                            <div className="flex items-center">
                              <Clock size={14} className="mr-1" />
                              <span>{relatedJob.type}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center text-green-600 font-medium text-sm mb-3">
                          <DollarSign size={14} className="mr-1" />
                          <span>{relatedJob.payout}</span>
                        </div>
                        <Link href={relatedJob.link} className="text-primary hover:underline text-sm">
                          Ver Detalles →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
