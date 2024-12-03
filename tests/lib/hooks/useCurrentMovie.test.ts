import { renderHook, act } from '@testing-library/react'
import { useCurrentMovie } from '@/lib/hooks/useCurrentMovie'
import { expect, test, afterEach } from 'vitest'
import movieFactory from "../../factories/movieFactory";

afterEach(() => {
  act(() => {
    useCurrentMovie.getState().update(null)
  })
})

test('should initialize with default values', () => {
  const { result } = renderHook(() => useCurrentMovie())

  expect(result.current.movie).toBe(null)
})

test('should update movie correctly', () => {
  const { result } = renderHook(() => useCurrentMovie())
  const newMovie = movieFactory.create()

  act(() => {
    result.current.update(newMovie)
  })

  expect(result.current.movie).toEqual(newMovie)
})