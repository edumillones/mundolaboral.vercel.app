"use client"

import { useState, useEffect } from "react"
import { jobOffers } from "@/data/job-offers"
import { Search, Filter, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import JobCard from "@/components/job-card"

// Extraer países únicos de las ofertas de trabajo
const countries = Array.from(new Set(jobOffers.map((job) => job.location?.split(",").pop()?.trim()).filter(Boolean)))

// Extraer tipos de trabajo únicos
const jobTypes = Array.from(new Set(jobOffers.map((job) => job.type).filter(Boolean)))

export default function JobsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedJobType, setSelectedJobType] = useState<string | null>(null)
  const [filteredJobs, setFilteredJobs] = useState(jobOffers)
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    let result = jobOffers

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Filtrar por país
    if (selectedCountry) {
      result = result.filter((job) => job.location?.includes(selectedCountry))
    }

    // Filtrar por tipo de trabajo
    if (selectedJobType) {
      result = result.filter((job) => job.type === selectedJobType)
    }

    setFilteredJobs(result)
  }, [searchTerm, selectedCountry, selectedJobType])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCountry(null)
    setSelectedJobType(null)
  }

  const hasActiveFilters = searchTerm || selectedCountry || selectedJobType

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary py-12">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl font-bold mb-4">Encuentra Tu Próximo Trabajo en el Extranjero</h1>
              <p className="text-lg mb-8">
                Explora oportunidades laborales diseñadas para profesionales sudamericanos en todo el mundo
              </p>

              <div className="relative">
                <div className="flex items-center bg-white rounded-lg overflow-hidden shadow-lg">
                  <div className="pl-4 text-gray-400">
                    <Search size={20} />
                  </div>
                  <input
                    type="text"
                    placeholder="Buscar por título o palabra clave..."
                    className="w-full py-4 px-3 text-gray-700 focus:outline-none"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <button
                    className="bg-primary text-white px-6 py-4 font-medium hover:bg-primary-dark transition-colors"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter size={20} />
                    <span className="ml-2 hidden md:inline">Filtros</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filters Section */}
        {showFilters && (
          <section className="bg-white shadow-md py-6 border-b">
            <div className="container">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                  <select
                    className="w-full md:w-64 p-2 border rounded-md"
                    value={selectedCountry || ""}
                    onChange={(e) => setSelectedCountry(e.target.value || null)}
                  >
                    <option value="">Todos los países</option>
                    {countries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="w-full md:w-auto">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Trabajo</label>
                  <select
                    className="w-full md:w-64 p-2 border rounded-md"
                    value={selectedJobType || ""}
                    onChange={(e) => setSelectedJobType(e.target.value || null)}
                  >
                    <option value="">Todos los tipos</option>
                    {jobTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="flex items-center text-red-600 hover:text-red-800 transition-colors mt-4 md:mt-0"
                  >
                    <X size={16} className="mr-1" />
                    Limpiar filtros
                  </button>
                )}
              </div>
            </div>
          </section>
        )}

        {/* Job Listings */}
        <section className="py-12">
          <div className="container">
            <div className="mb-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold">
                {filteredJobs.length} {filteredJobs.length === 1 ? "Trabajo" : "Trabajos"} Encontrados
              </h2>
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="flex items-center text-primary hover:text-primary-dark transition-colors"
                >
                  <X size={16} className="mr-1" />
                  Limpiar filtros
                </button>
              )}
            </div>

            {filteredJobs.length > 0 ? (
              <div className="space-y-6">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold mb-2">No se encontraron trabajos</h3>
                <p className="text-gray-600 mb-6">
                  No hay resultados que coincidan con tus criterios de búsqueda. Intenta con otros filtros.
                </p>
                <button onClick={clearFilters} className="btn btn-primary">
                  Ver todos los trabajos
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Featured Countries */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Destinos Populares</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  country: "España",
                  flag: "🇪🇸",
                  image: "https://images.unsplash.com/photo-1543783207-ec64e4d95325?q=80&w=400&auto=format&fit=crop",
                  jobs: jobOffers.filter((job) => job.location?.includes("España")).length,
                },
                {
                  country: "Canadá",
                  flag: "🇨🇦",
                  image: "https://images.unsplash.com/photo-1569681157442-5eabf7fe850e?q=80&w=400&auto=format&fit=crop",
                  jobs: jobOffers.filter((job) => job.location?.includes("Canadá")).length,
                },
                {
                  country: "Australia",
                  flag: "🇦🇺",
                  image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?q=80&w=400&auto=format&fit=crop",
                  jobs: jobOffers.filter((job) => job.location?.includes("Australia")).length,
                },
                {
                  country: "Estados Unidos",
                  flag: "🇺🇸",
                  image: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?q=80&w=400&auto=format&fit=crop",
                  jobs: jobOffers.filter((job) => job.location?.includes("EE.UU.")).length,
                },
                {
                  country: "Alemania",
                  flag: "🇩🇪",
                  image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=400&auto=format&fit=crop",
                  jobs: jobOffers.filter((job) => job.location?.includes("Alemania")).length,
                },
                {
                  country: "Nueva Zelanda",
                  flag: "🇳🇿",
                  image: "https://images.unsplash.com/photo-1507699622108-4be3abd695ad?q=80&w=400&auto=format&fit=crop",
                  jobs: jobOffers.filter((job) => job.location?.includes("Nueva Zelanda")).length,
                },
              ].map((destination, index) => (
                <div key={index} className="rounded-lg overflow-hidden shadow-md group relative">
                  <div className="h-48 relative">
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all z-10"></div>
                    <div className="absolute inset-0">
                      <img
                        src={destination.image || "/placeholder.svg"}
                        alt={destination.country}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white p-4">
                      <span className="text-4xl mb-2">{destination.flag}</span>
                      <h3 className="text-2xl font-bold mb-1">{destination.country}</h3>
                      <p>
                        {destination.jobs} {destination.jobs === 1 ? "trabajo" : "trabajos"} disponibles
                      </p>
                      <button
                        onClick={() => {
                          setSelectedCountry(destination.country)
                          setShowFilters(true)
                          window.scrollTo({ top: 0, behavior: "smooth" })
                        }}
                        className="mt-4 px-4 py-2 bg-white text-primary rounded-md font-medium hover:bg-gray-100 transition-colors"
                      >
                        Ver Trabajos
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">¿No encuentras lo que buscas?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Nuestros asesores pueden ayudarte a encontrar oportunidades laborales que se ajusten a tu perfil y
              objetivos profesionales.
            </p>
            <button onClick={() => (window.location.href = "/contact")} className="btn btn-primary px-8 py-3 text-lg">
              Contactar a un Asesor
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
