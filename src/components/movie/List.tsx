import React, {UIEvent, FunctionComponent, useState, useCallback} from 'react'
import { Movie } from '@/types/Movie'
import { Card } from '@/components/movie/Card'
import { useCurrentMovie } from '@/lib/hooks/useCurrentMovie'
import throttle from 'lodash/throttle'

export interface Props {
  movies: Movie[]
  handleLoadNextPage: () => void
}

export const List: FunctionComponent<Props> = ({ movies, handleLoadNextPage }) => {
  const { update } = useCurrentMovie()

  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  const throttledLoadNextPage = useCallback(
    throttle(() => handleLoadNextPage(), 1000),
    [handleLoadNextPage]
  )

  const updateCurrentMovie = (cardHeight: number, eventTarget: HTMLDivElement) => {
    const { scrollTop, offsetHeight, children } = eventTarget

    if(scrollTop > 10 && !isScrolled) {
      setIsScrolled(true)
    }

    if(scrollTop == 0 && isScrolled) {
      setIsScrolled(false)
    }

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

    throttledLoadNextPage()
  }

  return (
    <div className="w-full transform translate-y-4">
      <div className="relative">
        <div className="flex justify-between items-center">
          <h2 className={`px-4 xl:px-8 text-xl xs:text-3xl transition-all duration-150 ${isScrolled ? 'py-2 -mt-4 lg:py-8 lg:-mt-16' : ''}`}>Currently playing</h2>
        </div>

        <div
          onScroll={handleScroll}
          data-testid="movie-list"
          className="px-4 xl:px-8 py-5 sm:py-10 snap-y snap-mandatory overflow-scroll h-[80vw] sm:h-[55vw] md:h-[40vw] xl:h-[27vw] w-full scroll-smooth scrollbar-hidden"
        >
          <div className="grid grid-cols-2 landscape:max-sm:grid-cols-4 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 place-items-center">
            {movies.map((movie) => (
              <Card key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
