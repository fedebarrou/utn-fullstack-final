import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterApp } from './router/RouterApp.jsx'
import './index.css'
import { ChatProvider } from './context/ChatContext.jsx'
import { ThemeProvider } from "./context/ThemeContext";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatProvider>
      <ThemeProvider>
        <RouterApp />
      </ThemeProvider>
    </ChatProvider>
  </StrictMode>,
)
