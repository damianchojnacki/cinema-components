import {useState} from "react"
import {Reservation} from "@/types"
import {CreateReservationPayload} from "@/types/Reservation"
import {ApiError, useCinema} from "@/lib/hooks/useCinema"

export const useCreateReservation = () => {
  const [error, setError] = useState<Error | ApiError | null>(null)
  const [data, setData] = useState<Reservation | null>(null)

  const {apiClient} = useCinema()

  const mutate = async (showingId: string, payload: CreateReservationPayload) => {
    if (apiClient == null) {
      throw new Error('Could not create reservation! API Client is not set.')
    }

    try {
      const response = await apiClient.createReservation(showingId, payload)

      setData(response)
    } catch (e) {
      if (!(e instanceof Error)) {
        throw e
      }

      setError(e)
    }
  }

  return {data, error, mutate}
}