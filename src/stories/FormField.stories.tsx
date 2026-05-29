import type { Meta, StoryObj } from "@storybook/react"
import { FormField } from "../components/form-field"

const meta: Meta<typeof FormField> = {
  title: "Components/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    label: "Email",
    htmlFor: "email",
  },
}

export default meta
type Story = StoryObj<typeof FormField>

export const Default: Story = {
  args: {
    label: "Email",
    children: <input id="email" type="email" placeholder="nome@exemplo.com" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" />,
  },
}

export const Required: Story = {
  args: {
    label: "Senha",
    required: true,
    children: <input type="password" placeholder="Senha" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm" />,
  },
}

export const WithError: Story = {
  args: {
    label: "Email",
    error: "Email é obrigatório",
    children: <input type="email" placeholder="Email" className="flex h-9 w-full rounded-md border border-destructive bg-transparent px-3 py-1 text-sm shadow-sm" />,
  },
}
