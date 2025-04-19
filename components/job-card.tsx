"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, MapPin, Clock, DollarSign } from "lucide-react"
import type { JobOffer } from "@/data/job-offers"

interface JobCardProps {
  job: JobOffer
}

export default function JobCard({ job }: JobCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
      <div className="p-6 flex flex-col md:flex-row md:items-center">
        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
          <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
            <Image src={job.logo || `/placeholder.svg?height=80&width=80`} alt={job.title} width={80} height={80} />
          </div>
        </div>

        <div className="flex-grow">
          <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
          <p className="text-gray-600 mb-3">{job.description}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-500">
            {job.location && (
              <div className="flex items-center">
                <MapPin size={16} className="mr-1" />
                <span>{job.location}</span>
              </div>
            )}

            {job.type && (
              <div className="flex items-center">
                <Clock size={16} className="mr-1" />
                <span>{job.type}</span>
              </div>
            )}

            <div className="flex items-center text-green-600 font-medium">
              <DollarSign size={16} className="mr-1" />
              <span>{job.payout}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center mt-4 md:mt-0">
          <button
            onClick={toggleFavorite}
            className="mr-4 text-gray-400 hover:text-red-500"
            aria-label="Add to favorites"
          >
            <Heart size={24} fill={isFavorite ? "currentColor" : "none"} className={isFavorite ? "text-red-500" : ""} />
          </button>

          <Link
            href={job.link}
            target={job.link.startsWith("http") ? "_blank" : "_self"}
            rel={job.link.startsWith("http") ? "noopener noreferrer" : ""}
            className="btn btn-primary whitespace-nowrap"
          >
            Postular Ahora
          </Link>
        </div>
      </div>

      {job.sponsored && (
        <div className="bg-gray-50 py-2 px-6 text-right text-xs text-gray-500">Sponsored By {job.sponsored}</div>
      )}
    </div>
  )
}
