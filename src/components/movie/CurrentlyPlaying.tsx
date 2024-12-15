import { Backdrop } from '@/components/movie/Backdrop'
import React, { FunctionComponent, useEffect } from 'react'
import { Movie } from '@/types/Movie'
import { useCurrentMovie } from '@/lib/hooks'
import { List } from '@/components/movie/List'
import { Current } from '@/components/movie/Current'

export interface Props {
  movies: Movie[]
  handleLoadNextPage: () => void
}

export const CurrentlyPlaying: FunctionComponent<Props> = ({ movies, handleLoadNextPage }) => {
  const { movie } = useCurrentMovie()

  const { update } = useCurrentMovie()

  useEffect(() => {
    if (movies.length === 0) {
      return
    }

    update(movies[0])
  }, [movies])

  return (
    <div className="relative portrait:overflow-hidden landscape:lg:overflow-hidden overflow-x-hidden h-dvh">
      {movie ? (
        <Backdrop movie={movie} />
      ) : null}

      <div className="absolute top-[1rem] pb-4 flex flex-col h-[calc(100%-1rem)] w-full">
        <Current />

        <List movies={movies} handleLoadNextPage={handleLoadNextPage} />
      </div>
    </div>
  )
}
