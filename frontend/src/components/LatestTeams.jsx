import React from 'react'
import LatestTeamsCard from './LatestTeamsCard'

export default function LatestTeams() {
    const randomTeams=[1,2,3,4,5,6,7,8]
  return (
    <div className='max-w-7xl mx-auto my-20'>
        <h1 className='text-4xl font-bold'><span className='text-[#6A38C2]'>Discover Fresh</span> Opportunities</h1>
        <div className='grid grid-cols-3 gap-4 my-5'>
            {
              randomTeams.splice(0,6).map((item,index)=>(
                <LatestTeamsCard/>
              ))
            }

        </div>


    </div>
  )
}
