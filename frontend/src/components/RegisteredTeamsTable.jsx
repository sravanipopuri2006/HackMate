import { Table } from 'lucide-react'
import React from 'react'
import { TableBody, TableHead } from './ui/table'

const RegisteredTeamsTable = () => {
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
                        [1,2,3,4].map((item,index)=>(
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