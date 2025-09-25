import React from 'react'
import { TableHead, TableHeader, TableRow } from '../ui/table'
import { Table } from 'lucide-react'
import { Avatar } from '@radix-ui/react-avatar'

const XXXXTable = () => {
    return (
        <div>
        <Table>
            <TableCaption>A list of your recently registered XXXX</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead>Logo</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody> 
                <TableCell>
                    <Avatar>
                        <AvatarImage src=""/>
                    </Avatar>
                </TableCell>

            </TableBody>
        </Table>
        </div>
    )
}

export default XXXXTable