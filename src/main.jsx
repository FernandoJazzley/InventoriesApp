import React from 'react'
import ReactDOM from 'react-dom/client'
import { InventoriesApp } from './InventoriesApp.jsx'
import { BrowserRouter } from 'react-router-dom'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <InventoriesApp />
    </BrowserRouter>
  </React.StrictMode>,
)
