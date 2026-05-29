import type { Meta, StoryObj } from "@storybook/react"
import { StatusDot } from "../components/status-dot"

const meta: Meta<typeof StatusDot> = {
  title: "Components/StatusDot",
  component: StatusDot,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof StatusDot>

export const Active: Story = { args: { active: true, label: "Ativo" } }
export const Inactive: Story = { args: { active: false, label: "Inativo" } }
export const NoLabel: Story = { args: { active: true } }
