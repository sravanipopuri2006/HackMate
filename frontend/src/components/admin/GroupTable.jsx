import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/table'

import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal, Edit2 } from 'lucide-react'

const GroupTable = () => {
    return (
        <div>
            <Table>
                <TableCaption>A list of your recently registered Teams</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Logo</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>

                    <TableRow>
                        <TableCell>
                            <Avatar >   
                                <AvatarImage
                                    src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                                    className="object-contain w-12 h-12"   
                                />
                            </Avatar>
                        </TableCell>
                        <TableCell>Team Name</TableCell>
                        <TableCell>26.09.2025</TableCell>
                        <TableCell className="text-right cursor-pointer">
                            <Popover>
                                <PopoverTrigger><MoreHorizontal/></PopoverTrigger>
                                <PopoverContent className='w-32'>
                                    <div className="flex items-center justify-button my-5">
                                        <Edit2 className='w-4'/>
                                        <span>Edit</span>
                                    </div>

                                </PopoverContent>
                            </Popover>
                        </TableCell>

                    </TableRow>


                </TableBody>
            </Table>
        </div>
    )
}

export default GroupTable