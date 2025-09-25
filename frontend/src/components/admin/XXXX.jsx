import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import XXXXTable from './XXXXTable'

const XXXX = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className = 'flex justify-between items-center my-5'>
           <Input
              className = "w-fit"
              placeholder = "Filter by name"/>
           <Button>New XXXX</Button>
        </div>
        <XXXXTable/>
      </div>
    </div>
  )
}

export default XXXX