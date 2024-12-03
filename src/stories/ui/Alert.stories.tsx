import type { Meta, StoryObj } from '@storybook/react';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';

const meta = {
  title: 'UI/Alert',
  component: Alert,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive'
      ]
    }
  }
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
  }
};

export const Destructive: Story = {
  args: {
    children: 'Lorem ipsum dolor sit amet',
    variant: 'destructive'
  }
};

export const WithTitle: Story = {
  render: () => (
    <Alert>
      <AlertTitle>Lorem ipsum</AlertTitle>
      <AlertDescription>Excepteur sint occaecat cupidatat non proident.</AlertDescription>
    </Alert>
  )
};

