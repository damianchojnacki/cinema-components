import React from 'react'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { expect, vi, test, beforeEach, afterEach } from 'vitest'
import { Card } from '@/components/movie/Card'
import { useCurrentMovie } from '@/lib/hooks/useCurrentMovie'
import movieFactory from "../../factories/movieFactory";

vi.mock('@/lib/hooks/useCurrentMovie', () => ({
  useCurrentMovie: vi.fn()
}))

const mockMovie = movieFactory.create()

const mockUpdate = vi.fn()
const mockCurrentMovie = { movie: null, update: mockUpdate }

beforeEach(() => {
  vi.mocked(useCurrentMovie).mockReturnValue(mockCurrentMovie)
})

afterEach(() => {
  vi.clearAllMocks()
  cleanup()
})

test('calls update function with the correct movie on click', () => {
  render(<Card movie={mockMovie} />)

  const card = screen.getByTestId(`movie-card-${mockMovie.id}`)
  fireEvent.click(card)

  expect(mockUpdate).toHaveBeenCalledWith(mockMovie)
})

test('calls update function with the correct movie on Enter key press', () => {
  render(<Card movie={mockMovie} />)

  const card = screen.getByTestId(`movie-card-${mockMovie.id}`)
  fireEvent.keyDown(card, { key: 'Enter', code: 'Enter', charCode: 13 })

  expect(mockUpdate).toHaveBeenCalledWith(mockMovie)
})

test('calls update function with the correct movie on Space key press', () => {
  render(<Card movie={mockMovie} />)

  const card = screen.getByTestId(`movie-card-${mockMovie.id}`)
  fireEvent.keyDown(card, { key: ' ', code: 'Space', charCode: 32 })

  expect(mockUpdate).toHaveBeenCalledWith(mockMovie)
})

test('does not call update function on other key presses', () => {
  render(<Card movie={mockMovie} />)

  const card = screen.getByTestId(`movie-card-${mockMovie.id}`)
  fireEvent.keyDown(card, { key: 'Escape', code: 'Escape', charCode: 27 })

  expect(mockUpdate).not.toHaveBeenCalled()
})

test('applies ring styling when the current movie matches the card movie', async () => {
  vi.mocked(useCurrentMovie).mockReturnValue({
    movie: mockMovie,
    update: mockUpdate
  })

  render(<Card movie={mockMovie} />)

  const card = await screen.findByTestId(`movie-card-${mockMovie.id}`)

  expect(card.className).toEqual(expect.stringContaining('ring-2 ring-gray-500'))
})

test('does not apply ring styling when the current movie does not match the card movie', async () => {
  vi.mocked(useCurrentMovie).mockReturnValue({
    movie: { id: '2', title: 'Another Movie', poster_url: 'https://example.com/another-poster.jpg' },
    update: mockUpdate
  })

  render(<Card movie={mockMovie} />)

  const card = await screen.findByTestId(`movie-card-${mockMovie.id}`)

  expect(card.className).not.toEqual(expect.stringContaining('ring-2 ring-gray-500'))
})