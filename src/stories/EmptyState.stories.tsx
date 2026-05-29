import type { Meta, StoryObj } from "@storybook/react"
import { EmptyState } from "../components/empty-state"

const meta: Meta<typeof EmptyState> = {
  title: "Components/EmptyState",
  component: EmptyState,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof EmptyState>

export const Default: Story = {
  args: {
    title: "Nenhum registro encontrado",
    description: "Comece adicionando o primeiro item.",
  },
}

export const WithIcon: Story = {
  args: {
    icon: <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    title: "Nenhum usuário",
    description: "Adicione usuários para gerenciar sua equipe.",
  },
}

export const WithAction: Story = {
  args: {
    title: "Nenhuma empresa cadastrada",
    description: "Comece adicionando a primeira empresa.",
    action: <button className="mt-2 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Adicionar</button>,
  },
}
