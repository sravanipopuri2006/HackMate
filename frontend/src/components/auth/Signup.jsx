import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup, RadioGroupItem } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link } from 'react-router-dom'

export const Signup = () => {
      const [input, setInput] = useState({
    fullname : "",
    email:"",
    phoneNumber:"",
    password:"",
    role:"",
    file:""
  });

  const changeEventHandler = (e) => {
    setInput({...input, [e.target.name]:e.target.value});
  }

  const changeFileHandler = (e) => {
    setInput({...input, file:e.target.files?.[0]});
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    
    formData.append('fullname', input.fullname);
    formData.append('email', input.email);
    formData.append('phoneNumber', input.phoneNumber);
    formData.append('password', input.password);
    formData.append('role', input.role);
    if (input.file){
        formData.append('file', input.file);
    }
    try{
        const res = await axios.post('${USER_API_END_POINT}/register',formData,{
        headers:{
            "Content-Type" : "multipart/form-data"
        },
        withCredentials:true,
    });
}
    catch(error){
    console.log(error);
  }
}
  return (
    <div>
        <Navbar/>
    <div className='flex items-center justify-center max-w-7xl mx-auto'>
        <form onSubmit={submitHandler} action="" className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
            <h1 className='font-bold text-xl mb-5'>Sign up</h1>
            <div className='my-2'>
                <Label>Full Name</Label>
                <Input type="text" value={input.fullname} name="fullname" onChange= {changeEventHandler} placeholder="Enter Your Name" className='my-2'></Input>


            </div>
            <div className='my-2'>
                <Label>Email</Label>
                <Input type="email" value={input.email} name="email" onChange = {changeEventHandler} placeholder="Enter your Email" className='my-2'></Input>


            </div>
            <div className='my-2'>
                <Label>Phone Number</Label>
                <Input type="text" value = {input.phoneNumber} name = "phoneNumber" onChange = {changeEventHandler} placeholder="Enter your Phone Number" className='my-2'></Input>


            </div>
            <div className='my-2'>
                <Label>Password</Label>
                <Input type="password" value = {input.password} name = "password" onChange = {changeEventHandler} placeholder="Enter your password" className='my-2'></Input>


            </div>
            <div className='flex items-center justify-between'>
               <RadioGroup className='flex items-center gap-4 my-5'>
                <div className="flex items-center space-x-2">
                    <input type="radio" name='role' value='hackLead' checked={input.role=='hackLead'} onChange = {changeEventHandler} className='cursor-pointer'/>
                    <Label htmlFor="r1">Hack Lead</Label>
                </div>
                <div className="flex items-center space-x-2">
                    <input type="radio" name='role' value='hackApplicant' checked={input.role=='hackApplicant'} onChange = {changeEventHandler} className='cursor-pointer'/>
                    
                    <Label htmlFor="r2">Hack Applicant</Label>
                </div>
                </RadioGroup>
                <div>
                    <Label className='my-2'>Profile</Label>
                    <Input accept="image/*" type="file" onChange = {changeFileHandler} className="cursor-pointer"/>
                </div>



            </div>
            <Button type="submit" className='w-full my-4 cursor-pointer'>Signup</Button>
            <span className='text-sm'>Already have an account? <Link to="/login" className='text-blue-600'>Login</Link></span>
        </form>
    </div>
    </div>
  )
}
