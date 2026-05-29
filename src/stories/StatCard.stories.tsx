import type { Meta, StoryObj } from "@storybook/react"
import { StatCard } from "../components/stat-card"

const meta: Meta<typeof StatCard> = {
  title: "Components/StatCard",
  component: StatCard,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof StatCard>

export const Default: Story = {
  args: { label: "Usuários", value: 42, detail: "38 ativos" },
}

export const Loading: Story = {
  args: { label: "Empresas", value: 0, isLoading: true },
}

export const WithCustomValue: Story = {
  args: { label: "Seu Perfil", value: "admin@example.com", detail: "Administrador" },
}
