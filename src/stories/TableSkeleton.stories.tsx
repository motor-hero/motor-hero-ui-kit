import type { Meta, StoryObj } from "@storybook/react"
import { TableSkeleton } from "../components/table-skeleton"

const meta: Meta<typeof TableSkeleton> = {
  title: "Components/TableSkeleton",
  component: TableSkeleton,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof TableSkeleton>

export const Default: Story = {
  args: { rows: 5, columns: 4 },
  decorators: [(Story) => <table className="w-full"><tbody><Story /></tbody></table>],
}

export const Dense: Story = {
  args: { rows: 10, columns: 6 },
  decorators: [(Story) => <table className="w-full"><tbody><Story /></tbody></table>],
}
