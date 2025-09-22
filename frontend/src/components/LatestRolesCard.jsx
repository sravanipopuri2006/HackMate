import React from 'react'
import { Badge } from './ui/badge'

export default function LatestRolesCard({role}) {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
        <h1 className='font-medium text-lg'>{role?.hackTeam?.name}</h1>
        <p className='text-sm text-gray-500'>Saveetha Engineering College</p>

        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>{role?.title}</h1>
            <p className='text-sm text-gray-600'>{role?.description}</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'>Positions: {role?.position}</Badge>
            <Badge className='text-[#F83002] 700 font-bold' variant='ghost'>{role?.experienceLevel}</Badge>
            <Badge className='text-[#7209b7] 700 font-bold' variant='ghost'>{role?.hackathonName}</Badge>


        </div>


        
    </div>
  )
}
