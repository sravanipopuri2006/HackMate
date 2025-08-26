import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
      <div className='bg-white'>
          <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
              <div>
                  <h1 className='text-2xl font-bold'>Hack<span className='text-[#F83002]'>Mate</span></h1>
              </div>
              <div>
                  <ul className='flex font-medium items-center gap-5'>
                      <li>Home</li>
                      <li>Teams</li>
                      <li>Hackathons</li>
                      <li>Browse</li>
                  </ul>
              </div>

          </div>


      </div>
  )
}

export default Navbar