import "./index.css"
import ReactDOM from "react-dom/client"
import { ThemeProvider } from "@motor-hero/ui-kit"
import App from "./App"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <ThemeProvider defaultTheme="dark">
    <App />
  </ThemeProvider>
)
