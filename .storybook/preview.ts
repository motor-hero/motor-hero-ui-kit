import type { Preview } from "@storybook/react"
import "../src/styles.css"

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "dark",
      values: [
        { name: "dark", value: "hsl(240 10% 3.9%)" },
        { name: "light", value: "hsl(0 0% 100%)" },
      ],
    },
  },
}

export default preview
