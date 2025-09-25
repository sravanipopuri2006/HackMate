import { useState } from 'react'

import Navbar from './components/shared/Navbar'
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import Home from './components/Home'
import Teams from './components/Teams'
import Browse from './components/Browse'
import Profile from './components/Profile'
import TeamsDescription from './components/TeamsDescription'
const appRouter=createBrowserRouter([{
  path:'/',
  element:<Home/>
},{
  path:'/login',
  element:<Login/>
},{
  path:'/signup',
  element:<Signup/>
},{
  path:'/teams',
  element:<Teams/>
},
{
  path:'/description/:id',
  element:<TeamsDescription/>
},
{
  path:'/browse',
  element:<Browse/>
},{
  path:'/profile',
  element:<Profile/>
},
{
  path:"/admin/XXXX",
  element:<XXXX/>
}
])

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={appRouter}/>


    </>
  )
}

export default App
