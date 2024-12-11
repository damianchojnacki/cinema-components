import type { Meta, StoryObj } from '@storybook/react'
import { UpcomingShowings } from '@/components/showing/UpcomingShowings'
import { faker } from '@faker-js/faker'
import {Showing} from "@/types/Showing"
import Layout from "@/components/common/Layout"
import {Movie} from "@/types"

const meta = {
  title: 'Showing/UpcomingShowings',
  component: UpcomingShowings,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  render: ({movie, showings}) => (
    <Layout>
      <UpcomingShowings movie={movie} showings={showings} />
    </Layout>
  )
} satisfies Meta<typeof UpcomingShowings>

export default meta

type Story = StoryObj<typeof meta>

function getRandomShowings(): Showing[] {
  return Array.from({length: 20}).map((_, i) => ({
    id: i.toString(),
    starts_at: faker.date.between({from: new Date(), to: new Date(Date.now() + 1000 * 3600 * 24 * 7)}).toISOString(),
  })).sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime())
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
    showings: getRandomShowings(),
    movie
  },
}