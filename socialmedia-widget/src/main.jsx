import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css' // This will now include Tailwind
import { ThemeProvider } from './theme/ThemeContext'
import { ThemeDemo} from './components/ThemeDemo'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ThemeDemo />
    </ThemeProvider>
  </StrictMode>,
)
