import React, { FunctionComponent } from 'react'

import { Showing } from '@/types/Showing'
import Link from '@/components/common/Link'
import { Button } from '@/components/ui/button'
import { useCinema } from '@/lib/hooks/useCinema'

export interface Props {
  showings: Showing[]
  movieId: string
}

const groupByDate = (showings: Showing[]) => {
  return showings.reduce((acc: Record<string, Showing[]>, showing) => {
    if (showing.starts_at == null) return acc

    const date = new Date(showing.starts_at).toLocaleDateString(['en-US'], {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
    })

    if (!acc[date]) {
      acc[date] = []
    }

    acc[date].push(showing)

    return acc
  }, {})
}

export const List: FunctionComponent<Props> = ({ movieId, showings }) => {
  const { routes } = useCinema()

  const groupedShowings = groupByDate(showings)

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-bold mb-4">Upcoming showings</h2>

      {Object.entries(groupedShowings).map(([date, showings]) => (
        <div key={date} className="mb-6">
          <p className="text-xl font-semibold mb-2 border-b pb-2">{date}</p>

          <div className="flex gap-2 sm:gap-4 flex-wrap">
            {showings.map((showing) => (
              <Link
                href={(routes && showing.id) ? routes.getShowingPath(movieId, showing.id) : undefined}
                key={showing.id}
              >
                <Button variant="secondary" className="text-xs sm:text-sm font-bold sm:font-medium" suppressHydrationWarning>
                  {new Date(showing.starts_at ?? Date.now()).toLocaleTimeString(['en-US'], { hour: '2-digit', minute: '2-digit' })}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
