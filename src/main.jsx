import { StrictMode } from 'react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store.js';
import { Provider } from 'react-redux'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>

    <Provider store={store}>
      <App />
    </Provider>


  </React.StrictMode>,
)
