import Link from "next/link"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function JobNotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 py-16">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">Oferta de Trabajo No Encontrada</h1>
            <p className="text-lg text-gray-600 mb-8">
              Lo sentimos, la oferta de trabajo que estás buscando no existe o ha sido removida.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/jobs" className="btn btn-primary">
                Ver Todas las Ofertas
              </Link>
              <Link href="/" className="btn bg-gray-200 text-gray-800 hover:bg-gray-300">
                Volver al Inicio
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
