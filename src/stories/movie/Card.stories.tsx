import type { Meta, StoryObj } from '@storybook/react';
import { Card } from '@/components/movie/Card';

const meta = {
  title: 'Movie/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    movie: {
      id: '1',
      title: 'Lorem ipsum dolor sit amet',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      rating: '6.7',
      release_date: '2024-10-12',
      poster_url: 'https://picsum.photos/600/800',
      backdrop_url: 'https://picsum.photos/1920/1080',
    },
  },
};
