import type { Meta, StoryObj } from '@storybook/react'
import { List } from '@/components/movie/List'
import { faker } from '@faker-js/faker'
import { Movie } from '@/types/Movie'

const meta = {
  title: 'Movie/List',
  component: List,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof List>

export default meta
type Story = StoryObj<typeof meta>

function getRandomMovies(): Movie[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: (i + 1).toString(),
    title: faker.lorem.sentence({ min: 1, max: 4 }),
    description: faker.lorem.lines(3),
    rating: faker.number.float({ min: 1, max: 9, fractionDigits: 1 }).toString(),
    release_date: faker.date.future().toLocaleDateString(['en-US'], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    poster_url: `https://picsum.photos/seed/${i + 1}/300/400`,
    backdrop_url: `https://picsum.photos/seed/${i + 1}/1280/720`,
  }))
}

export const Default: Story = {
  args: {
    movies: getRandomMovies(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleLoadNextPage: () => {},
  },
}
