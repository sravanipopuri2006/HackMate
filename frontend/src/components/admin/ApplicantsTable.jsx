
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux';
const shortListingStatus=["Accepted","Rejected"];
export const ApplicantsTable = () => {
  const {applicants}=useSelector(store=>store.application);
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
                    applicants && applicants?.applications?.map((item)=>(
                    <tr>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Contact</TableCell>
                    <TableCell>Resume</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell className='float-right cursor-pointer'>
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal/>
                        </PopoverTrigger>
                        <PopoverContent className='w-32'>
                          {
                            shortListingStatus.map((status,index)=>{
                              return(
                                <div key={index} className='flex w-fit items-center my-2 cursor-pointer'>
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
