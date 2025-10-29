import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

// shadcn table
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

// popover
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { MoreHorizontal, Edit2 } from "lucide-react";

const GroupTable = () => {
  const { teams, searchTeamByText } = useSelector((store) => store.hackteam);
  const [filteredTeam, setFilteredTeam] = useState(teams || []);
  const navigate = useNavigate();

  useEffect(() => {
    const f = (teams || []).filter((team) => {
      if (!searchTeamByText) return true;
      return team?.name?.toLowerCase().includes(searchTeamByText.toLowerCase());
    });
    setFilteredTeam(f);
  }, [teams, searchTeamByText]);

  return (
    <div className="w-full overflow-hidden rounded-2xl border border-blue-100/70 bg-white/80 backdrop-blur shadow-[0_10px_30px_rgba(15,70,140,.08)]">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-[#EAF3FF] to-[#DCEEFF]">
            <TableHead className="text-[#0B2C5E] font-semibold">Logo</TableHead>
            <TableHead className="text-[#0B2C5E] font-semibold">Name</TableHead>
            <TableHead className="text-[#0B2C5E] font-semibold">Date</TableHead>
            <TableHead className="text-right text-[#0B2C5E] font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(!filteredTeam || filteredTeam.length === 0) ? (
            <TableRow>
              <TableCell colSpan={4}>
                <div className="my-6 rounded-xl border border-dashed border-blue-200 bg-blue-50/60 p-6 text-center">
                  <p className="font-semibold text-blue-900">No teams yet</p>
                  <p className="text-sm text-blue-900/70">
                    Register a team to get started.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filteredTeam.map((team) => (
              <TableRow
                key={team._id}
                className="
                  group transition-all duration-200 ease-in-out
                  hover:bg-[#F5FAFF]
                  hover:shadow-[0_4px_12px_rgba(15,70,140,0.08)]
                "
              >
                {/* Logo */}
                <TableCell>
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-[#cfe4ff] shadow-sm transition-transform group-hover:scale-[1.02]">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="h-full w-full object-cover"
                    />
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-transparent transition-all duration-300 group-hover:ring-[#1570EF]/25" />
                  </div>
                </TableCell>

                {/* Name */}
                <TableCell className="align-middle">
                  <div className="flex flex-col">
                    <span className="font-semibold text-[#0B2C5E]">
                      {team.name}
                    </span>
                    <span className="text-xs text-[#1f3b6b]/70">
                      Team ID: {team._id.slice(0, 6)}…
                    </span>
                  </div>
                </TableCell>

                {/* Date */}
                <TableCell className="text-blue-900/80">
                  {team.createdAt?.split("T")[0]}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="
                          inline-flex h-9 w-9 items-center justify-center
                          rounded-full border border-blue-100 bg-white
                          text-blue-900/80 shadow-sm
                          transition-all duration-200
                          hover:scale-105 hover:shadow-md
                        "
                        aria-label="Actions"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      side="bottom"
                      align="end"
                      className="
                        z-50 w-48 rounded-xl border border-blue-100
                        bg-white/95 p-2 backdrop-blur
                        shadow-[0_12px_30px_rgba(15,70,140,.15)]
                      "
                    >
                      <button
                        onClick={() => navigate(`/admin/hackteam/${team._id}`)}
                        className="
                          flex w-full items-center gap-2 rounded-lg
                          px-3 py-2 text-blue-900/90
                          transition-colors hover:bg-[#F5FAFF]
                        "
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="text-sm">Edit Team</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        <TableCaption className="pb-4 text-sm font-medium text-blue-900">
          A list of your recently registered teams
        </TableCaption>
      </Table>
    </div>
  );
};

export default GroupTable;
