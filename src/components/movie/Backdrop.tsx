import React, { FunctionComponent } from 'react'

import { Movie } from '@/types/Movie'

export interface Props {
  movie: Movie
}

export const Backdrop: FunctionComponent<Props> = ({ movie }) => {
  return (
    <div className="blur-[5px] sm:filter-none">
      <div className="absolute bg-gradient-to-b from-gray-950/20 via-gray-950/80 to-gray-950 h-screen w-full top-0 left-0" />

      <img
        src={`${movie.backdrop_url}?w=1280&fm=webp&q=80`}
        srcSet={`${movie.backdrop_url}?w=1280&fm=webp&q=80 1280w, ${movie.backdrop_url}?w=1600&fm=webp&q=80 1600w, ${movie.backdrop_url}?w=1920&fm=webp&q=80 1920w`}
        alt={`${movie.title} poster`}
        className="object-cover h-screen w-full"
      />
    </div>
  )
}
