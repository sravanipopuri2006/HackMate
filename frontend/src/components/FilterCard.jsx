
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/roleSlice'

const filterData = [
  {
    filterType: "Experience Level",
    array:["Beginner","Intermediate","Advanced"]
  },{
    filterType:"Role",
    array:["Frontend Developer","Back End Developer","Full Stack Developer","ML Engineer","UI/UX Designer","API Integration Specialist","Data Engineer"]

  },{
    filterType:"Technical Events",
    array:["Hackathon","Symphosium","Technical conference","Paper Presentation"]

  }
]

export const FilterCard = () => {
  const dispatch=useDispatch();
  const [selectedValue,setSelectedValue]=useState("");
  const changeHandler=(value)=>{
    setSelectedValue(value);

  }
  useEffect(()=>{
    dispatch(setSearchedQuery(selectedValue));
    
  },[selectedValue]);
  return (
    <div className='w-full bg-white p-3 pl-0 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Events</h1>
      <hr className='mt-3'/>
      <RadioGroup onValueChange={changeHandler} value={selectedValue}>
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,idx)=>{
                  const itemId=`id${index}-${idx}`;
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item} id={itemId}/>
                      <Label htmlFor={itemId}>{item}</Label>

                    </div>

                  )
                })
              }
            </div>
          ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard