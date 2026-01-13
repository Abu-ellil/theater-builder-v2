import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import TheaterSeating from './TheaterSeating.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <TheaterSeating/>
  </StrictMode>,
)
