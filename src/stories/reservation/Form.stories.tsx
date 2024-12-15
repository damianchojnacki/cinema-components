import type { Meta, StoryObj } from '@storybook/react'
import { Form } from '@/components/reservation/Form'
import Layout from "@/components/common/Layout"
import {useReservation} from "@/lib/hooks"
import {useEffect, useState} from "react"

const meta = {
  title: 'Reservation/Form',
  component: Form,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: ({ showingId }) => (
    <Layout className="!min-h-0 p-5 rounded-lg">
      <Form showingId={showingId} />
    </Layout>
  )
} satisfies Meta<typeof Form>

export default meta

type Story = StoryObj<typeof meta>

const seats = [
  [0, 1]
]

export const Default: Story = {
  args: {
    showingId: '1',
  },
  decorators: [
    (Story) => {
      const {selectSeats} = useReservation()

      useEffect(() => selectSeats(seats), [])

      return (
        <Story />
      )
    }
  ],
}