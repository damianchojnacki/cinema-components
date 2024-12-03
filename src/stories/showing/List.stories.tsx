import type { Meta, StoryObj } from '@storybook/react';
import { List } from '@/components/showing/List';
import Layout from "@/components/common/Layout";
import { faker } from '@faker-js/faker';
import {Showing} from "@/types/Showing";

const meta = {
  title: 'Showing/List',
  component: List,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
  render: ({showings}) => (
    <Layout className="!min-h-0 p-5 rounded-lg">
      <List showings={showings} />
    </Layout>
  )
} satisfies Meta<typeof List>;

export default meta;
type Story = StoryObj<typeof meta>;

function getRandomShowings(): Showing[] {
  return Array.from({length: 20}).map((_, i) => ({
    id: i.toString(),
    starts_at: faker.date.between({from: new Date(), to: new Date(Date.now() + 1000 * 3600 * 24 * 7)}).toISOString(),
  })).sort((a, b) => new Date(a.starts_at).getTime() - new Date(b.starts_at).getTime());
}

export const Default: Story = {
  args: {
    showings: getRandomShowings(),
  },
};