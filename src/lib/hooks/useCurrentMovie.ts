import { create } from 'zustand'
import { Movie } from '@/types/Movie'

export const useCurrentMovie = create<{
  movie: Movie | null
  update: (data: Movie | null) => void
}>()((set) => ({
  movie: null,
  update: (data) => set(() => ({ movie: data })),
}))
