import React from 'react'
import { render, screen, cleanup } from '@testing-library/react'
import { test, expect, vi, afterEach } from 'vitest'
import { ApiClientContextProvider, useApiClient, Client } from '@/lib/hooks/useApiClient'
import { CreateReservationParams, Reservation } from '@/types/Reservation'

const mockClient: Client = {
  createReservation: vi.fn(async (showingId: string, data: CreateReservationParams): Promise<Reservation> => new Promise((resolve) => resolve({
    id: '1',
    email: data.email,
    seats: data.seats
  })))
}

afterEach(() => {
  cleanup()
  vi.resetAllMocks()
})

test('should provide client context to children', () => {
  const TestComponent = () => {
    const client = useApiClient()
    if (!client) return null

    const handleClick = async () => {
      const reservation = await client.createReservation('1', {
        email: 'user@example.com',
        seats: [[1, 2]]
      })

      expect(reservation.id).toBe('1')
    }

    return <button onClick={() => void handleClick()}>Create Reservation</button>
  }

  render(
    <ApiClientContextProvider client={mockClient}>
      <TestComponent />
    </ApiClientContextProvider>
  )

  const button = screen.getByText('Create Reservation')

  button.click()

  expect(mockClient.createReservation).toHaveBeenCalledWith('1', {
    email: 'user@example.com',
    seats: [[1, 2]]
  })
})
