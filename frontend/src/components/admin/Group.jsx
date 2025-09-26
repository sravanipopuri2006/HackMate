import React from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import GroupTable from './GroupTable'

const Group = () => {
  return (
    <div>
      <Navbar/>
      <div className='max-w-6xl mx-auto my-10'>
        <div className = 'flex justify-between items-center my-5'>
           <Input
              className = "w-fit"
              placeholder = "Filter by name"/>
           <Button>New Team</Button>
        </div>
        <GroupTable/>
      </div>
    </div>
  )
}

export default Group;