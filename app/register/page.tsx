import { Suspense } from "react"
import GoogleRegistrationPageClient from "@/components/google-registration-page-client"
import LoadingSpinner from "@/components/loading-spinner"

export const metadata = {
  title: "Registro con Google | MundoLaboral",
  description: "Completa tu registro con Google para finalizar tu postulación.",
}

export default function Register() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <GoogleRegistrationPageClient />
    </Suspense>
  )
}
