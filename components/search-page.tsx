"use client"

import { useState, useEffect } from "react"
import { jobOffers } from "@/data/job-offers"
import { SearchIcon, Filter, MapPin, Briefcase, DollarSign, X } from "lucide-react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import JobCard from "@/components/job-card"

// Extraer países únicos
const countries = Array.from(new Set(jobOffers.map((job) => job.location?.split(",").pop()?.trim()).filter(Boolean)))

// Extraer industrias únicas (simuladas para este ejemplo)
const industries = [
  "Tecnología",
  "Salud",
  "Educación",
  "Hostelería",
  "Ingeniería",
  "Finanzas",
  "Marketing",
  "Construcción",
]

export default function SearchPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null)
  const [filteredJobs, setFilteredJobs] = useState(jobOffers)
  const [isAdvancedSearch, setIsAdvancedSearch] = useState(false)

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

    // Filtrar por industria (simulado)
    if (selectedIndustry) {
      // En un caso real, cada trabajo tendría una propiedad de industria
      // Aquí simplemente filtramos basados en palabras clave en el título
      result = result.filter((job) => job.title.includes(selectedIndustry))
    }

    setFilteredJobs(result)
  }, [searchTerm, selectedCountry, selectedIndustry])

  const clearFilters = () => {
    setSearchTerm("")
    setSelectedCountry(null)
    setSelectedIndustry(null)
  }

  const hasActiveFilters = searchTerm || selectedCountry || selectedIndustry

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        {/* Hero Search Section */}
        <section className="relative">
          <div className="absolute inset-0 bg-black/60 z-10"></div>
          <div
            className="h-[500px] bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200&auto=format&fit=crop')",
            }}
          >
            <div className="container relative z-20 h-full flex flex-col justify-center">
              <div className="max-w-3xl mx-auto text-center text-white mb-8">
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Encuentra Tu Trabajo Ideal en el Extranjero</h1>
                <p className="text-lg">
                  Miles de oportunidades laborales esperan por profesionales sudamericanos como tú
                </p>
              </div>

              <div className="max-w-3xl mx-auto w-full">
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex-grow p-2">
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <SearchIcon className="h-5 w-5 text-gray-400" />
                        </div>
                        <input
                          type="text"
                          placeholder="Buscar por título, habilidad o palabra clave..."
                          className="block w-full pl-10 pr-3 py-3 border-0 focus:ring-0 focus:outline-none"
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                        />
                      </div>
                    </div>
                    <button
                      className="bg-primary text-white px-6 py-4 font-medium hover:bg-primary-dark transition-colors md:rounded-none rounded-b-lg"
                      onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
                    >
                      <Filter size={20} className="inline-block mr-2" />
                      Filtros
                    </button>
                  </div>

                  {isAdvancedSearch && (
                    <div className="bg-gray-50 p-4 border-t">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">País</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <MapPin className="h-4 w-4 text-gray-400" />
                            </div>
                            <select
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
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
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Industria</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <Briefcase className="h-4 w-4 text-gray-400" />
                            </div>
                            <select
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary"
                              value={selectedIndustry || ""}
                              onChange={(e) => setSelectedIndustry(e.target.value || null)}
                            >
                              <option value="">Todas las industrias</option>
                              {industries.map((industry) => (
                                <option key={industry} value={industry}>
                                  {industry}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Rango Salarial</label>
                          <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                              <DollarSign className="h-4 w-4 text-gray-400" />
                            </div>
                            <select className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-primary focus:border-primary">
                              <option>Cualquier rango</option>
                              <option>$0 - $1,000</option>
                              <option>$1,000 - $3,000</option>
                              <option>$3,000 - $5,000</option>
                              <option>$5,000+</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between">
                        <button onClick={clearFilters} className="text-gray-600 hover:text-gray-800 flex items-center">
                          <X size={16} className="mr-1" />
                          Limpiar filtros
                        </button>
                        <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors">
                          Aplicar Filtros
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Results Section */}
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
                  <SearchIcon className="h-8 w-8 text-gray-400" />
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

        {/* Job Categories */}
        <section className="py-12 bg-white">
          <div className="container">
            <h2 className="text-3xl font-bold text-center mb-12">Categorías Populares</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { name: "Tecnología", icon: "💻", count: 24 },
                { name: "Salud", icon: "🏥", count: 18 },
                { name: "Educación", icon: "🎓", count: 15 },
                { name: "Hostelería", icon: "🏨", count: 12 },
                { name: "Ingeniería", icon: "🔧", count: 20 },
                { name: "Finanzas", icon: "💰", count: 10 },
                { name: "Marketing", icon: "📊", count: 14 },
                { name: "Construcción", icon: "🏗️", count: 8 },
              ].map((category, index) => (
                <div
                  key={index}
                  className="bg-gray-50 rounded-lg p-6 text-center hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => {
                    setSelectedIndustry(category.name)
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }}
                >
                  <span className="text-4xl mb-3 block">{category.icon}</span>
                  <h3 className="text-lg font-semibold mb-1">{category.name}</h3>
                  <p className="text-gray-600">
                    {category.count} {category.count === 1 ? "trabajo" : "trabajos"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-primary/10">
          <div className="container text-center">
            <h2 className="text-3xl font-bold mb-6">¿Listo para dar el siguiente paso?</h2>
            <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
              Postula ahora y nuestro equipo te ayudará a encontrar la oportunidad perfecta en el extranjero.
            </p>
            <button onClick={() => (window.location.href = "/apply")} className="btn btn-primary px-8 py-3 text-lg">
              Postular Ahora
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
