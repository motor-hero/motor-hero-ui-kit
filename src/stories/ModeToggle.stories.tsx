import type { Meta, StoryObj } from "@storybook/react"
import { ModeToggle } from "../components/mode-toggle"
import { ThemeProvider } from "../components/theme-provider"

const meta: Meta<typeof ModeToggle> = {
  title: "Components/ModeToggle",
  component: ModeToggle,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ThemeProvider defaultTheme="dark" storageKey="storybook-theme">
        <Story />
      </ThemeProvider>
    ),
  ],
}

export default meta
type Story = StoryObj<typeof ModeToggle>

export const Default: Story = {}
