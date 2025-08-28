import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const Signup = () => {
  return (
    <div>
        <Navbar/>
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Sign up</h1>
            <div className='my-2'>
                <Label>Full Name</Label>
                <Input type="text" placeholder="Enter Your Name" className='my-2'></Input>


            </div>
            <div className='my-2'>
                <Label>Email</Label>
                <Input type="email" placeholder="Enter your Email" className='my-2'></Input>


            </div>
            <div className='my-2'>
                <Label>Phone Number</Label>
                <Input type="text" placeholder="Enter your Phone Number" className='my-2'></Input>


            </div>
            <div className='my-2'>
                <Label>Password</Label>
                <Input type="password" placeholder="Enter your password" className='my-2'></Input>


            </div>
            <div className='flex items-center justify-between'>
               <RadioGroup className='flex items-center gap-4 my-5'>
                <div className="flex items-center space-x-2">
                    <input type="radio" name='role' value='hackLead' className='cursor-pointer'/>
                    <Label htmlFor="r1">Hack Lead</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="radio" name='role' value='hackApplicant' className='cursor-pointer'/>
                    
                    <Label htmlFor="r2">Hack Applicant</Label>
                </div>
                </RadioGroup>
                <div>
                    <Label className='my-2'>Profile</Label>
                    <Input accept="image/*" type="file" className="cursor-pointer"/>
                </div>



            </div>
            <Button type="submit" className='w-full my-4 cursor-pointer'>Signup</Button>
            <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
    </div>
    </div>
  )
}
