import React, {FormEvent, FunctionComponent, useState} from 'react'
import { useMutation } from '@tanstack/react-query'
import {CreateReservationParams, Reservation} from '@/types/Reservation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useReservation } from '@/lib/hooks/useReservation'
import { Label } from '@/components/ui/label'
import { Alert } from '@/components/ui/alert'
import { Summary } from '@/components/reservation/Summary'
import { useApiClient } from '@/lib/hooks/useApiClient'

interface Props {
  showingId: string
}

export interface ApiError {
  message: string
  response?: {
    data: {
      message: string
      errors?: Record<string, string>
    }
  }
}

export const Form: FunctionComponent<Props> = ({ showingId }) => {
  const { seats, updateReservation, nextStep, previousStep } = useReservation()
  const apiClient = useApiClient()

  const { mutate, error } = useMutation<
  Reservation,
  Error | ApiError,
  CreateReservationParams
  >({
    mutationFn: async (data) => {
      if (apiClient == null) {
        throw new Error('Could not create reservation! API Client is not set.')
      }

      return await apiClient.createReservation(showingId, data)
    },
    onSuccess: (reservation) => {
      updateReservation(reservation)
      nextStep()
    }
  })

  const [formData, setFormData] = useState({
      email: ''
  })

  function handleSubmit (e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    mutate({
      ...formData,
      seats
    })
  }

  function renderErrors () {
    if (error == null) {
      return <></>
    }

    if ('response' in error && (error.response)) {
      if (!error.response.data.errors) {
        return (
          <Alert variant="destructive" className="mb-2">
            {error.response.data.message}
          </Alert>
        )
      }

      return Object.values(error.response.data.errors).map((error, index) => (
        <Alert key={index} variant="destructive" className="mb-2">
          {error}
        </Alert>
      ))
    }

    return (
      <Alert variant="destructive" className="mb-2">
        {error.message}
      </Alert>
    )
  }

  return (
    <div className="mt-4 md:w-1/3">
      {renderErrors()}

      <Summary />

      <form onSubmit={handleSubmit} className="">
        <Label htmlFor="email">
          Please fill your email below so we can send your tickets to mailbox:
        </Label>

        <Input
          id="email"
          type="email"
          placeholder="user@example.com"
          required
          className="w-64 mb-2"
          value={formData.email}
          onChange={(e) => setFormData({...formData, email: e.target.value})}
        />

        <div className="flex gap-2">
          <Button type="button" onClick={previousStep}>Change seats</Button>
          <Button type="submit" variant="secondary">Submit</Button>
        </div>
      </form>
    </div>
  )
}
