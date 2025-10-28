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

// popover (shadcn)
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
    <div className="mt- w-full overflow-hidden">
      <Table className="rounded-xl overflow-hidden">
        <TableCaption className="text-[#1f3b6b]/80">
          A list of your recently registered Teams
        </TableCaption>

        <TableHeader
          className="
            bg-[linear-gradient(90deg,#D9E9FF_0%,#CBE1FF_50%,#D9E9FF_100%)]
            text-[#0B2C5E] border border-white/60
          "
        >
          <TableRow className="hover:bg-transparent">
            <TableHead className="text-[#0B2C5E] font-semibold">Logo</TableHead>
            <TableHead className="text-[#0B2C5E] font-semibold">Name</TableHead>
            <TableHead className="text-[#0B2C5E] font-semibold">Date</TableHead>
            <TableHead className="text-right text-[#0B2C5E] font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody className="bg-white/80">
          {(!filteredTeam || filteredTeam.length === 0) ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center py-8 text-[#1f3b6b]/80">
                You haven't registered any teams yet.
              </TableCell>
            </TableRow>
          ) : (
            filteredTeam.map((team) => (
              <TableRow
                key={team._id}
                className="
                  group transition-all
                  hover:bg-[#F2F8FF]
                  hover:-translate-y-[1px]
                "
              >
                {/* Logo */}
                <TableCell>
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#cfe4ff] shadow-sm transition-transform group-hover:scale-[1.02]">
                    <img
                      src={team.logo}
                      alt={team.name}
                      className="w-full h-full object-cover"
                    />
                    {/* soft focus ring on hover */}
                    <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-transparent group-hover:ring-[#1570EF]/25 transition-all duration-300" />
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
                <TableCell className="text-[#1f3b6b]/80">
                  {team.createdAt?.split("T")[0]}
                </TableCell>

                {/* Action */}
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="
                          inline-flex items-center justify-center
                          h-9 w-9 rounded-lg
                          border border-[#cfe4ff] bg-white/80
                          text-[#1f3b6b]/80
                          shadow-sm
                          hover:bg-white
                          hover:shadow-md
                          hover:-translate-y-[1px]
                          transition-all
                        "
                        aria-label="More"
                      >
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </PopoverTrigger>

                    <PopoverContent
                      side="bottom"
                      align="end"
                      className="
                        w-44 p-2 rounded-xl border border-[#cfe4ff] bg-white/95
                        shadow-[0_10px_30px_rgba(15,70,140,.12)]
                        backdrop-blur-sm
                      "
                      style={{ outline: "none" }}
                    >
                      <button
                        onClick={() => navigate(`/admin/hackteam/${team._id}`)}
                        className="
                          w-full flex items-center gap-2 px-3 py-2 rounded-lg
                          text-[#0B2C5E]
                          hover:bg-[#EAF3FF]
                          transition-all group
                        "
                      >
                        <Edit2 className="w-4 h-4" />
                        <span className="text-sm font-medium">Edit Team</span>
                      </button>
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
