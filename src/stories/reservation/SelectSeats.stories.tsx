import type { Meta, StoryObj } from '@storybook/react'
import { SelectSeats } from '@/components/reservation/SelectSeats'
import { faker } from '@faker-js/faker'
import Layout from '@/components/common/Layout'

const meta = {
  title: 'Reservation/SelectSeats',
  component: SelectSeats,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: ({ showing }) => (
    <Layout className="!min-h-0 p-5 rounded-lg">
      <SelectSeats showing={showing} />
    </Layout>
  ),
} satisfies Meta<typeof SelectSeats>

export default meta

type Story = StoryObj<typeof meta>

const showing = {
  id: '1',
  starts_at: faker.date.between({ from: new Date(), to: new Date(Date.now() + 1000 * 3600 * 24 * 7) }).toISOString(),
  rows: 5,
  columns: 6,
  seats_taken: [
    [2, 2], [2, 3],
  ],
}

export const Default: Story = {
  args: {
    showing,
  },
}
