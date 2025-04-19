import Link from "next/link"

export default function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      <div
        className="h-[600px] bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop')",
        }}
      >
        <div className="container relative z-20 h-full flex flex-col justify-center">
          <div className="max-w-2xl text-white">
            <div className="w-16 h-2 bg-primary mb-6"></div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Tu Futuro Laboral Está en el Extranjero</h1>
            <p className="text-lg mb-8">
              Encuentra oportunidades laborales en el extranjero diseñadas para profesionales sudamericanos. Mejora tu
              calidad de vida, aumenta tus ingresos y vive una experiencia internacional única. ¡Tu próximo gran paso
              profesional comienza aquí!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/search" className="btn btn-primary">
                Buscar Trabajo
              </Link>
              <Link href="/apply" className="btn btn-secondary">
                Postular Ahora
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
