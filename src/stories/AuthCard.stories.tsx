import type { Meta, StoryObj } from "@storybook/react"
import { AuthCard } from "../components/auth-card"

const meta: Meta<typeof AuthCard> = {
  title: "Components/AuthCard",
  component: AuthCard,
  tags: ["autodocs"],
  parameters: { layout: "fullscreen" },
}

export default meta
type Story = StoryObj<typeof AuthCard>

export const Login: Story = {
  args: {
    title: "Entrar",
    description: "Insira suas credenciais para acessar o sistema.",
    children: (
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Email</label>
          <input type="email" placeholder="nome@exemplo.com" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Senha</label>
          <input type="password" placeholder="Senha" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" />
        </div>
        <button className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Entrar</button>
      </div>
    ),
  },
}

export const WithFooter: Story = {
  args: {
    title: "Cadastrar",
    children: <div className="space-y-4"><input placeholder="Nome" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm" /><button className="w-full rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Cadastrar</button></div>,
    footer: <p className="text-center text-sm text-muted-foreground">Já tem conta? <a href="#" className="underline">Entrar</a></p>,
  },
}
