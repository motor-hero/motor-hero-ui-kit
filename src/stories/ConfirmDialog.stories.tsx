import type { Meta, StoryObj } from "@storybook/react"
import { ConfirmDialog } from "../components/confirm-dialog"

const meta: Meta<typeof ConfirmDialog> = {
  title: "Components/ConfirmDialog",
  component: ConfirmDialog,
  tags: ["autodocs"],
  args: {
    open: true,
    onOpenChange: () => {},
    onConfirm: () => {},
  },
}

export default meta
type Story = StoryObj<typeof ConfirmDialog>

export const Default: Story = {
  args: {
    title: "Confirmar ação",
    description: "Tem certeza que deseja continuar?",
  },
}

export const Destructive: Story = {
  args: {
    title: "Excluir usuário",
    description: "Esta ação não pode ser desfeita. O usuário será removido permanentemente.",
    variant: "destructive",
    confirmLabel: "Excluir",
  },
}

export const Loading: Story = {
  args: {
    title: "Remover empresa",
    description: "Deseja remover esta empresa do sistema?",
    loading: true,
    variant: "destructive",
  },
}
