import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import "../app/globals.css"
import { SpeedInsights } from "@vercel/speed-insights/next"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <SpeedInsights />
  </React.StrictMode>,
)
