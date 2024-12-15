import type { Meta, StoryObj } from '@storybook/react'
import { Summary } from '@/components/reservation/Summary'
import Layout from '@/components/common/Layout'
import { useReservation } from '@/lib/hooks'
import { useEffect } from 'react'

const meta = {
  title: 'Reservation/Summary',
  component: Summary,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: () => (
    <Layout className="!min-h-0 p-5 rounded-lg">
      <Summary />
    </Layout>
  ),
} satisfies Meta<typeof Summary>

export default meta

type Story = StoryObj<typeof meta>

const seats = [
  [0, 1],
  [0, 2],
]

export const Default: Story = {
  decorators: [
    (Story) => {
      const { selectSeats } = useReservation()

      useEffect(() => selectSeats(seats), [])

      return (
        <Story />
      )
    },
  ],
}
