import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { CookiesProvider } from 'react-cookie'
import App from './App/App'
import store from './App/store'

const root = createRoot(document.getElementById('app'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CookiesProvider defaultSetOptions={{ path: '/' }}>
        <App />
      </CookiesProvider>
    </Provider>
  </React.StrictMode>
)
