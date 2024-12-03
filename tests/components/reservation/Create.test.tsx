import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { vi, test, beforeEach, afterEach, expect } from 'vitest'
import { Create } from '@/components/reservation/Create'
import { useRouter } from '@/components/common/useRouter'
import {Routes, useRoutes} from '@/lib/hooks/useRoutes'
import { useReservation } from '@/lib/hooks/useReservation'
import { Showing } from '@/types/Showing'
import { Movie } from '@/types/Movie'
import { QueryClient } from '@tanstack/react-query'
import movieFactory from "../../factories/movieFactory";

// Mock dependencies
vi.mock('@/components/common/useRouter', () => ({
  useRouter: vi.fn()
}))
vi.mock('@/lib/hooks/useRoutes', () => ({
  useRoutes: vi.fn()
}))
vi.mock('@/lib/hooks/useReservation', () => ({
  useReservation: vi.fn()
}))
vi.mock('@/components/reservation/SelectSeats', () => ({
  SelectSeats: () => <div data-testid="select-seats" />
}))
vi.mock('@/components/reservation/Form', () => ({
  Form: () => <div data-testid="form" />
}))
vi.mock('@/components/reservation/Show', () => ({
  Show: () => <div data-testid="show-reservation" />
}))
vi.mock('@/components/movie/Backdrop', () => ({
  Backdrop: () => <div data-testid="backdrop" />
}))
vi.mock('@/components/movie/Summary', () => ({
  Summary: () => <div data-testid="summary" />
}))

// Test data
const mockShowing: Showing = {
  id: '1',
  starts_at: '2023-12-01',
  rows: 6,
  columns: 6,
}

const mockMovie: Movie = movieFactory.create()
const mockQueryClient = new QueryClient()
const mockRoutes: Routes = {
  getMoviesPath: () => '/movies',
  getMovieShowingsPath: (id) => `/movies/${id}/showings`,
  getShowingPath: (movieId, id) => `/movies/${movieId}/showings/${id}`
}

beforeEach(() => {
  cleanup()
  vi.mocked(useRouter).mockReturnValue({ query: { id: '1' } })
  vi.mocked(useRoutes).mockReturnValue(mockRoutes)
  vi.mocked(useReservation).mockReturnValue({
    step: 0,
    reservation: null,
    reset: vi.fn()
  })
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

test('renders the SelectSeats component when step is 0', async () => {
  vi.mocked(useReservation).mockReturnValue({
    step: 0,
    reservation: null,
    reset: vi.fn()
  })

  render(<Create showing={mockShowing} movie={mockMovie} queryClient={mockQueryClient} />)

  await screen.findByTestId('select-seats')
})

test('renders the Form component when step is 1', async () => {
  vi.mocked(useReservation).mockReturnValue({
    step: 1,
    reservation: null,
    reset: vi.fn()
  })

  render(<Create showing={mockShowing} movie={mockMovie} queryClient={mockQueryClient} />)

  await screen.findByTestId('form')
})

test('renders the Show component when step is 2 and reservation is available', async () => {
  vi.mocked(useReservation).mockReturnValue({
    step: 2,
    reservation: { id: '2', email: 'user@example.com', seats: [[1, 2]] },
    reset: vi.fn()
  })

  render(<Create showing={mockShowing} movie={mockMovie} queryClient={mockQueryClient} />)

  await screen.findByTestId('show-reservation')
})

test('renders nothing when step is 2 and no reservation is available', () => {
  vi.mocked(useReservation).mockReturnValue({
    step: 2,
    reservation: null,
    reset: vi.fn()
  })

  render(<Create showing={mockShowing} movie={mockMovie} queryClient={mockQueryClient} />)

  expect(screen.queryByTestId('show-reservation')).toBeNull()
})

test('resets reservation state on mount', () => {
  const mockReset = vi.fn()
  vi.mocked(useReservation).mockReturnValue({
    step: 0,
    reservation: null,
    reset: mockReset
  })

  render(<Create showing={mockShowing} movie={mockMovie} queryClient={mockQueryClient} />)

  expect(mockReset).toHaveBeenCalledTimes(1)
})