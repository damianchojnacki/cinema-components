import type { Meta, StoryObj } from '@storybook/react';
import { List } from '@/components/movie/List';
import Layout from "@/components/common/Layout";
import { faker } from '@faker-js/faker';
import {Movie} from "@/types/Movie";
import {useCurrentMovie} from "@/lib/hooks";
import {useEffect} from "react";
import {Current} from "@/components/movie/Current";
import {expect, userEvent, within} from "@storybook/test";

const meta = {
  title: 'Movie/List',
  component: List,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

function getRandomMovies(): Movie[] {
  return Array.from({length: 12}).map((_, i) => ({
    id: (i + 1).toString(),
    title: faker.lorem.sentence({min: 1, max: 4}),
    description: faker.lorem.lines(3),
    rating: faker.number.float({min: 1, max: 9, fractionDigits: 1}).toString(),
    release_date: faker.date.future().toLocaleDateString(['en-US'], {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    }),
    poster_url: `https://picsum.photos/seed/${i + 1}/600/800`,
    backdrop_url: `https://picsum.photos/seed/${i + 1}/1920/1080`,
  }));
}

export const Default: Story = {
  args: {
    movies: getRandomMovies(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleLoadNextPage: () => {}
  },
  decorators: [
    (Story) => {
      return (
        <div className="relative">
          <div className="h-[890px] md:h-[1040px]"></div>

          <Story/>
        </div>
      )
    }
  ],
};

export const WithCurrentMovie: Story = {
  args: {
    movies: getRandomMovies(),
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    handleLoadNextPage: () => {}
  },
  decorators: [
    (Story, { args }) => {
      const {update} = useCurrentMovie()

      useEffect(() => update(args.movies[0]), []);

      return (
        <Layout>
          <Current/>

          <Story/>
        </Layout>
      )
    }
  ],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await expect(
      canvas.getByTestId('movie-card-1')
    ).toBeVisible()

    await userEvent.click(canvas.getByTestId('movie-card-1'), {
      delay: 500
    })

    await userEvent.keyboard('{Tab}{Tab}{Tab}{Tab}{Tab}')

    await userEvent.keyboard('{Tab}', {
      delay: 1000
    })

    await expect(
      canvas.getByTestId('movie-card-7')
    ).toHaveClass('ring-2')
  },
};
