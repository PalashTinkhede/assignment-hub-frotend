import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import AppState from './context/AppState.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppState>
    <App />
    </AppState>
  </StrictMode>,
)
