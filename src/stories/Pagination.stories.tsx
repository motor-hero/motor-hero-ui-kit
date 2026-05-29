import type { Meta, StoryObj } from "@storybook/react"
import { Pagination } from "../components/pagination"

const meta: Meta<typeof Pagination> = {
  title: "Components/Pagination",
  component: Pagination,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof Pagination>

export const FirstPage: Story = {
  args: { page: 1, hasNextPage: true, hasPreviousPage: false, onPageChange: () => {} },
}

export const MiddlePage: Story = {
  args: { page: 3, hasNextPage: true, hasPreviousPage: true, onPageChange: () => {} },
}

export const LastPage: Story = {
  args: { page: 5, hasNextPage: false, hasPreviousPage: true, onPageChange: () => {} },
}
