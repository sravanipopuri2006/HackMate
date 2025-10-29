import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { MoreHorizontal, Edit2, Eye } from "lucide-react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const RolesTable = () => {
  const { allAdminRoles, searchRoleByText } = useSelector((store) => store.role);
  const [filterRole, setFilterRole] = useState(allAdminRoles);
  const navigate = useNavigate();

  useEffect(() => {
    const filtered = (allAdminRoles || []).filter((role) => {
      if (!searchRoleByText) return true;
      const q = searchRoleByText.toLowerCase();
      return (
        role?.name?.toLowerCase().includes(q) ||
        role?.hackathonName?.toLowerCase().includes(q) ||
        role?.title?.toLowerCase().includes(q)
      );
    });
    setFilterRole(filtered);
  }, [allAdminRoles, searchRoleByText]);

  return (
    <div className="relative rounded-2xl overflow-hidden border border-blue-100/70 shadow-[0_10px_30px_rgba(15,70,140,.08)] bg-white/80 backdrop-blur">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-[#EAF3FF] to-[#DCEEFF]">
            <TableHead className="text-[#0B2C5E] font-semibold">
              Hackathon Name
            </TableHead>
            <TableHead className="text-[#0B2C5E] font-semibold">
              Team Name
            </TableHead>
            <TableHead className="text-[#0B2C5E] font-semibold">
              Role
            </TableHead>
            <TableHead className="text-[#0B2C5E] font-semibold">
              Date
            </TableHead>
            <TableHead className="text-right text-[#0B2C5E] font-semibold">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {(!filterRole || filterRole.length === 0) ? (
            <TableRow>
              <TableCell colSpan={5}>
                <div className="my-6 rounded-xl border border-dashed border-blue-200 bg-blue-50/60 p-6 text-center">
                  <p className="font-semibold text-blue-900">
                    No roles found yet
                  </p>
                  <p className="text-sm text-blue-900/70">
                    Try adjusting your filter or post a new role.
                  </p>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            filterRole.map((r) => (
              <TableRow
                key={r._id}
                className="
                  group transition-all duration-200 ease-in-out
                  hover:bg-[#F5FAFF] hover:shadow-[0_4px_12px_rgba(15,70,140,0.08)]
                "
              >
                <TableCell className="text-blue-900/90">
                  <span className="group-hover:translate-x-0.5 inline-block transition-transform">
                    {r.hackathonName}
                  </span>
                </TableCell>

                <TableCell className="text-blue-900/90">
                  {r.hackTeamId?.name || "—"}
                </TableCell>

                <TableCell className="text-blue-900 font-semibold">
                  {r.title}
                </TableCell>

                <TableCell className="text-blue-900/80">
                  {r.createdAt?.split("T")[0]}
                </TableCell>

                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger asChild>
                      <button
                        className="
                          inline-flex items-center justify-center
                          h-9 w-9 rounded-full
                          border border-blue-100 bg-white
                          text-blue-900/80 shadow-sm
                          hover:shadow-md hover:scale-105
                          transition-all duration-200
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
                        bg-white/95 backdrop-blur
                        shadow-[0_12px_30px_rgba(15,70,140,.15)]
                        p-2
                      "
                    >
                      <button
                        onClick={() => navigate(`/admin/hackteam/${r._id}`)}
                        className="
                          flex w-full items-center gap-2
                          rounded-lg px-3 py-2
                          text-blue-900/90 hover:bg-[#F5FAFF]
                          transition-colors
                        "
                      >
                        <Edit2 className="h-4 w-4" />
                        <span className="text-sm">Edit Team</span>
                      </button>

                      <button
                        onClick={() => navigate(`/admin/role/${r._id}/applicants`)}
                        className="
                          mt-1 flex w-full items-center gap-2
                          rounded-lg px-3 py-2
                          text-blue-900/90 hover:bg-[#F5FAFF]
                          transition-colors
                        "
                      >
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">Applicants</span>
                      </button>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>

        {/* Caption (Fixed & Visible Like Teams Table) */}
        <TableCaption className="text-sm font-medium text-blue-900 mt-4 pb-4">
          A list of your recently posted roles for hackathons
        </TableCaption>
      </Table>
    </div>
  );
};

export default RolesTable;
