import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table'
import { Badge } from './ui/badge'
import { useSelector } from 'react-redux'

const RegisteredTeamsTable = () => {
    const { allAppliedRoles } = useSelector(store => store.role);

    return (
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
                    {allAppliedRoles?.length <= 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center py-4 text-gray-500">
                                You haven't applied to any Teams yet.
                            </TableCell>
                        </TableRow>
                    ) : (
                        allAppliedRoles?.map((appliedRole) => (
                            <TableRow key={appliedRole._id}>
                                <TableCell>{appliedRole?.createdAt.split("T")[0]}</TableCell>
                                <TableCell>{appliedRole.role?.title}</TableCell>
                                <TableCell>{appliedRole.role?.hackTeamId?.name}</TableCell>
                                <TableCell className="text-right">
                                    <Badge className={`${appliedRole?.status=== "rejected" ? 'bg-red-400': appliedRole?.status==="pending"?"bg-gray-400":"bg-green-400"}`}>{appliedRole.status.toUpperCase()}</Badge>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default RegisteredTeamsTable;
