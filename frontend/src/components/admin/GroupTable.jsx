import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Avatar, AvatarImage } from "../ui/avatar"; // ✅ use shadcn/ui avatar
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal, Edit2 } from "lucide-react";
import { useSelector } from "react-redux";

const GroupTable = () => {

const teams = useSelector((state) => state.hackteam?.teams || []);

  return (
    <div>
      <Table>
        <TableCaption>A list of your recently registered Teams</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Logo</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {teams.length <= 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You haven’t registered any team yet
              </TableCell>
            </TableRow>
          ) : (
            teams.map((team) => (
              <TableRow key={team._id}>
                <TableCell>
                  <Avatar>
                    <AvatarImage
                      src=
                       
                        "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                      
                      className="object-contain w-12 h-12"
                    />
                  </Avatar>
                </TableCell>
                <TableCell>Pheonix</TableCell>
                <TableCell>
                28.09.2025
                </TableCell>
                <TableCell className="text-right cursor-pointer">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-32">
                      <div className="flex items-center gap-2 cursor-pointer hover:text-blue-600">
                        <Edit2 className="w-4" />
                        <span>Edit</span>
                      </div>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default GroupTable;

