import { useCurrentMovie } from '@/lib/hooks/useCurrentMovie'
import React, { FunctionComponent } from 'react'
import { Button } from '@/components/ui/button'
import Link from '@/components/common/Link'
import { Summary } from '@/components/movie/Summary'
import { useRoutes } from '@/lib/hooks/useRoutes'

export const Current: FunctionComponent = () => {
  const { movie } = useCurrentMovie()
  const routes = useRoutes()

  // return skeleton if no current movie
  if (movie == null) {
    return (
      <div className="flex-grow px-4 xl:px-8 flex flex-col justify-center items-start">
        <div className="h-9 xs:h-[3.75rem] sm:h-24 mb-2 w-3/4 bg-gray-500 rounded-lg animate-pulse"/>

        <div className="h-[75px] w-1/2 mb-2 bg-gray-500 rounded-lg animate-pulse"/>

        <div className="h-5 w-[100px] mb-4 bg-gray-500 rounded-lg animate-pulse"/>

        <Button variant="secondary" className="xs:px-8 xs:py-5 xs:text-lg font-bold">Get Tickets</Button>
      </div>
    )
  }

  return (
    <div className="flex-grow px-4 xl:px-8 flex flex-col justify-center items-start">
      <Summary movie={movie}/>

      <Link href={routes?.getMovieShowingsPath(movie.id!) ?? ''} className="block md:inline text-center">
        <Button variant="secondary" className="xs:px-8 xs:py-5 xs:text-lg font-bold">Get Tickets</Button>
      </Link>
    </div>
  )
}
