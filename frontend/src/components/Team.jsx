import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'

export const Team = () => {
  return (
    <div className='w-full max-w-lg p-5 rounded-md shadow-xl bg-white border border-gray-100 overflow-x-hidden'>
      {/* Top Row */}
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>2 days ago</p>
        <Button variant="outline" className='rounded-full' size="icon">
          <Bookmark />
        </Button>
      </div>

      {/* Team Info */}
      <div className='flex items-center gap-3 my-3'>
        <Avatar className="w-12 h-12">
          <AvatarImage
            src='https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg'
            className="object-cover"
          />
        </Avatar>
        <div>
          <h1 className='font-medium text-lg'>Team Name</h1>
          <p className='text-sm text-gray-500'>Saveetha Engineering College</p>
        </div>
      </div>

      {/* Project Info */}
      <div>
        <h1 className='font-bold text-lg my-2'>Title</h1>
        <p className='text-sm text-gray-600 break-words'>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Earum magnam,
          deserunt enim eligendi fuga commodi porro, non corrupti magni ipsam iure
          assumenda soluta asperiores, beatae ipsa? Nobis dolores officia veritatis?
        </p>
      </div>

      {/* Tags */}
      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant='ghost'>2 positions</Badge>
        <Badge className='text-[#F83002] font-bold' variant='ghost'>Smart India Hackathon</Badge>
        <Badge className='text-[#7209b7] font-bold' variant='ghost'>Intermediate</Badge>
      </div>

      {/* Actions */}
      <div className='flex flex-wrap items-center gap-4 mt-4'>
        <Button variant='outline'>Details</Button>
        <Button className="bg-[#7209b7] text-white">Save for Later</Button>
      </div>
    </div>
  )
}

export default Team
