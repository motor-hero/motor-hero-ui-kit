import type { Meta, StoryObj } from "@storybook/react"
import { ResponsiveDataView } from "../components/responsive-data-view"

const meta: Meta<typeof ResponsiveDataView> = {
  title: "Components/ResponsiveDataView",
  component: ResponsiveDataView,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof ResponsiveDataView>

export const WithData: Story = {
  args: {
    isEmpty: false,
    isLoading: false,
    table: (
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b">
          <tr>
            <th className="h-10 px-4 text-left font-medium text-muted-foreground">Nome</th>
            <th className="h-10 px-4 text-left font-medium text-muted-foreground">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b"><td className="p-4">João Silva</td><td className="p-4">joao@example.com</td></tr>
          <tr className="border-b"><td className="p-4">Maria Santos</td><td className="p-4">maria@example.com</td></tr>
        </tbody>
      </table>
    ),
    cards: (
      <div className="space-y-3">
        <div className="rounded-xl border p-4"><span className="font-medium text-sm">João Silva</span><p className="text-sm text-muted-foreground">joao@example.com</p></div>
        <div className="rounded-xl border p-4"><span className="font-medium text-sm">Maria Santos</span><p className="text-sm text-muted-foreground">maria@example.com</p></div>
      </div>
    ),
  },
}

export const Empty: Story = {
  args: {
    isEmpty: true,
    isLoading: false,
    emptyTitle: "Nenhum registro",
    emptyDescription: "Nenhum dado disponível no momento.",
    table: <table className="w-full"><thead className="border-b"><tr><th className="h-10 px-4 text-left font-medium text-muted-foreground">Nome</th></tr></thead><tbody /></table>,
    cards: <div />,
  },
}
