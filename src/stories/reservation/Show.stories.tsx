import type { Meta, StoryObj } from '@storybook/react';
import { Show } from '@/components/reservation/Show';
import {Reservation} from "@/types/Reservation";

const meta = {
  title: 'Reservation/Show',
  component: Show,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Show>;

export default meta;

type Story = StoryObj<typeof meta>;

const reservation: Reservation = {
  id: '1',
  seats: [[0, 1], [0, 2]],
  email: 'user@example.com',
  qr_url: 'https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg',
  total: '9'
}

export const Default: Story = {
  args: {
    reservation
  }
};