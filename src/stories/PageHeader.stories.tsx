import type { Meta, StoryObj } from "@storybook/react"
import { PageHeader } from "../components/page-header"

const meta: Meta<typeof PageHeader> = {
  title: "Components/PageHeader",
  component: PageHeader,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof PageHeader>

export const Default: Story = {
  args: { title: "Administração de Usuários" },
}

export const WithDescription: Story = {
  args: { title: "Gestão de Empresas", description: "Gerencie as empresas cadastradas no sistema." },
}

export const WithAction: Story = {
  args: {
    title: "Usuários",
    action: <button className="rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground">Adicionar</button>,
  },
}
