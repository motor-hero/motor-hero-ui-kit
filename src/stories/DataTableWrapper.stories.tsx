import type { Meta, StoryObj } from "@storybook/react"
import { DataTableWrapper } from "../components/data-table-wrapper"

const meta: Meta<typeof DataTableWrapper> = {
  title: "Components/DataTableWrapper",
  component: DataTableWrapper,
  tags: ["autodocs"],
}

export default meta
type Story = StoryObj<typeof DataTableWrapper>

export const WithData: Story = {
  args: {
    isEmpty: false,
    isLoading: false,
    page: 1,
    hasNextPage: true,
    hasPreviousPage: false,
    onPageChange: () => {},
    children: (
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b">
          <tr>
            <th className="h-10 px-4 text-left font-medium text-muted-foreground">Nome</th>
            <th className="h-10 px-4 text-left font-medium text-muted-foreground">Email</th>
            <th className="h-10 px-4 text-left font-medium text-muted-foreground">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b"><td className="p-4">João Silva</td><td className="p-4">joao@example.com</td><td className="p-4">Ativo</td></tr>
          <tr className="border-b"><td className="p-4">Maria Santos</td><td className="p-4">maria@example.com</td><td className="p-4">Ativo</td></tr>
        </tbody>
      </table>
    ),
  },
}

export const Empty: Story = {
  args: {
    isEmpty: true,
    isLoading: false,
    emptyTitle: "Nenhum usuário encontrado",
    emptyDescription: "Tente ajustar os filtros de busca.",
    children: (
      <table className="w-full caption-bottom text-sm">
        <thead className="border-b">
          <tr>
            <th className="h-10 px-4 text-left font-medium text-muted-foreground">Nome</th>
            <th className="h-10 px-4 text-left font-medium text-muted-foreground">Email</th>
          </tr>
        </thead>
        <tbody />
      </table>
    ),
  },
}
