"use client"

import type React from "react"

import { useState } from "react"
import { visaRequirements } from "@/data/visa-requirements"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ExternalLink, Clock, DollarSign, FileText, Globe } from "lucide-react"
import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function VisaRequirementsPage() {
  const [selectedCountry, setSelectedCountry] = useState(visaRequirements[0].id)

  const selectedVisaInfo = visaRequirements.find((visa) => visa.id === selectedCountry)

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">
        <div className="container py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-4xl font-bold mb-4">Requisitos de Visa para Trabajar en el Extranjero</h1>
              <p className="text-lg text-gray-600">
                Información detallada sobre los requisitos y procesos para obtener visas de trabajo en diferentes
                países.
              </p>
            </div>

            <Tabs defaultValue={visaRequirements[0].id} onValueChange={setSelectedCountry} className="mb-8">
              <TabsList className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {visaRequirements.map((visa) => (
                  <TabsTrigger key={visa.id} value={visa.id} className="text-base">
                    <span className="mr-2">{visa.flag}</span> {visa.country}
                  </TabsTrigger>
                ))}
              </TabsList>

              {visaRequirements.map((visa) => (
                <TabsContent key={visa.id} value={visa.id}>
                  <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-3">{visa.flag}</span>
                      <h2 className="text-3xl font-bold">{visa.country}</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <InfoCard
                        icon={<Clock className="h-5 w-5 text-blue-500" />}
                        title="Tiempo de Procesamiento"
                        value={visa.processingTime}
                      />
                      <InfoCard
                        icon={<DollarSign className="h-5 w-5 text-green-500" />}
                        title="Costo Promedio"
                        value={visa.averageCost}
                      />
                      <InfoCard
                        icon={<Globe className="h-5 w-5 text-purple-500" />}
                        title="Sitio Web Oficial"
                        value={
                          <Link
                            href={visa.officialWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary flex items-center hover:underline"
                          >
                            Visitar <ExternalLink className="h-4 w-4 ml-1" />
                          </Link>
                        }
                      />
                    </div>

                    <div className="mb-6">
                      <h3 className="text-xl font-semibold mb-3">Requisitos Generales</h3>
                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {visa.generalRequirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold mb-3">Tipos de Visa de Trabajo</h3>
                      <Accordion type="single" collapsible className="w-full">
                        {visa.workVisaTypes.map((visaType, index) => (
                          <AccordionItem key={index} value={`item-${index}`}>
                            <AccordionTrigger className="text-lg font-medium">{visaType.name}</AccordionTrigger>
                            <AccordionContent>
                              <div className="pl-4 space-y-4">
                                <p className="text-gray-700">{visaType.description}</p>

                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Duración:</h4>
                                  <p className="text-gray-700">{visaType.duration}</p>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Requisitos Específicos:</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {visaType.requirements.map((req, idx) => (
                                      <li key={idx} className="text-gray-700">
                                        {req}
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                <div>
                                  <h4 className="font-semibold text-gray-800 mb-2">Elegibilidad:</h4>
                                  <ul className="list-disc pl-5 space-y-1">
                                    {visaType.eligibility.map((eli, idx) => (
                                      <li key={idx} className="text-gray-700">
                                        {eli}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </div>

                    {visa.additionalInfo && (
                      <div className="mt-6 bg-blue-50 border border-blue-100 rounded-md p-4">
                        <div className="flex items-start">
                          <FileText className="h-5 w-5 text-blue-500 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-blue-800">{visa.additionalInfo}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold mb-4">Consejos para el Proceso de Visa</h2>
              <div className="space-y-4">
                <div className="p-4 border-l-4 border-primary bg-green-50">
                  <h3 className="font-semibold text-lg mb-1">Inicia el proceso con anticipación</h3>
                  <p>
                    Los trámites de visa pueden tomar varios meses. Recomendamos iniciar el proceso al menos 3-6 meses
                    antes de la fecha prevista de viaje.
                  </p>
                </div>

                <div className="p-4 border-l-4 border-yellow-500 bg-yellow-50">
                  <h3 className="font-semibold text-lg mb-1">Documentación completa y organizada</h3>
                  <p>
                    Asegúrate de tener todos los documentos requeridos y organizados según las instrucciones del
                    consulado. Documentos incompletos pueden resultar en retrasos o rechazos.
                  </p>
                </div>

                <div className="p-4 border-l-4 border-blue-500 bg-blue-50">
                  <h3 className="font-semibold text-lg mb-1">Certificaciones y traducciones</h3>
                  <p>
                    Muchos países requieren que los documentos estén apostillados y/o traducidos por traductores
                    oficiales. Verifica estos requisitos con anticipación.
                  </p>
                </div>

                <div className="p-4 border-l-4 border-purple-500 bg-purple-50">
                  <h3 className="font-semibold text-lg mb-1">Asesoría profesional</h3>
                  <p>
                    Considera contratar un abogado especializado en inmigración o utilizar los servicios de asesoría de
                    MundoLaboral para aumentar tus probabilidades de éxito.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-600 mb-4">
                ¿Necesitas ayuda con tu proceso de visa? Nuestros expertos pueden guiarte en cada paso del camino.
              </p>
              <Link href="/contact" className="btn btn-primary inline-block">
                Contactar a un Asesor
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

interface InfoCardProps {
  icon: React.ReactNode
  title: string
  value: React.ReactNode
}

function InfoCard({ icon, title, value }: InfoCardProps) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex items-center">
          {icon}
          <CardTitle className="text-sm font-medium ml-2">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-lg font-semibold">{value}</div>
      </CardContent>
    </Card>
  )
}
