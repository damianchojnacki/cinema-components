import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'

const meta = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
      ]
    },
    size: {
      control: 'select',
      options: [
        'default',
        'sm',
        'lg',
        'icon'
      ]
    }
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const Default: Story = {
  args: {
    children: 'Button',
  },
}

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
}

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
  },
}

export const Outline: Story = {
  args: {
    children: 'Button',
    variant: 'outline',
  },
}

export const Ghost: Story = {
  args: {
    children: 'Button',
    variant: 'ghost',
  },
}

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'sm'
  },
}

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'lg'
  },
}

export const Icon: Story = {
  args: {
    children: <Trash/>,
    size: 'icon'
  },
}

