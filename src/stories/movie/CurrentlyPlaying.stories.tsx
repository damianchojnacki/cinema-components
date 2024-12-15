import type { Meta, StoryObj } from '@storybook/react'
import { CurrentlyPlaying } from '@/components/movie/CurrentlyPlaying'
import Layout from '@/components/common/Layout'
import { faker } from '@faker-js/faker'
import { Movie } from '@/types/Movie'
import { expect, userEvent, within } from '@storybook/test'

const meta = {
  title: 'Movie/CurrentlyPlaying',
  component: CurrentlyPlaying,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof CurrentlyPlaying>

export default meta
type Story = StoryObj<typeof meta>

function getRandomMovies(): Movie[] {
  return Array.from({ length: 12 }).map((_, i) => ({
    id: (i + 1).toString(),
    title: faker.lorem.sentence({ min: 1, max: 4 }),
    description: faker.lorem.lines({ min: 3, max: 10 }),
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
  render: (props) => (
    <Layout>
      <CurrentlyPlaying {...props} />
    </Layout>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByTestId('movie-card-1'),
    ).toBeVisible()

    await userEvent.click(canvas.getByTestId('movie-card-1'), {
      delay: 500,
    })

    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}{Tab}')

    await userEvent.keyboard('{Tab}', {
      delay: 1000,
    })

    await expect(
      canvas.getByTestId('movie-card-7'),
    ).toHaveClass('ring-2')
  },
}
