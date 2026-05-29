import type { Meta, StoryObj } from "@storybook/react"
import { MobileCardList } from "../components/mobile-card-list"

const meta: Meta = {
  title: "Components/MobileCardList",
  tags: ["autodocs"],
  parameters: { viewport: { defaultViewport: "mobile1" } },
}

export default meta

const mockUsers = [
  { id: "1", name: "João Silva", email: "joao@example.com", role: "Admin", active: true },
  { id: "2", name: "Maria Santos", email: "maria@example.com", role: "Gestor", active: true },
  { id: "3", name: "Ana Oliveira", email: "ana@example.com", role: "Gestor", active: false },
]

export const Default: StoryObj = {
  render: () => (
    <MobileCardList
      data={mockUsers}
      keyExtractor={(u) => u.id}
      renderCard={(user) => (
        <div className="space-y-2">
          <div className="flex justify-between"><span className="font-medium text-sm">{user.name}</span><span className="text-xs text-muted-foreground">{user.role}</span></div>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <span className={`text-xs ${user.active ? "text-green-500" : "text-red-500"}`}>{user.active ? "Ativo" : "Inativo"}</span>
        </div>
      )}
    />
  ),
}

export const Loading: StoryObj = {
  render: () => (
    <MobileCardList data={[]} keyExtractor={() => ""} isLoading loadingCount={3} renderCard={() => null} />
  ),
}
