import React from 'react'
import { Button } from './ui/button'
import { Bookmark } from 'lucide-react'
import { Badge } from './ui/badge'
import { Avatar, AvatarImage } from './ui/avatar'
import { useNavigate } from 'react-router-dom'

export const Team = ({role}) => {
  const navigate = useNavigate(); 
  const teamId = "dnvfdyugeryf"; 
  const getTime=(mongoTime)=>{
    const createdAt=new Date(mongoTime);
    const currentTime=new Date();
    const timeDifference=currentTime-createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));

  }
  return (
    <div className='w-full max-w-lg p-5 rounded-md shadow-xl bg-white border border-gray-100 overflow-x-hidden'>
      {/* Top Row */}
      <div className='flex items-center justify-between'>
        <p className='text-sm text-gray-500'>{getTime(role?.createdAt)==0?"Today":`${getTime(role?.createdAt)} days ago`}</p>
        <Button variant="outline" className='rounded-full' size="icon">
          <Bookmark />
        </Button>
      </div>

   
      <div className='flex items-center gap-3 my-3'>
        <Avatar className="w-12 h-12">
          <AvatarImage
            src={role?.hackTeamId?.logo}
            className="object-cover"
          />
        </Avatar>
        <div>
          <h1 className='font-medium text-lg'>{role?.hackTeamId?.name}</h1>
          <p className='text-sm text-gray-500'>Saveetha Engineering College</p>
        </div>
      </div>

    
      <div>
        <h1 className='font-bold text-lg my-2'>{role?.title}</h1>
        <p className='text-sm text-gray-600 break-words'>
          {role?.description}
        </p>
      </div>

      <div className='flex flex-wrap items-center gap-2 mt-4'>
        <Badge className='text-blue-700 font-bold' variant='ghost'>Position: {role?.position}</Badge>
        <Badge className='text-[#F83002] font-bold' variant='ghost'>{role?.hackathonName}</Badge>
        <Badge className='text-[#7209b7] font-bold' variant='ghost'>{role?.experienceLevel}</Badge>
      </div>


      <div className='flex flex-wrap items-center gap-4 mt-4'>
        <Button onClick={()=>navigate(`/description/${role._id}`)} variant='outline'>Details</Button>
        <Button className="bg-[#7209b7] text-white">Save for Later</Button>
      </div>
    </div>
  )
}

export default Team
