import { useRouter } from '@/components/common/useRouter'
import { SelectSeats } from '@/components/reservation/SelectSeats'
import { Showing } from '@/types/Showing'
import { Backdrop } from '@/components/movie/Backdrop'
import { Summary } from '@/components/movie/Summary'
import Link from '@/components/common/Link'
import { Button } from '@/components/ui/button'
import React, { FunctionComponent, useEffect } from 'react'
import { Form } from '@/components/reservation/Form'
import { useReservation } from '@/lib/hooks/useReservation'
import { Show } from '@/components/reservation/Show'
import { useRoutes } from '@/lib/hooks/useRoutes'
import { Movie } from '@/types/Movie'
import QueryClientProvider from "@/components/common/QueryClientProvider";
import {QueryClient} from "@tanstack/react-query";

export interface Props {
  showing: Showing
  movie: Movie
  queryClient: QueryClient
}

export const Create: FunctionComponent<Props> = ({ showing, movie, queryClient }) => {
  const { query: { id } } = useRouter()
  const routes = useRoutes()

  const { step, reservation, reset } = useReservation()

  useEffect(() => {
    reset()
  }, [])

  function renderStep () {
    switch (step) {
      case 0:
        return <SelectSeats showing={showing} />
      case 1:
        return (
          <QueryClientProvider queryClient={queryClient}>
            <Form showingId={String(showing.id)} />
          </QueryClientProvider>
        )
      case 2:
        return reservation ? <Show reservation={reservation} /> : <></>
      default:
        throw new Error('Invalid reservation step ' + step)
    }
  }

  return (
    <div className="relative overflow-y-auto overflow-x-hidden">
      <Backdrop movie={movie} />

      <div className="absolute top-[10%] sm:top-[20%] px-4 xl:px-8 pb-4 w-full">
        <Summary movie={movie} />

        <Link href={routes?.getMovieShowingsPath(id as string) ?? ''} className="block md:inline text-center mb-4">
          <Button size="lg" variant="default" className="text-lg font-bold whitespace-normal h-auto py-2">
            <svg
              xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
              stroke="currentColor" className="size-6"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
            </svg>

            Return to upcoming showings
          </Button>
        </Link>

        {renderStep()}
      </div>
    </div>
  )
}
