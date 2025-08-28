import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const Login = () => {
  const [input, setInput] = useState({
   
    email:"",
   
    password:"",
    role:"",

  });

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  }

 
   const submitHandler = async(e) => {
    e.preventDefault();
    console.log(input);
  }

  return (
    <div>
        <Navbar/>
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Login</h1>
            
            <div className='my-2'>
                <Label>Email</Label>
                <Input type="email" value={input.email} name="email" onChange = {changeEventHandler} placeholder="Enter your Email" className='my-2'></Input>


            </div>
           
            <div className='my-2'>
                <Label>Password</Label>

                <Input type="password" value = {input.password} name = "password" onChange = {changeEventHandler} placeholder="Enter your password" className='my-2'></Input>


            </div>
            <div className='flex items-center justify-between'>
            <RadioGroup className='flex items-center gap-4 my-5'>
              <div className="flex items-center space-x-2">
                <input type="radio" name='role' value='hackLead' checked={input.role == 'hackLead'} onChange={changeEventHandler} className='cursor-pointer' />
                <Label htmlFor="r1">Hack Lead</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input type="radio" name='role' value='hackApplicant' checked={input.role == 'hackApplicant'} onChange={changeEventHandler} className='cursor-pointer' />

                <Label htmlFor="r2">Hack Applicant</Label>
              </div>
            </RadioGroup>
              



            </div>
            <Button type="submit" className='w-full my-4 cursor-pointer'>Login</Button>
            <span className='text-sm'>Don't have an account? <Link to="/signup" className='text-blue-600'>Sign up</Link></span>
        </form>
    </div>
    </div>
  )
}

