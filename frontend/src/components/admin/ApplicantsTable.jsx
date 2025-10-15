import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';


const shortListingStatus = ["Accepted", "Rejected"];
export const ApplicantsTable = () => {
   
  const { applicants } = useSelector(store => store.application);
  const statusHandler=async(status,id)=>{
    try{
      console.log("called--");
      axios.defaults.withCredentials=true;
      const res=await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`,{status});
      console.log("Executed....");
      console.log(res);
      if(res.data.succes){
     
        toast.success(res.data.message||"Staus Updated successfully");
      }
    }
    catch(error){
      toast.error(error.response.data.message);
    }
  }
  
  return (
    <div>
      <Table>
        <TableCaption>A list Your recent Applied Students</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className='text-right'>Action</TableHead>

          </TableRow>
        </TableHeader>

        <TableBody>
          {
            applicants && applicants?.applications?.map((item) => (
              <tr key={item._id}>
                <TableCell>{item?.hackApplicant?.fullname}</TableCell>
                <TableCell>{item?.hackApplicant?.email}</TableCell>
                <TableCell>{item?.hackApplicant?.phoneNumber}</TableCell>
                <TableCell className='text-blue-600 cursor-pointer'>{item?.hackApplicant?.profile?.resume?<a href={item.hackApplicant?.profile?.resume} target="_blank" rel="noopener noreferrer">{item.hackApplicant?.profile?.resumeOriginalName}</a>:<span>N/A</span>}</TableCell>
                <TableCell>{item.hackApplicant.createdAt.split("T")[0]}</TableCell>
                <TableCell className='float-right cursor-pointer'>
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className='w-32'>
                      {
                        shortListingStatus.map((status, index) => {
                          return (
                            <div onClick={()=>statusHandler(status,item?._id)} key={index} className='flex w-fit items-center my-2 cursor-pointer'>
                              <span>{status}</span>
                            </div>
                          )
                        })
                      }

                    </PopoverContent>
                  </Popover>

                </TableCell>
              </tr>


            )

            )
          }

        </TableBody>


      </Table>
    </div>
  )
}