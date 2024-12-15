import { render, screen, cleanup } from '@testing-library/react'
import {CinemaContextProvider, useCinema, Client, CinemaConfiguration} from '@/lib/hooks/useCinema'
import {test, afterEach, vi, expect} from 'vitest'
import { CreateReservationPayload, Reservation } from '@/types/Reservation'
import React, {createElement, FunctionComponent, PropsWithChildren} from "react"

const mockClient: Client = {
  createReservation: vi.fn(async (_showingId: string, data: CreateReservationPayload): Promise<Reservation> => new Promise((resolve) => resolve({
    id: '1',
    email: data.email,
    seats: data.seats
  })))
}

const mockRoutes: CinemaConfiguration['routes'] = {
  getMoviesPath: () => '/movies',
  getMovieShowingsPath: (id) => `/movies/${id}/showings`,
  getShowingPath: (movieId, id) => `/movies/${movieId}/showings/${id}`
}

afterEach(() => {
  cleanup()
})

test('should provide routes context to children', async () => {
  const TestComponent = () => {
    const {routes} = useCinema()

    return <div>{routes?.getMoviesPath()}</div>
  }

  render(
    <CinemaContextProvider routes={mockRoutes}>
      <TestComponent />
    </CinemaContextProvider>
  )

  await screen.findByText('/movies')
})

test('should return the correct routes', async () => {
  const TestComponent = () => {
    const {routes} = useCinema()

    return (
      <>
        <p>{routes?.getMoviesPath()}</p>
        <p>{routes?.getMovieShowingsPath('123')}</p>
        <p>{routes?.getShowingPath('123', '456')}</p>
      </>
    )
  }

  render(
    <CinemaContextProvider routes={mockRoutes}>
      <TestComponent />
    </CinemaContextProvider>
  )

  await screen.findByText('/movies')
  await screen.findByText('/movies/123/showings')
  await screen.findByText('/movies/123/showings/456')
})

test('should provide api client context to children', () => {
  const TestComponent = () => {
    const {apiClient} = useCinema()

    if (!apiClient) return null

    const handleClick = async () => {
      const reservation = await apiClient.createReservation('1', {
        email: 'user@example.com',
        seats: [[1, 2]]
      })

      expect(reservation.id).toBe('1')
    }

    return <button onClick={() => void handleClick()}>Create Reservation</button>
  }

  render(
    <CinemaContextProvider apiClient={mockClient} >
      <TestComponent />
    </CinemaContextProvider>
  )

  const button = screen.getByText('Create Reservation')

  button.click()

  expect(mockClient.createReservation).toHaveBeenCalledWith('1', {
    email: 'user@example.com',
    seats: [[1, 2]]
  })
})

test('should provide link component to children', async () => {
  const TestComponent = () => {
    const {link: component} = useCinema()

    if (!component) {
      return
    }

    return createElement(component, {}, 'Click')
  }

  const Link: FunctionComponent<PropsWithChildren> = ({children}) => {
    return <div>{children}</div>
  }

  render(
    <CinemaContextProvider link={Link}>
      <TestComponent />
    </CinemaContextProvider>
  )

  const element = await screen.findByText('Click')

  expect(element).toBeInstanceOf(HTMLDivElement)
})

