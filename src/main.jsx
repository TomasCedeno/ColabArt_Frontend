import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

import Main from './routes/Main'
import LogIn from './routes/LogIn'
import SignUp from './routes/SignUp'
import Home from './routes/Home'
import Account from './routes/Account'
import Room from './routes/Room'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />
  },
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
  },
  {
    path: '/login',
    element: <LogIn />
  },
  {
    path: '/signup',
    element: <SignUp />
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
