export interface Reservation {
  id?: string
  seats?: number[][]
  email?: string
  total?: string
  showing?: string
  qr_url?: string
}

export type CreateReservationParams = Pick<Reservation, 'email' | 'seats'>