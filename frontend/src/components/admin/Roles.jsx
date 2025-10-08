import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'

import { useNavigate } from 'react-router-dom'

import { useDispatch } from 'react-redux'
import { setSearchRoleByText } from '@/redux/roleSlice'
import RolesTable from './RolesTable'
import useGetAllAdminRoles from '@/hooks/useGetAllAdminRoles'

const Roles = () => {
  useGetAllAdminRoles();
  const[input,setInput]=useState("");
  const navigate = useNavigate();
  const dispatch=useDispatch();

  useEffect(()=>{
    dispatch(setSearchRoleByText(input));

  },[input]);

  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className = 'flex justify-between items-center my-5'>
           <Input
              className = "w-fit"
              placeholder = "Filter by name,role" onChange={(e)=>setInput(e.target.value)}/>
           <Button onClick={()=>navigate("/admin/role/post")}>📢 Announce Team</Button>
        </div>
        <RolesTable/>
      </div>
    </div>
  )
}

export default Roles;

