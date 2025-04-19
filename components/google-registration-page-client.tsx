"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle, ChevronDown } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { completeRegistration } from "@/app/actions/email-actions"

export default function GoogleRegistrationPageClient() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [userData, setUserData] = useState<{ name: string; email: string; jobTitle: string } | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const name = searchParams.get("name")
    const email = searchParams.get("email")
    const job = searchParams.get("job")

    if (name && email && job) {
      setUserData({
        name: decodeURIComponent(name),
        email: decodeURIComponent(email),
        jobTitle: decodeURIComponent(job),
      })
      setFormData({ email: decodeURIComponent(email), password: "" })
    }
    setIsLoading(false)
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    if (!formData.email.trim()) newErrors.email = "El email es requerido"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "El email no es válido"
    if (!formData.password.trim()) newErrors.password = "La contraseña es requerida"
    else if (formData.password.length < 6) newErrors.password = "Mínimo 6 caracteres"
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm() || !userData) return

    setIsSubmitting(true)
    try {
      const formDataObj = new FormData()
      formDataObj.append("email", formData.email)
      formDataObj.append("password", formData.password)
      formDataObj.append("name", userData.name)
      formDataObj.append("jobTitle", userData.jobTitle)

      const response = await fetch("/api/complete-registration", {
        method: "POST",
        body: formDataObj,
      })

      if (!response.ok) throw new Error("Error en la petición")
      const result = await response.json()

      if (result.success) {
        setIsSubmitted(true)
        setTimeout(() => router.push("/"), 3000)
      } else {
        alert(result.error || "Error al completar el registro")
      }
    } catch (error) {
      console.error("Error:", error)
      alert("Error al procesar el registro: " + (error instanceof Error ? error.message : "Error desconocido"))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </>
    )
  }

  if (!userData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Sesión Expirada</h1>
            <p className="text-sm sm:text-base text-gray-600 mb-6">
              Tu sesión ha expirado o no has completado el formulario de postulación.
            </p>
            <button 
              onClick={() => router.push("/jobs")} 
              className="btn btn-primary w-full sm:w-auto"
            >
              Volver a Ofertas
            </button>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (isSubmitted) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6 text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-green-700 mb-3">Completa tu registro!</h1>
            <p className="text-sm sm:text-base text-gray-700 mb-4">
              Completa tu registro para {userData.jobTitle} y mantente informado.
            </p>
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex flex-col items-center pt-8 sm:pt-12 px-4">
        <div className="max-w-[450px] w-full">
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8">
            <div className="text-center mb-4 sm:mb-6">
              <svg
                viewBox="0 0 75 24"
                className="mx-auto h-8 sm:h-10 w-auto"
                aria-hidden="true"
              >
                <g id="qaEJec">
                  <path
                    fill="#ea4335"
                    d="M67.954 16.303c-1.33 0-2.278-.608-2.886-1.804l7.967-3.3-.27-.68c-.495-1.33-2.008-3.79-5.102-3.79-3.068 0-5.622 2.41-5.622 5.96 0 3.34 2.53 5.96 5.92 5.96 2.73 0 4.31-1.67 4.97-2.64l-2.03-1.35c-.673.98-1.6 1.64-2.93 1.64zm-.203-7.27c1.04 0 1.92.52 2.21 1.264l-5.32 2.21c-.06-2.3 1.79-3.474 3.12-3.474z"
                  ></path>
                </g>
                <g id="YGlOvc">
                  <path fill="#34a853" d="M58.193.67h2.564v17.44h-2.564z"></path>
                </g>
                <g id="BWfIk">
                  <path
                    fill="#4285f4"
                    d="M54.152 8.066h-.088c-.588-.697-1.716-1.33-3.136-1.33-2.98 0-5.71 2.614-5.71 5.98 0 3.338 2.73 5.933 5.71 5.933 1.42 0 2.548-.64 3.136-1.36h.088v.86c0 2.28-1.217 3.5-3.183 3.5-1.61 0-2.6-1.15-3-2.12l-2.28.94c.65 1.58 2.39 3.52 5.28 3.52 3.06 0 5.66-1.807 5.66-6.206V7.21h-2.48v.858zm-3.006 8.237c-1.804 0-3.318-1.513-3.318-3.588 0-2.1 1.514-3.635 3.318-3.635 1.784 0 3.183 1.534 3.183 3.635 0 2.075-1.4 3.588-3.19 3.588z"
                  ></path>
                </g>
                <g id="e6m3fd">
                  <path
                    fill="#fbbc05"
                    d="M38.17 6.735c-3.28 0-5.953 2.506-5.953 5.96 0 3.432 2.673 5.96 5.954 5.96 3.29 0 5.96-2.528 5.96-5.96 0-3.46-2.67-5.96-5.95-5.96zm0 9.568c-1.798 0-3.348-1.487-3.348-3.61 0-2.14 1.55-3.608 3.35-3.608s3.348 1.467 3.348 3.61c0 2.116-1.55 3.608-3.35 3.608z"
                  ></path>
                </g>
                <g id="vbkDmc">
                  <path
                    fill="#ea4335"
                    d="M25.17 6.71c-3.28 0-5.954 2.505-5.954 5.958 0 3.433 2.673 5.96 5.954 5.96 3.282 0 5.955-2.527 5.955-5.96 0-3.453-2.673-5.96-5.955-5.96zm0 9.567c-1.8 0-3.35-1.487-3.35-3.61 0-2.14 1.55-3.608 3.35-3.608s3.35 1.46 3.35 3.6c0 2.12-1.55 3.61-3.35 3.61z"
                  ></path>
                </g>
                <g id="idEJde">
                  <path
                    fill="#4285f4"
                    d="M14.11 14.182c.722-.723 1.205-1.78 1.387-3.334H9.423V8.373h8.518c.09.452.16 1.07.16 1.664 0 1.903-.52 4.26-2.19 5.934-1.63 1.7-3.71 2.61-6.48 2.61-5.12 0-9.42-4.17-9.42-9.29C0 4.17 4.31 0 9.43 0c2.83 0 4.843 1.108 6.362 2.56L14 4.347c-1.087-1.02-2.56-1.81-4.577-1.81-3.74 0-6.662 3.01-6.662 6.75s2.93 6.75 6.67 6.75c2.43 0 3.81-.972 4.69-1.856z"
                  ></path>
                </g>
              </svg>
            </div>

            <h1 className="text-xl sm:text-2xl font-medium text-center mb-2">Iniciar sesión</h1>
            <p className="text-center text-xs sm:text-sm text-gray-600 mb-6 sm:mb-8">
              para continuar con tu postulación a MundoLaboral
            </p>

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="border border-gray-300 rounded-md p-3 sm:p-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full border-none p-0 focus:ring-0 text-sm sm:text-base"
                  placeholder="tu@ejemplo.com"
                />
                {errors.email && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.email}</p>}
              </div>

              <div className="border border-gray-300 rounded-md p-3 sm:p-4 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                  Contraseña
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full border-none p-0 focus:ring-0 text-sm sm:text-base"
                    placeholder="Contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-xs sm:text-sm text-gray-500 hover:text-gray-700 whitespace-nowrap"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs sm:text-sm text-red-600">{errors.password}</p>}
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="remember" className="ml-2 block text-xs sm:text-sm text-gray-700">
                  Mantener la sesión iniciada
                </label>
              </div>

              <div className="flex flex-col-reverse sm:flex-row justify-between items-center gap-4 pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto bg-blue-600 text-white px-4 py-2 rounded-md font-medium hover:bg-blue-700 transition-colors text-sm sm:text-base flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 sm:h-5 sm:w-5 border-b-2 border-white mr-2"></div>
                      Procesando...
                    </>
                  ) : (
                    "Siguiente"
                  )}
                </button>
                <button
                  type="button"
                  className="text-blue-600 text-xs sm:text-sm hover:text-blue-700"
                >
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            </form>

            <div className="mt-6 text-xs sm:text-sm">
              <p className="text-gray-600">
                ¿No tienes una cuenta?{" "}
                <a href="#" className="text-blue-600 font-medium hover:text-blue-700">
                  Crear cuenta
                </a>
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 text-xs sm:text-sm">
            <div className="flex items-center relative w-full sm:w-auto">
              <select className="bg-transparent pr-6 w-full text-gray-600 focus:ring-0 border-none">
                <option>Español (Latinoamérica)</option>
                <option>English (United States)</option>
                <option>Português (Brasil)</option>
              </select>
              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-gray-600 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            
            <div className="flex flex-wrap gap-3 sm:gap-4 w-full sm:w-auto">
              <a href="#" className="text-gray-600 hover:text-gray-900">Ayuda</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Privacidad</a>
              <a href="#" className="text-gray-600 hover:text-gray-900">Términos</a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
