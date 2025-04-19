"use client"

import type React from "react"

import { useState } from "react"
import { Upload, CheckCircle, AlertCircle } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  country: string
  profession: string
  experience: string
  preferredCountries: string[]
  englishLevel: string
  otherLanguages: string
  resumeFile: File | null
  coverLetter: string
  termsAccepted: boolean
}

export default function ApplyPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    country: "",
    profession: "",
    experience: "",
    preferredCountries: [],
    englishLevel: "",
    otherLanguages: "",
    resumeFile: null,
    coverLetter: "",
    termsAccepted: false,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [resumeFileName, setResumeFileName] = useState("")

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Clear error when user types
    if (errors[name as keyof FormData]) {
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

    // Clear error when user checks
    if (errors[name as keyof FormData]) {
      setErrors({
        ...errors,
        [name]: "",
      })
    }
  }

  const handleMultiSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options
    const selectedValues = []
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedValues.push(options[i].value)
      }
    }

    setFormData({
      ...formData,
      [e.target.name]: selectedValues,
    })

    // Clear error when user selects
    if (errors[e.target.name as keyof FormData]) {
      setErrors({
        ...errors,
        [e.target.name]: "",
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

      // Clear error when user uploads
      if (errors.resumeFile) {
        setErrors({
          ...errors,
          resumeFile: "",
        })
      }
    }
  }

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {}

    // Required fields
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es requerido"
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es requerido"
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    if (!formData.phone.trim()) newErrors.phone = "El teléfono es requerido"
    if (!formData.country.trim()) newErrors.country = "El país de residencia es requerido"
    if (!formData.profession.trim()) newErrors.profession = "La profesión es requerida"
    if (!formData.experience) newErrors.experience = "La experiencia es requerida"
    if (formData.preferredCountries.length === 0)
      newErrors.preferredCountries = "Selecciona al menos un país de preferencia"
    if (!formData.englishLevel) newErrors.englishLevel = "El nivel de inglés es requerido"
    if (!formData.resumeFile) newErrors.resumeFile = "El CV es requerido"
    if (!formData.termsAccepted) newErrors.termsAccepted = "Debes aceptar los términos y condiciones"

    // Email validation
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "El email no es válido"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0]
      const element = document.getElementsByName(firstErrorField)[0]
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSubmitted(true)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }, 2000)
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Postula a Trabajos en el Extranjero</h1>
              <p className="text-lg">
                Completa el formulario a continuación y nuestro equipo te ayudará a encontrar oportunidades laborales
                que se ajusten a tu perfil profesional.
              </p>
            </div>
          </div>
        </section>

        {/* Application Form */}
        <section className="py-12">
          <div className="container">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
              {isSubmitted ? (
                <div className="p-8 text-center">
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-3xl font-bold text-green-700 mb-4">¡Postulación Enviada!</h2>
                  <p className="text-lg text-gray-700 mb-6">
                    Hemos recibido tu información correctamente. Nuestro equipo revisará tu perfil y te contactará en
                    breve para discutir las oportunidades laborales disponibles que se ajusten a tus habilidades y
                    preferencias.
                  </p>
                  <p className="text-gray-600 mb-8">
                    Mientras tanto, te invitamos a explorar nuestra sección de requisitos de visa y preparar la
                    documentación necesaria para agilizar el proceso cuando encuentres la oportunidad ideal.
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <button
                      onClick={() => (window.location.href = "/")}
                      className="btn bg-gray-200 text-gray-800 hover:bg-gray-300"
                    >
                      Volver al Inicio
                    </button>
                    <button onClick={() => (window.location.href = "/visas")} className="btn btn-primary">
                      Ver Requisitos de Visa
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="p-8 border-b">
                    <h2 className="text-2xl font-bold mb-6">Información Personal</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.firstName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>}
                      </div>

                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                          Apellido *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.lastName ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>}
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
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                          Teléfono (con código de país) *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          placeholder="+51 987 654 321"
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.phone ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone}</p>}
                      </div>

                      <div>
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                          País de Residencia *
                        </label>
                        <select
                          id="country"
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.country ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="">Selecciona tu país</option>
                          <option value="Argentina">Argentina</option>
                          <option value="Bolivia">Bolivia</option>
                          <option value="Brasil">Brasil</option>
                          <option value="Chile">Chile</option>
                          <option value="Colombia">Colombia</option>
                          <option value="Ecuador">Ecuador</option>
                          <option value="Paraguay">Paraguay</option>
                          <option value="Perú">Perú</option>
                          <option value="Uruguay">Uruguay</option>
                          <option value="Venezuela">Venezuela</option>
                        </select>
                        {errors.country && <p className="mt-1 text-sm text-red-600">{errors.country}</p>}
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border-b">
                    <h2 className="text-2xl font-bold mb-6">Información Profesional</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="profession" className="block text-sm font-medium text-gray-700 mb-1">
                          Profesión/Título *
                        </label>
                        <input
                          type="text"
                          id="profession"
                          name="profession"
                          value={formData.profession}
                          onChange={handleInputChange}
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.profession ? "border-red-500" : "border-gray-300"
                          }`}
                        />
                        {errors.profession && <p className="mt-1 text-sm text-red-600">{errors.profession}</p>}
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
                          <option value="0-1">Menos de 1 año</option>
                          <option value="1-3">1-3 años</option>
                          <option value="3-5">3-5 años</option>
                          <option value="5-10">5-10 años</option>
                          <option value="10+">Más de 10 años</option>
                        </select>
                        {errors.experience && <p className="mt-1 text-sm text-red-600">{errors.experience}</p>}
                      </div>

                      <div className="md:col-span-2">
                        <label htmlFor="preferredCountries" className="block text-sm font-medium text-gray-700 mb-1">
                          Países de Interés * (Mantén presionado Ctrl para seleccionar múltiples)
                        </label>
                        <select
                          id="preferredCountries"
                          name="preferredCountries"
                          multiple
                          size={5}
                          value={formData.preferredCountries}
                          onChange={handleMultiSelectChange}
                          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-primary focus:border-primary ${
                            errors.preferredCountries ? "border-red-500" : "border-gray-300"
                          }`}
                        >
                          <option value="España">España</option>
                          <option value="Canadá">Canadá</option>
                          <option value="Australia">Australia</option>
                          <option value="Estados Unidos">Estados Unidos</option>
                          <option value="Alemania">Alemania</option>
                          <option value="Nueva Zelanda">Nueva Zelanda</option>
                          <option value="Reino Unido">Reino Unido</option>
                          <option value="Japón">Japón</option>
                          <option value="Irlanda">Irlanda</option>
                          <option value="Países Bajos">Países Bajos</option>
                        </select>
                        {errors.preferredCountries && (
                          <p className="mt-1 text-sm text-red-600">{errors.preferredCountries}</p>
                        )}
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
                        <label htmlFor="otherLanguages" className="block text-sm font-medium text-gray-700 mb-1">
                          Otros Idiomas (Opcional)
                        </label>
                        <input
                          type="text"
                          id="otherLanguages"
                          name="otherLanguages"
                          value={formData.otherLanguages}
                          onChange={handleInputChange}
                          placeholder="Ej: Portugués (Intermedio), Francés (Básico)"
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border-b">
                    <h2 className="text-2xl font-bold mb-6">Documentos y Carta de Presentación</h2>
                    <div className="space-y-6">
                      <div>
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

                      <div>
                        <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                          Carta de Presentación (Opcional)
                        </label>
                        <textarea
                          id="coverLetter"
                          name="coverLetter"
                          rows={5}
                          value={formData.coverLetter}
                          onChange={handleInputChange}
                          placeholder="Cuéntanos brevemente sobre tus objetivos profesionales y por qué estás interesado en trabajar en el extranjero..."
                          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary focus:border-primary"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  <div className="p-8">
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
                          {errors.termsAccepted && <p className="mt-1 text-sm text-red-600">{errors.termsAccepted}</p>}
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
                            Al enviar tu postulación, nuestro equipo revisará tu perfil y te contactará si hay
                            oportunidades que coincidan con tus habilidades y preferencias. Este proceso puede tomar
                            hasta 5 días hábiles.
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
                        "Enviar Postulación"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-16 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">¿Por Qué Postular con MundoLaboral?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Oportunidades Exclusivas</h3>
                <p className="text-gray-600">
                  Accede a ofertas laborales exclusivas en empresas internacionales que buscan específicamente talento
                  sudamericano.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Asesoría Migratoria</h3>
                <p className="text-gray-600">
                  Te guiamos en todo el proceso de obtención de visas y permisos de trabajo, facilitando tu transición
                  al extranjero.
                </p>
              </div>

              <div className="text-center p-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">Proceso Simplificado</h3>
                <p className="text-gray-600">
                  Optimizamos el proceso de aplicación y selección, ahorrándote tiempo y aumentando tus posibilidades de
                  éxito.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
