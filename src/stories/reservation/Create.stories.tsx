import type { Meta, StoryObj } from '@storybook/react'
import { Create } from '@/components/reservation/Create'
import { faker } from '@faker-js/faker'
import Layout from '@/components/common/Layout'
import { Movie, Showing } from '@/types'
import { expect, userEvent, within } from '@storybook/test'

const meta = {
  title: 'Reservation/Create',
  component: Create,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: ({ showing, movie }) => (
    <Layout>
      <Create showing={showing} movie={movie} />
    </Layout>
  ),
} satisfies Meta<typeof Create>

export default meta

type Story = StoryObj<typeof meta>

const showing: Showing = {
  id: '1',
  starts_at: faker.date.between({ from: new Date(), to: new Date(Date.now() + 1000 * 3600 * 24 * 7) }).toISOString(),
  rows: 5,
  columns: 6,
  seats_taken: [
    [2, 2], [2, 3],
  ],
}

const movie: Movie = {
  id: '1',
  title: 'Lorem ipsum dolor sit amet',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  rating: '6.7',
  release_date: '2024-10-12',
  poster_url: 'https://picsum.photos/600/800',
  backdrop_url: 'https://picsum.photos/1920/1080',
}

export const Default: Story = {
  args: {
    showing,
    movie,
  },
}

export const SelectSeats: Story = {
  ...Default,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByText('1-3'), {
      delay: 500,
    })

    await userEvent.click(canvas.getByText('1-4'), {
      delay: 500,
    })

    await userEvent.click(canvas.getByText('Next'))

    // 👇 Assert DOM structure
    await expect(
      canvas.getByText(
        'Selected seats:',
      ),
    ).toBeInTheDocument()

    await expect(
      canvas.getByText(
        '1-3',
      ),
    ).toBeInTheDocument()

    await expect(
      canvas.getByText(
        '1-4',
      ),
    ).toBeInTheDocument()
  },
}
