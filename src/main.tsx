import React from 'react'
import ReactDOM from 'react-dom/client'
import 'virtual:uno.css'
import { RouterProvider } from 'react-router-dom'
import { createRouter } from './router.tsx'

const router = createRouter()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
