import type { Meta, StoryObj } from '@storybook/react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

const meta = {
  title: 'UI/Label',
  component: Label,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    htmlFor: {
      control: 'text',
    },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Name',
  },
}

export const WithInput: Story = {
  args: {
    children: 'Name',
    htmlFor: 'name',
  },
  render: (props) => (
    <>
      <Label {...props} />
      <Input placeholder="Name" />
    </>
  ),
}
