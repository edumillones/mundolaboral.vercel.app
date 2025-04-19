import { jobOffers } from "@/data/job-offers"
import JobDetailPage from "@/components/job-detail-page"
import { notFound } from "next/navigation"

// Definimos correctamente los tipos para los parámetros de la página
type JobDetailPageProps = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: JobDetailPageProps) {
  const jobId = Number.parseInt(params.id)
  const job = jobOffers.find((job) => job.id === jobId)

  if (!job) {
    return {
      title: "Trabajo no encontrado | MundoLaboral",
      description: "La oferta de trabajo que buscas no existe o ha sido removida.",
    }
  }

  return {
    title: `${job.title} | MundoLaboral`,
    description: job.description,
  }
}

export default function JobDetail({ params }: JobDetailPageProps) {
  const jobId = Number.parseInt(params.id)
  const job = jobOffers.find((job) => job.id === jobId)

  if (!job || !job.detailPage) {
    notFound()
  }

  return <JobDetailPage job={job} />
}
