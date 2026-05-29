import type { Meta, StoryObj } from "@storybook/react"
import { FormDialogLayout } from "../components/form-dialog"

const meta: Meta<typeof FormDialogLayout> = {
  title: "Components/FormDialogLayout",
  component: FormDialogLayout,
  tags: ["autodocs"],
  args: {
    onSubmit: (e) => e.preventDefault(),
    onCancel: () => {},
  },
}

export default meta
type Story = StoryObj<typeof FormDialogLayout>

export const Default: Story = {
  args: {
    title: "Novo Usuário",
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Nome</label>
          <input placeholder="Nome completo" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input type="email" placeholder="email@exemplo.com" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
        </div>
      </div>
    ),
  },
}

export const Submitting: Story = {
  args: {
    title: "Editar Empresa",
    isSubmitting: true,
    children: (
      <div className="space-y-2">
        <label className="text-sm font-medium">Razão Social</label>
        <input defaultValue="Motor Hero LTDA" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
      </div>
    ),
  },
}

export const Disabled: Story = {
  args: {
    title: "Cadastro",
    isDisabled: true,
    children: (
      <div className="space-y-2">
        <label className="text-sm font-medium">Email</label>
        <input placeholder="Preencha todos os campos" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
      </div>
    ),
  },
}
