import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './routes/Home'
import Account from './routes/Account'


const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/account',
    element: <Account />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
