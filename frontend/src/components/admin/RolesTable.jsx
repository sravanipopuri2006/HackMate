import React, { useEffect, useState } from 'react'
import { TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow, Table } from '../ui/table'

import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { MoreHorizontal, Edit2, Eye } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'




const RolesTable = () => {

    

    

    const {allAdminRoles,searchRoleByText}=useSelector(store=>store.role);
    const [filterRole, setFilterRole] = useState(allAdminRoles);
    const navigate = useNavigate();
    useEffect(() => {
        const filteredTeam = allAdminRoles.length >= 0 && allAdminRoles.filter((role) => {
            if (!searchRoleByText) {
                return true;
            };
            return role?.name?.toLowerCase().includes(searchRoleByText.toLowerCase())||role?.hackathonName?.toLowerCase().includes(searchRoleByText.toLowerCase())||role?.title?.toLowerCase().includes(searchRoleByText.toLowerCase());
        });
        setFilterRole(filteredTeam);



    }, [allAdminRoles, searchRoleByText])


   
    return (
        <>
            <Table>
                <TableCaption>A list of your recently Posted Roles For Hackathons</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Hackathon Name</TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className='text-right'>Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterRole.length <= 0 ?
                            <TableRow>
                                <TableCell colSpan={4} className="text-center">
                                    You Haven't registered any teams Yet
                                </TableCell></TableRow> : (
                                <>
                                    {
                                        filterRole?.map((team) => {
                                            return (

                                                <>
                                                    <TableRow key={team._id}>
                                                        <TableCell>
                                                            {team.hackathonName}
                                                        </TableCell>

                                                        
                                                        <TableCell>{team.hackTeamId?.name}</TableCell>
                                                        <TableCell>{team.title}</TableCell>
                                                        <TableCell>{team.createdAt.split("T")[0]}</TableCell>
                                                        <TableCell className="text-right cursor-pointer">
                                                            <Popover>
                                                                <PopoverTrigger>
                                                                    <MoreHorizontal className="cursor-pointer" />
                                                                </PopoverTrigger>
                                                                <PopoverContent
                                                                    className="w-40 p-2 bg-white rounded-lg shadow-md border border-gray-200"
                                                                    side="bottom"
                                                                    align="end"
                                                                >  
                                                                    <div
                                                                        onClick={() => navigate(`/admin/hackteam/${team._id}`)}
                                                                        className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-gray-100 cursor-pointer transition"
                                                                    >
                                                                        <Edit2 className="w-4 h-4 text-gray-600" />
                                                                        <span className="text-sm text-gray-700">Edit Team</span>
                                                                    </div>
                                                                    <div onClick={()=>navigate(`/admin/role/${team._id}/applicants`)} className='flex items-center w-fit gap-2 cursor-pointer mt-2'>
                                                                        <Eye className="w-4 h-4 text-gray-600"/>
                                                                        <span>Applicants</span>


                                                                    </div>

                                                                </PopoverContent>
                                                            </Popover>




                                                        </TableCell>

                                                    </TableRow>

                                                </>

                                            )
                                        })
                                    }



                                </>

                            )
                    }



                </TableBody>
            </Table>
        </>
    )
}

export default RolesTable