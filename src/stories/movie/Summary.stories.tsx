import type { Meta, StoryObj } from '@storybook/react'
import { Summary } from '@/components/movie/Summary'
import {expect, userEvent, within} from "@storybook/test"

const meta = {
  title: 'Movie/Summary',
  component: Summary,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Summary>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    movie: {
      id: '1',
      title: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      rating: '6.7',
      release_date: '2024-10-12',
      poster_url: 'https://picsum.photos/300/400',
      backdrop_url: 'https://picsum.photos/1280/720',
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await expect(
      canvas.getByTestId('movie-description').innerText
    ).toHaveLength(303)

    await userEvent.click(canvas.getByTestId('movie-description-expand'))

    await expect(
      canvas.getByTestId('movie-description').innerText
    ).toHaveLength(334)
  },
}
