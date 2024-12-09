import { useCurrentMovie } from '@/lib/hooks/useCurrentMovie'
import React, { FunctionComponent } from 'react'
import { Button } from '@/components/ui/button'
import Link from '@/components/common/Link'
import { Summary } from '@/components/movie/Summary'
import { useRoutes } from '@/lib/hooks/useRoutes'

export const Current: FunctionComponent = () => {
  const { movie } = useCurrentMovie()
  const routes = useRoutes()

  if (movie == null) {
    return null
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
