import Navbar from "@/components/navbar"
import Hero from "@/components/hero"
import JobListings from "@/components/job-listings"
import Testimonials from "@/components/testimonials"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <JobListings />
      <Testimonials />
      <Footer />
    </main>
  )
}
