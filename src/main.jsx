import { StrictMode } from 'react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { store } from './Redux/store.js';
import { Provider } from 'react-redux'
import { RecoilRoot } from 'recoil'


createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RecoilRoot>
      <Provider store={store}>
        <App />
      </Provider>

    </RecoilRoot>

  </React.StrictMode>,
)
