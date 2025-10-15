import { Table } from './ui/table'
import React from 'react'
import { TableBody, TableCaption, TableCell, TableHead ,TableHeader, TableRow} from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const RegisteredTeamsTable = () => {
    const {allAppliedRoles}=useSelector(store=>store.role);
    return(
        <div>
            <Table>
                <TableCaption>A list of your registered teams</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Team Name</TableHead>
                        <TableHead className="text-right">Status</TableHead>
                    </TableRow>    
                </TableHeader>
                <TableBody>
                       {
                        allAppliedRoles.length<0?<span>You haven't applied to any Teams yet.</span>:allAppliedRoles.map((item,index)=>(
                            <TableRow key = {index}>
                                <TableCell>01/01/2023</TableCell>
                                <TableCell>Frontend Developer</TableCell>
                                <TableCell>Google</TableCell>
                                <TableCell className="text-right"><Badge>Selected</Badge></TableCell>

                            </TableRow>
                        ))
                       }
                </TableBody>    
            </Table>
        </div>
    )
}
export default RegisteredTeamsTable