import React from 'react'
import { Badge } from './ui/badge'

export default function LatestTeamsCard() {
  return (
    <div className='p-5 rounded-md shadow-xl bg-white border border-gray-100 cursor-pointer'>
        <div>
        <h1 className='font-medium text-lg'>Team Name</h1>
        <p className='text-sm text-gray-500'>Saveetha Engineering College</p>

        </div>
        <div>
            <h1 className='font-bold text-lg my-2'>Role Title</h1>
            <p className='text-sm text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis laborum molestias dolores aut sint cumque nemo? Ea non tempora accusantium distinctio a obcaecati cumque sunt quam quidem. Aut, debitis at!</p>
        </div>
        <div className='flex items-center gap-2 mt-4'>
            <Badge className='text-blue-700 font-bold' variant='ghost'>2 positions</Badge>
            <Badge className='text-[#F83002] 700 font-bold' variant='ghost'>Smart India Hackathon</Badge>
            <Badge className='text-[#7209b7] 700 font-bold' variant='ghost'>Intermediate</Badge>


        </div>


        
    </div>
  )
}
