import React, { useEffect } from 'react'
import Navbar from './shared/Navbar';
import Team from './Team';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/roleSlice';
import useGetAllRoles from '@/hooks/useGetAllRoles';
import useGetAllTeams from '@/hooks/useGetAllTeams';



export default function Browse() {
  useGetAllRoles();
  const {allRoles}=useSelector(store=>store.role);
  const dispatch=useDispatch();
  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
    }
  },[]);

  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({allRoles.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
        {
          allRoles.map((role)=>{
            return(
              <Team  key={role._id} role={role}/>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}
