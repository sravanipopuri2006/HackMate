import React, { useEffect, useState } from 'react'
import Navbar from './shared/Navbar'
import { FilterCard } from './FilterCard'
import { Team } from './Team'
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';


export default function Teams() {
  const {allRoles,searchedQuery}=useSelector(store=>store.role);
  const [filterRoles,setFilterRoles]=useState(allRoles);
  useEffect(() => {
  const query = searchedQuery?.trim().toLowerCase() || '';

  if (query) {
    const filteredRoles = allRoles.filter((role) => {
      const title = role?.title?.toLowerCase() || '';
      const description = role?.description?.toLowerCase() || '';
      const hackathonType = role?.hackathonType?.toLowerCase() || '';
      const experienceLevel = role?.experienceLevel?.toLowerCase() || ''; 

      return (
        title.includes(query) ||
        description.includes(query) ||
        hackathonType.includes(query) ||
        experienceLevel.includes(query) 
      );
    });

    setFilterRoles(filteredRoles);
  } else {
    setFilterRoles(allRoles);
  }
}, [allRoles, searchedQuery]);

  return (
    <div>
      <Navbar />
      <div className='max-w-7xl mx-auto mt-5'>
        <div className='flex gap-5'>
          <div className='w-20%'>
          <FilterCard />
          </div>
          {
            filterRoles?.length <= 0 ? <span>Teams Not Found</span> : (
              <div className='flex-1 h-[80vh] overflow-y-auto pb-5'>
                <div className='grid grid-cols-3 gap-4'>
                  {
                    filterRoles?.map((role) => (
                     <motion.div 
                        initial = {{opacity:0, x:100}}
                        animate = {{opacity:1, x:0}}
                        exit = {{opacity:0, x:-100}}
                        transition={{duration:0.3}}
                        key={role?._id}>
                        <Team role={role}/>
                      </motion.div>
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
