import { useState } from 'react'

import Navbar from './components/shared/Navbar'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Login } from './components/auth/Login'
import { Signup } from './components/auth/Signup'
import Home from './components/Home'
import Teams from './components/Teams'
import Browse from './components/Browse'
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
},{
  path:'browse',
  element:<Browse/>
}])



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <RouterProvider router={appRouter}/>


    </>
  )
}

export default App
