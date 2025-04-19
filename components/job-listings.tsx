"use client"

import { useState } from "react"
import { Heart, MapPin, Clock, DollarSign } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { jobOffers } from "@/data/job-offers"

export default function JobListings() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter((favId) => favId !== id))
    } else {
      setFavorites([...favorites, id])
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="flex items-center justify-center mb-12">
          <div className="bg-green-100 p-2 rounded-md">
            <span className="text-green-600 text-2xl">✓</span>
          </div>
          <h2 className="text-3xl font-bold ml-4">
            Postula a Trabajos en el Extranjero <span className="text-yellow-500">👆</span>
          </h2>
        </div>

        <div className="space-y-6">
          {jobOffers.map((job) => (
            <div key={job.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
              <div className="p-6 flex flex-col md:flex-row md:items-center">
                <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                  <div className="w-20 h-20 bg-gray-100 rounded-md flex items-center justify-center overflow-hidden">
                    <Image
                      src={job.logo || `/placeholder.svg?height=80&width=80`}
                      alt={job.title}
                      width={80}
                      height={80}
                    />
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
                    onClick={() => toggleFavorite(job.id)}
                    className="mr-4 text-gray-400 hover:text-red-500"
                    aria-label="Add to favorites"
                  >
                    <Heart
                      size={24}
                      fill={favorites.includes(job.id) ? "currentColor" : "none"}
                      className={favorites.includes(job.id) ? "text-red-500" : ""}
                    />
                  </button>

                  <Link
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary whitespace-nowrap"
                  >
                    Postular Ahora
                  </Link>
                </div>
              </div>

              {job.sponsored && (
                <div className="bg-gray-50 py-2 px-6 text-right text-xs text-gray-500">
                  Sponsored By {job.sponsored}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
