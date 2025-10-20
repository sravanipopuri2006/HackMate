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
import Group from './components/admin/Group'
import GroupCreate from './components/admin/GroupCreate'
import GroupSetup from './components/admin/GroupSetup'
import Roles from './components/admin/Roles'
import PostRole from './components/admin/PostRole'
import { Applicants } from './components/admin/Applicants'
import ProtectedRoute from './components/admin/ProtectedRoute'
import  Hackathons  from './components/Hackathons'
import UpdateHackathon from './components/UpdateHackathon'
import CreateHackathon from './components/CreateHackathon'
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
  path:"/admin/hackteam",
  element:<ProtectedRoute><Group/></ProtectedRoute>
},
{
  path:"/admin/hackteam/create",
  element:<GroupCreate/>
},{
  path:"/admin/hackteam/:id",
  element:<GroupSetup/>
},{
  path:"/admin/role",
  element:<Roles/>
},{
  path:"/admin/role/post",
  element:<PostRole/>
},
  {
  path:"/admin/role/:id/applicants",
  element:<Applicants/>
},
{
  path:"/hackathons",
  element:<Hackathons/>
},{
  path:"hackathons/edit/:id",
  element:<UpdateHackathon/>
},{
  path:"/create",
  element:<CreateHackathon/>
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
