import React from 'react'
import ReactDOM from 'react-dom/client'
import '@unocss/reset/tailwind.css'
import 'virtual:uno.css'
import { RouterProvider } from 'react-router-dom'
import { createRouter, store } from './router.tsx'
import { Provider } from 'react-redux'

const router = createRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)
