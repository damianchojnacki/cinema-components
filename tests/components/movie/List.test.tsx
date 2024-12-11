import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { expect, vi, afterEach, beforeEach, test } from 'vitest'
import { List } from '@/components/movie/List'
import { useCurrentMovie } from '@/lib/hooks/useCurrentMovie'
import { Movie } from '@/types/Movie'
import movieFactory from "../../factories/movieFactory"

const mockScrollProperties = (element: HTMLElement, { scrollTop, offsetHeight, scrollHeight }: Record<string, number>) => {
  Object.defineProperty(element, 'scrollTop', { value: scrollTop, writable: true })
  Object.defineProperty(element, 'offsetHeight', { value: offsetHeight, writable: true })
  Object.defineProperty(element, 'scrollHeight', { value: scrollHeight, writable: true })
}

vi.mock('@/lib/hooks/useCurrentMovie', () => ({
  useCurrentMovie: vi.fn()
}))

const mockMovies: Movie[] = movieFactory.createMany(12)

const mockHandleLoadNextPage = vi.fn()
const mockUpdate = vi.fn()

beforeEach(() => {
  vi.mocked(useCurrentMovie).mockReturnValue({ update: mockUpdate })
})

afterEach(() => {
  cleanup() // Ensure the DOM is cleaned up after each test
  vi.clearAllMocks() // Clear mocks after each test
})

test('renders the list of movies', async () => {
  render(<List movies={mockMovies} handleLoadNextPage={mockHandleLoadNextPage} />)

  // Check if all movie cards are rendered using async findByTestId
  for (const movie of mockMovies) {
    await screen.findByTestId(`movie-card-${movie.id}`)
  }
})

test('calls update function when scrolling', async () => {
  render(<List movies={mockMovies} handleLoadNextPage={mockHandleLoadNextPage} />)

  const movieList = await screen.findByTestId('movie-list')

  mockScrollProperties(movieList, { scrollTop: 100, offsetHeight: 200, scrollHeight: 500 })

  // Simulate scroll event
  fireEvent.scroll(movieList)

  // Check if the update function was called
  expect(mockUpdate).toHaveBeenCalled()
})

test('calls handleLoadNextPage when scrolling reaches bottom', async () => {
  render(<List movies={mockMovies} handleLoadNextPage={mockHandleLoadNextPage} />)

  const movieList = await screen.findByTestId('movie-list')

  // Mock scroll-related properties to simulate bottom scroll
  mockScrollProperties(movieList, { scrollTop: 450, offsetHeight: 200, scrollHeight: 500 })

  // Simulate scroll event
  fireEvent.scroll(movieList)

  // Check if handleLoadNextPage was called
  expect(mockHandleLoadNextPage).toHaveBeenCalled()
})

test('does not call handleLoadNextPage if scroll is not at the bottom', async () => {
  render(<List movies={mockMovies} handleLoadNextPage={mockHandleLoadNextPage} />)

  const movieList = await screen.findByTestId('movie-list')

  // Mock scroll-related properties to simulate not at bottom
  mockScrollProperties(movieList, { scrollTop: 100, offsetHeight: 200, scrollHeight: 500 })

  // Simulate scroll event
  fireEvent.scroll(movieList)

  // Check if handleLoadNextPage was not called
  expect(mockHandleLoadNextPage).not.toHaveBeenCalled()
})

test('calculates the correct index when scrolling', async () => {
  render(<List movies={mockMovies} handleLoadNextPage={mockHandleLoadNextPage} />)

  const movieList = await screen.findByTestId('movie-list')

  // Mock scroll-related properties to trigger index calculation
  mockScrollProperties(movieList, { scrollTop: 100, offsetHeight: 200, scrollHeight: 500 })

  // Simulate scroll event
  fireEvent.scroll(movieList)

  // Check if update was called with the correct movie
  expect(mockUpdate).toHaveBeenCalledWith(mockMovies[mockMovies.length - 1]) // Assuming that the calculated index leads to the last movie
})

test('does not call update function if the movie list is empty', async () => {
  render(<List movies={[]} handleLoadNextPage={mockHandleLoadNextPage} />)

  const movieList = await screen.findByTestId('movie-list')

  // Mock scroll-related properties
  mockScrollProperties(movieList, { scrollTop: 100, offsetHeight: 200, scrollHeight: 500 })

  fireEvent.scroll(movieList)

  // Check that the update function was not called
  expect(mockUpdate).not.toHaveBeenCalled()
})