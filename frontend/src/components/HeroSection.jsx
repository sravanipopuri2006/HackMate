import React from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'

export default function HeroSection() {
  return (
    <div className='text-center'>
      <div className='flex flex-col gap-5 my-10'>
        <span className='mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium'>One platform. Endless hackathon opportunities.</span>
        <h1 className='text-5xl font-bold'>Ready to hack the future? <br/> Start by finding your <span className='text-[#6A38C2]'>Crew.</span></h1>
        <p>Great ideas deserve great teams – connect with skilled people, build together, and win hackathons through collaboration.</p>
        <div className='flex w-[40%] shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-4 mx-auto'>
          <input 
          type="text"
          placeholder="Find your hackathon crew"
          className='outline-none border-npone w-full'
           />
           <Button className="rounded-r-full bg-[#6A38C2]">
            <Search className='h-5 w-5'/>
           </Button>
        </div>
      </div>
    </div>
  )
}
