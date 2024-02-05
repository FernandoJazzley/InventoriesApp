import React from 'react'
import ReactDOM from 'react-dom/client'
import { InventoriesApp } from './InventoriesApp.jsx'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './store'
import './styles.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <Provider store={store}>
        <HashRouter>
          <InventoriesApp />
        </HashRouter>
      </Provider>
  </React.StrictMode>,
)
