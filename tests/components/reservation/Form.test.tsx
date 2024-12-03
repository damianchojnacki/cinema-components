import React from 'react'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { vi, test, beforeEach, afterEach, expect } from 'vitest'
import {ApiError, Form} from '@/components/reservation/Form'
import { useReservation } from '@/lib/hooks/useReservation'
import { useApiClient } from '@/lib/hooks/useApiClient'
import {useMutation, UseMutationResult} from '@tanstack/react-query'

// Mock hooks and components
vi.mock('@/lib/hooks/useReservation', () => ({
  useReservation: vi.fn()
}))
vi.mock('@/lib/hooks/useApiClient', () => ({
  useApiClient: vi.fn()
}))
vi.mock('@/components/reservation/Summary', () => ({
  Summary: () => <div data-testid="summary" />
}))
vi.mock('@tanstack/react-query', () => ({
  useMutation: vi.fn()
}))

beforeEach(() => {
  cleanup()
})

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

test('renders form components and Summary', () => {
  // Arrange mocks
  vi.mocked(useReservation).mockReturnValue({
    seats: [[1, 2]],
    updateReservation: vi.fn(),
    nextStep: vi.fn(),
    previousStep: vi.fn()
  })
  vi.mocked(useApiClient).mockReturnValue({
    createReservation: vi.fn()
  })
  vi.mocked(useMutation).mockReturnValue({
    mutate: vi.fn(),
    error: null
  } as unknown as UseMutationResult)

  // Act
  render(<Form showingId="123" />)

  // Assert
  screen.getByTestId('summary')
  screen.getByLabelText(/fill your email/i)
  screen.getByRole('button', { name: /change seats/i })
  screen.getByRole('button', { name: /submit/i })
})

test('submits form data and calls mutate function', async () => {
  const mockMutate = vi.fn()
  const mockNextStep = vi.fn()

  vi.mocked(useReservation).mockReturnValue({
    seats: [[1, 2]],
    updateReservation: vi.fn(),
    nextStep: mockNextStep,
    previousStep: vi.fn()
  })
  vi.mocked(useApiClient).mockReturnValue({
    createReservation: vi.fn()
  })
  vi.mocked(useMutation).mockReturnValue({
    mutate: mockMutate,
    error: null
  } as unknown as UseMutationResult)

  // Act
  render(<Form showingId="123" />)
  fireEvent.change(screen.getByPlaceholderText('user@example.com'), {
    target: { value: 'test@example.com' }
  })
  fireEvent.click(screen.getByRole('button', { name: /submit/i }))

  // Assert
  await waitFor(() => {
    expect(mockMutate).toHaveBeenCalledWith({
      email: 'test@example.com',
      seats: [[1, 2]]
    })
  })
})

test('calls previousStep when "Change seats" is clicked', () => {
  const mockPreviousStep = vi.fn()

  vi.mocked(useReservation).mockReturnValue({
    seats: [[1, 2]],
    updateReservation: vi.fn(),
    nextStep: vi.fn(),
    previousStep: mockPreviousStep
  })

  render(<Form showingId="123" />)
  fireEvent.click(screen.getByRole('button', { name: /change seats/i }))

  expect(mockPreviousStep).toHaveBeenCalledTimes(1)
})

test('displays API error message if an error occurs', async () => {
  const mockError = {
    message: 'Something went wrong',
    response: {
      data: {
        message: 'Failed to create reservation',
        errors: {
          email: 'Invalid email address'
        }
      }
    }
  }

  renderWithMockedError(mockError)

  // Assert
  await waitFor(() => {
    screen.getByText(/invalid email address/i)
  })
})

test('renders general error message if error is not API-related', async () => {
  const mockError = { message: 'Something went wrong' }

  renderWithMockedError(mockError)

  await waitFor(() => {
    screen.getByText(/something went wrong/i)
  })
})

function renderWithMockedError(error: ApiError) {
  vi.mocked(useReservation).mockReturnValue({
    seats: [[1, 2]],
    updateReservation: vi.fn(),
    nextStep: vi.fn(),
    previousStep: vi.fn(),
  })
  vi.mocked(useApiClient).mockReturnValue({
    createReservation: vi.fn(),
  })
  vi.mocked(useMutation).mockReturnValue({
    mutate: vi.fn(),
    error,
  } as unknown as UseMutationResult)

  render(<Form showingId="123" />)
}