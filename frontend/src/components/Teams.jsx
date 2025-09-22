import React from 'react'
import Navbar from './shared/Navbar'
import { FilterCard } from './FilterCard'
import { Team } from './Team'
import { useSelector } from 'react-redux';


export default function Teams() {
  const {allRoles}=useSelector(store=>store.role);
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
          <FilterCard />
          </div>
          {
            allRoles.length <= 0 ? <span>Teams Not Found</span> : (
              <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    allRoles.map((role) => (
                      <div key={role._id}>
                        <Team role={role}/>
                      </div>

                    ))

                  }

                </div>



              </div>

            )


          }
        </div>
      </div>

    </div>
  )
}
