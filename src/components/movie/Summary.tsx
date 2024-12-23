import React, { FunctionComponent, useEffect, useState } from 'react'
import { Movie } from '@/types/Movie'

export interface Props {
  movie: Movie
}

export const Summary: FunctionComponent<Props> = ({ movie }) => {
  const [showFullDescription, setShowFullDescription] = useState(false)

  const descriptionLimit = 200

  useEffect(() => {
    setShowFullDescription((movie.description?.length ?? 0) < descriptionLimit)
  }, [movie])

  return (
    <>
      <h1 className="text-3xl xs:text-6xl sm:text-8xl mb-2">
        {movie.title}
      </h1>

      <p className="md:w-1/2 mb-2 text-sm md:text-base" data-testid="movie-description">
        {showFullDescription ? (
          movie.description
        ) : (
          <>
            {movie.description?.substring(0, descriptionLimit)}
            <button className="font-bold" onClick={() => setShowFullDescription(true)} data-testid="movie-description-expand">...</button>
          </>
        )}
      </p>

      <p className="flex items-center gap-1 font-medium mb-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-5"
        >
          <defs>
            <linearGradient id="gradient-fill" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset={`${Number(movie.rating) * 10}%`} stopColor="currentColor" />
              <stop offset={`${100 - Number(movie.rating) * 10}%`} stopColor="transparent" />
            </linearGradient>
          </defs>

          <path
            fill="url(#gradient-fill)"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
          />
        </svg>

        <span>
          {movie.rating}
          {' '}
          / 10
        </span>
      </p>
    </>
  )
}
