import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link } from 'react-router-dom'




const Navbar = () => {
    const user=false;
  return (

      <div className='bg-white'>
          <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
              <div>
                  <h1 className='text-2xl font-bold'>Hack<span className='text-[#F83002]'>Mate</span></h1>
              </div>
              <div className='flex items-center gap-12'>
                  <ul className='flex font-medium items-center gap-5'>
                      <li><Link to='/'>Home</Link></li>
                      <li><Link to='/teams'>Teams</Link></li>
                      <li>Hackathons</li>
                      <li>Browse</li>
                  </ul>
                  {
                      !user ? (
                          <div className='flex items-center gap-2'>
                              <Link to="/login"><Button className="cursor-pointer">Login</Button></Link>
                              <Link to="/signup"><Button className='bg-[#6A38C2] hover:bg-[#6A38a2] cursor-pointer'>Signup</Button></Link>
                              

                          </div>

                      ) : (
                          <Popover>
                              <PopoverTrigger asChild>
                                  <Avatar className="cursor-pointer">
                                      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                      <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>

                              </PopoverTrigger>

                              <PopoverContent className='w-80'>
                                  <div>
                                      <div className='flex gap-4 space-y-2'>
                                          <Avatar className="cursor-pointer">
                                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />

                                          </Avatar>
                                          <div>
                                              <h4 className='font-medium'>Dharshini</h4>
                                              <p className='text-sm text-muted-foreground'>Lorem ipsum dolor sit amet consectetur adipisicing </p>
                                          </div>
                                      </div>
                                      <div className='flex flex-col gap-3 text-gray-600 my-2'>
                                          <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                              <User2 />
                                              <Button variant="link">View Profile</Button>
                                          </div>
                                          <div className='flex w-fit items-center gap-2 cursor-pointer'>


                                              <LogOut />
                                              <Button variant="link">Logout</Button>
                                          </div>


                                      </div>
                                  </div>
                              </PopoverContent>
                          </Popover>

                    )

                  }
                  
                          

                  


              </div>

          </div>


      </div>
  )
}

export default Navbar