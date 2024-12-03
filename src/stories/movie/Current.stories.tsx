import type { Meta, StoryObj } from '@storybook/react';
import { Current } from '@/components/movie/Current';
import {useCurrentMovie} from "@/lib/hooks";
import {useEffect} from "react";
import {Layout} from "@/components/common";
import {Movie} from "@/types";

const meta = {
  title: 'Movie/Current',
  component: Current,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Current>;

export default meta;
type Story = StoryObj<typeof meta>;

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
  decorators: [
    (Story) => {
      const {update} = useCurrentMovie()

      useEffect(() => update(movie), []);

      return (
        <Layout>
          <Story />
        </Layout>
      )
    }
  ],
};
