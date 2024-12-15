import React, {
  createContext,
  useContext,
  FunctionComponent,
  PropsWithChildren,
  ComponentType,
} from 'react'
import { CreateReservationPayload, Reservation } from '@/types/Reservation'

export interface ApiResponse {
  data: {
    message: string
    errors?: Record<string, string>
  }
}

export class ApiError extends Error {
  constructor(public message: string, public response: ApiResponse) {
    super()
  }
}

export interface Client {
  createReservation: (showingId: string, data: CreateReservationPayload) => Promise<Reservation>
}

export interface Routes {
  getMoviesPath: () => string
  getMovieShowingsPath: (id: string) => string
  getShowingPath: (movieId: string, id: string) => string
}

export interface CinemaConfiguration {
  routes?: Routes
  apiClient?: Client
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  link?: ComponentType<any>
}

const CinemaContext = createContext<CinemaConfiguration>({})

export const useCinema = () => useContext(CinemaContext)

export type Props = PropsWithChildren & CinemaConfiguration

export const CinemaContextProvider: FunctionComponent<Props> = ({ children, routes, apiClient, link }) => {
  return (
    <CinemaContext.Provider value={{
      routes,
      apiClient,
      link,
    }}
    >
      {children}
    </CinemaContext.Provider>
  )
}
