import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-2xl font-bold text-primary mb-4">MundoLaboral</h3>
            <p className="text-gray-400 mb-4">
              Conectamos a profesionales sudamericanos con las mejores oportunidades laborales en el extranjero. Tu
              puente hacia un futuro global.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-400 hover:text-primary">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-primary">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Job Categories</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/jobs/remote" className="text-gray-400 hover:text-primary">
                  Remote Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/full-time" className="text-gray-400 hover:text-primary">
                  Full-Time Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/part-time" className="text-gray-400 hover:text-primary">
                  Part-Time Jobs
                </Link>
              </li>
              <li>
                <Link href="/jobs/freelance" className="text-gray-400 hover:text-primary">
                  Freelance Jobs
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Información de Contacto</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@mundolaboral.pe</li>
              <li>Teléfono: +51 (1) 234-5678</li>
              <li>Dirección: Av. Javier Prado 2456, San Isidro, Lima, Perú</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} MundoLaboral. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
