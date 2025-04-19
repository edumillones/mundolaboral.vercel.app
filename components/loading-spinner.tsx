import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function LoadingSpinner() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </main>
      <Footer />
    </>
  )
}
