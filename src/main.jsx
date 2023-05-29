import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Home from './routes/Home'
import Account from './routes/Account'
import Room from './routes/Room'


const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/account',
    element: <Account />
  },
  {
    path: '/room/:roomId',
    element: <Room />
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
