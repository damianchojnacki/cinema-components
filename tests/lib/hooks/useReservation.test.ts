import { renderHook, act } from '@testing-library/react'
import { useReservation } from '@/lib/hooks/useReservation'
import { Reservation } from '@/types/Reservation'
import { expect, test, afterEach } from 'vitest'

afterEach(() => {
  act(() => {
    useReservation.getState().reset()
  })
})

test('should initialize with default values', () => {
  const { result } = renderHook(() => useReservation())

  expect(result.current.step).toBe(0)
  expect(result.current.seats).toEqual([])
  expect(result.current.reservation).toBeUndefined()
})

test('should update seats correctly', () => {
  const { result } = renderHook(() => useReservation())
  const newSeats = [[1, 2], [3, 4]]

  act(() => {
    result.current.selectSeats(newSeats)
  })

  expect(result.current.seats).toEqual(newSeats)
})

test('should update reservation correctly', () => {
  const { result } = renderHook(() => useReservation())
  const newReservation: Reservation = { id: '123'}

  act(() => {
    result.current.setReservation(newReservation)
  })

  expect(result.current.reservation).toEqual(newReservation)
})

test('should increment step on nextStep', () => {
  const { result } = renderHook(() => useReservation())

  act(() => {
    result.current.nextStep()
  })

  expect(result.current.step).toBe(1)
})

test('should decrement step on previousStep', () => {
  const { result } = renderHook(() => useReservation())

  act(() => {
    result.current.nextStep()
    result.current.previousStep()
  })

  expect(result.current.step).toBe(0)
})

test('should reset all values correctly', () => {
  const { result } = renderHook(() => useReservation())
  const newSeats = [[1, 2], [3, 4]]
  const newReservation: Reservation = { id: '123' }

  act(() => {
    result.current.selectSeats(newSeats)
    result.current.setReservation(newReservation)
    result.current.nextStep()
    result.current.reset()
  })

  expect(result.current.step).toBe(0)
  expect(result.current.seats).toEqual([])
  expect(result.current.reservation).toBeUndefined()
})
