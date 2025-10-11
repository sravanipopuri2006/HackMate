import React from 'react'
import LatestRolesCard from './LatestRolesCard';
import { useSelector } from 'react-redux';


export default function LatestRoles() {
    const randomRoles=[1,2,3,4,5,6,7,8];
    const allRoles = useSelector((store) => store.role?.allRoles) || [];

  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Discover Fresh</span> Opportunities</h1>
        <div className='grid grid-cols-3 gap-4 my-5'>
            {
              allRoles.length <= 0 ? <span>No Role Available</span> : allRoles?.slice(0,6).map((role) => <LatestRolesCard key = {role._id} role = {role}/>)
            }

        </div>


    </div>
  )
}
