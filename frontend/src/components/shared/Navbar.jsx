import React from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { LogOut, User2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { setUser } from "@/redux/authSlice";





const Navbar = () => {
        const {user} = useSelector(store=>store.auth);
        const dispatch=useDispatch();
        const navigate=useNavigate();
    const logOutHandler=async()=>{
        try{
            const res=await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true});
            if(res.data.success){
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        }
        catch(error){
            console.log(error);
            toast.error(error.response.data.message);
        }



    }

  return (

      <div className='bg-white'>
          <div className='flex items-center justify-between mx-auto max-w-7xl h-16'>
              <div>
                  <h1 className='text-2xl font-bold'>Hack<span className='text-[#F83002]'>Mate</span></h1>
              </div>
              <div className='flex items-center gap-12'>
                  <ul className='flex font-medium items-center gap-5'>
                    {
                        user && user.role == 'hackLead' ? (
                            <>
                            <li><Link to='/admin/hackteam'>Teams</Link></li>
                            <li><Link to="/hackathons">Hackathons</Link></li>

                            <li><Link to="/admin/role">Roles</Link></li>
                            </>
                        ) : (
                            <>
                            <li><Link to='/'>Home</Link></li>
                            <li><Link to='/teams'>Teams</Link></li>
                            <li><Link to="/hackathons">Hackathons</Link></li>
                            <li><Link to='/browse'>Browse</Link></li>
                            </>
                        )
                    }
                
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
                                      <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />
                                      <AvatarFallback>CN</AvatarFallback>
                                  </Avatar>

                              </PopoverTrigger>

                              <PopoverContent className='w-80'>
                                  <div>
                                      <div className='flex gap-4 space-y-2'>
                                          <Avatar className="cursor-pointer">
                                              <AvatarImage src={user?.profile?.profilePhoto} alt="@shadcn" />

                                          </Avatar>
                                          <div>
                                              <h4 className='font-medium'>{user?.fullname}</h4>
                                              <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                          </div>
                                      </div>
                                      <div className='flex flex-col gap-3 text-gray-600 my-2'>
                                        {
                                            user && user.role == 'hackApplicant' && (
                                              <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                              <User2 />
                                              <Button variant="link"> <Link to="/profile">View Profile</Link></Button>
                                          </div>
                                            )
                                        }
                                          <div className='flex w-fit items-center gap-2 cursor-pointer'>


                                              <LogOut  />
                                              <Button variant="link" onClick={logOutHandler} className='cursor-pointer'>Logout</Button>
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