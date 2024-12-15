import { create } from 'zustand'
import { Reservation } from '@/types/Reservation'

export const useReservation = create<{
  step: number
  seats: number[][]
  reservation: Reservation | undefined
  selectSeats: (data: number[][]) => void
  setReservation: (reservation: Reservation) => void
  nextStep: () => void
  previousStep: () => void
  reset: () => void
}>()((set) => ({
  step: 0,
  seats: [],
  reservation: undefined,
  selectSeats: (seats) => set((data) => ({ ...data, seats })),
  setReservation: (reservation: Reservation) => set((data) => ({ ...data, reservation })),
  nextStep: () => set((data) => ({ ...data, step: data.step + 1 })),
  previousStep: () => set((data) => ({ ...data, step: data.step - 1 })),
  reset: () => set(() => ({ step: 0, seats: [], reservation: undefined })),
}))
