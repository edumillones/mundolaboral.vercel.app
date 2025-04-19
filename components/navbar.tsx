"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container flex justify-between items-center py-4">
        <Link href="/" className="text-3xl font-bold text-primary">
          MundoLaboral
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          <Link href="/" className="font-medium text-text hover:text-primary">
            HOME
          </Link>
          <Link href="/about" className="font-medium text-text hover:text-primary">
            ABOUT
          </Link>
          <div className="relative group">
            <Link href="/jobs" className="font-medium text-text hover:text-primary flex items-center">
              JOBS <span className="ml-1">▼</span>
            </Link>
          </div>
          <Link href="/visas" className="font-medium text-text hover:text-primary">
            VISAS
          </Link>
          <div className="relative group">
            <Link href="/pages" className="font-medium text-text hover:text-primary flex items-center">
              PAGES <span className="ml-1">▼</span>
            </Link>
          </div>
          <Link href="/contact" className="font-medium text-text hover:text-primary">
            CONTACT
          </Link>
        </div>

        <Link href="/apply" className="hidden md:block btn btn-primary">
          Postula Aquí <span className="ml-1">→</span>
        </Link>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-text" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-md">
          <div className="flex flex-col space-y-4">
            <Link href="/" className="font-medium text-text hover:text-primary" onClick={() => setIsMenuOpen(false)}>
              HOME
            </Link>
            <Link
              href="/about"
              className="font-medium text-text hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/jobs"
              className="font-medium text-text hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              JOBS
            </Link>
            <Link
              href="/visas"
              className="font-medium text-text hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              VISAS
            </Link>
            <Link
              href="/pages"
              className="font-medium text-text hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              PAGES
            </Link>
            <Link
              href="/contact"
              className="font-medium text-text hover:text-primary"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
            <Link href="/apply" className="btn btn-primary text-center" onClick={() => setIsMenuOpen(false)}>
              Postula Aquí <span className="ml-1">→</span>
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}
