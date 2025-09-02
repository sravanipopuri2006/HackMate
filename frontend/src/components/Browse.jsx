import React from 'react'
import Navbar from './shared/Navbar';
import Team from './Team';


const randomTeams = [1,2,3,4,5,6,7];
export default function Browse() {
  return (
    <div>
      <Navbar/>
      <div className='max-w-7xl mx-auto my-10'>
        <h1 className='font-bold text-xl my-10'>Search Results ({randomTeams.length})</h1>
        <div className='grid grid-cols-3 gap-4'>
        {
          randomTeams.map((item,index)=>{
            return(
              <Team/>
            )
          })
        }
        </div>
      </div>
    </div>
  )
}
