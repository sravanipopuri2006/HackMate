
import React from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'

const filterData = [
  {
    filterType: "Experience Level",
    array:["Beginner","Intermediate","Advanced"]
  },{
    filterType:"Role",
    array:["Frontend Developer","Backend Developer","Full Stack Developer","ML Enginner","UI/UX Designer","API Integration Specialist","Data Engineer"]

  },{
    filterType:"Technical Events",
    array:["Hackathon","Symphosium","Technical conference","Paper Presentation"]

  }
]
export const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 pl-0 rounded-md'>
      <h1 className='font-bold text-lg'>Filter Events</h1>
      <hr className='mt-3'/>
      <RadioGroup>
        {
          filterData.map((data,index)=>(
            <div>
              <h1 className='font-bold text-lg'>{data.filterType}</h1>
              {
                data.array.map((item,index)=>{
                  return (
                    <div className='flex items-center space-x-2 my-2'>
                      <RadioGroupItem value={item}/>
                      <Label>{item}</Label>

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