import React, { UIEvent, FunctionComponent } from 'react'
import { Movie } from '@/types/Movie'
import { Card } from '@/components/movie/Card'
import { useCurrentMovie } from '@/lib/hooks/useCurrentMovie'

interface Props {
  movies: Movie[]
  handleLoadNextPage: () => void
}

export const List: FunctionComponent<Props> = ({ movies, handleLoadNextPage }) => {
  const { update } = useCurrentMovie()

  const updateCurrentMovie = (cardHeight: number, eventTarget: HTMLDivElement) => {
    const { scrollTop, offsetHeight, children } = eventTarget

    const movieCardWidth = children[0]?.children?.[0]?.clientWidth + 8 // width and gap

    const columns = Math.round(window.innerWidth / movieCardWidth)

    let index = (Math.round((offsetHeight + scrollTop) / cardHeight) - 1) * columns

    if (index <= 0) {
      index = 0
    }

    if (index > movies.length) {
      index -= columns
    }

    if (index > movies.length) {
      index = movies.length - 1
    }

    if (!movies[index]) {
      return
    }

    update(movies[index])
  }

  const handleScroll = (event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, offsetHeight, scrollHeight, children } = event.target as HTMLDivElement

    const movieCardHeight = children[0]?.children?.[0]?.clientHeight + 8 // height and gap

    updateCurrentMovie(movieCardHeight, event.target as HTMLDivElement)

    if (offsetHeight + scrollTop < scrollHeight - movieCardHeight / 2) {
      return
    }

    handleLoadNextPage()
  }

  return (
    <div className="absolute bottom-0 w-full">
      <div className="relative">
        <div className="flex justify-between items-center">
          <h1 className="p-4 xl:px-8 text-3xl z-20 transform">Currently playing</h1>
        </div>

        <div
          onScroll={handleScroll}
          data-testid="movie-list"
          className="px-4 xl:px-8 snap-y snap-mandatory overflow-scroll h-[calc(80vw)] sm:h-[calc(55vw)] md:h-[calc(40vw)] xl:h-[calc(27vw)] w-full scroll-smooth scrollbar-hidden py-10"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 place-items-center">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
