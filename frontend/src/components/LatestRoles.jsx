import React from 'react'
import LatestRolesCard from './LatestRolesCard';
import { useSelector } from 'react-redux';
import useGetAllRoles from '@/hooks/useGetAllRoles';

export default function LatestRoles() {

  useGetAllRoles();

  const { allRoles } = useSelector(store => store.role);

  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'>
          <span className='text-[#6A38C2]'>Discover Fresh</span> Opportunities
        </h1>

        <div className='grid grid-cols-3 gap-4 my-5'>
            {
              allRoles?.length <= 0 
              ? <span>No Role Available</span> 
              : allRoles?.slice(0,6).map((role) => (
                  <LatestRolesCard key={role._id} role={role} />
                ))
            }
        </div>
    </div>
  )
}
