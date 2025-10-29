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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const shortListingStatus = ["Accepted", "Rejected"];

export const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data?.success) {
        toast.success(res.data?.message || "Status updated successfully");
      } else {
        toast.message("No change reported by server.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to update status");
    }
  };

  const rows = applicants?.applications ?? [];

  return (
    <div
      className="
        relative overflow-hidden
        rounded-2xl border border-blue-100/70
        bg-white/80 backdrop-blur-xl
        shadow-[0_8px_26px_rgba(15,70,140,.10)]
        hover:shadow-[0_14px_42px_rgba(15,70,140,.18)]
        transition-shadow duration-300
      "
    >
      <div className="pointer-events-none absolute inset-0 [background:radial-gradient(340px_200px_at_95%_-40%,rgba(21,112,239,.12),transparent_60%)]" />
      <div className="relative z-10 p-3 md:p-5">
        <Table>
          <TableCaption className="text-blue-900/70">
            A list of your recently applied students
          </TableCaption>

          <TableHeader>
            <TableRow className="bg-gradient-to-r from-[#EAF3FF] to-[#DCEEFF]">
              <TableHead className="text-blue-900 font-semibold">Full Name</TableHead>
              <TableHead className="text-blue-900 font-semibold">Email</TableHead>
              <TableHead className="text-blue-900 font-semibold">Contact</TableHead>
              <TableHead className="text-blue-900 font-semibold">Resume</TableHead>
              <TableHead className="text-blue-900 font-semibold">Date</TableHead>
              <TableHead className="text-right text-blue-900 font-semibold">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-blue-900/70">
                  No applications yet.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((item) => {
                const applicant = item?.hackApplicant;
                const resumeUrl = applicant?.profile?.resume;
                const resumeName = applicant?.profile?.resumeOriginalName || "Resume";
                const created = applicant?.createdAt
                  ? applicant.createdAt.split("T")[0]
                  : "—";

                return (
                  <TableRow
                    key={item?._id}
                    className="
                      group transition-all
                      hover:bg-[#F4F9FF]
                      hover:shadow-[inset_0_1px_0_#E1EEFF]
                    "
                  >
                    <TableCell className="text-blue-900 font-medium">
                      {applicant?.fullname || "—"}
                    </TableCell>
                    <TableCell className="text-blue-900/90">
                      {applicant?.email || "—"}
                    </TableCell>
                    <TableCell className="text-blue-900/90">
                      {applicant?.phoneNumber || "—"}
                    </TableCell>
                    <TableCell>
                      {resumeUrl ? (
                        <a
                          href={resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            text-[#1570EF] font-medium
                            underline decoration-transparent
                            hover:decoration-[#1570EF]/40
                            transition-[text-decoration-color]
                          "
                        >
                          {resumeName}
                        </a>
                      ) : (
                        <span className="text-blue-900/60">N/A</span>
                      )}
                    </TableCell>
                    <TableCell className="text-blue-900/90">{created}</TableCell>

                    <TableCell className="text-right">
                      <Popover>
                        <PopoverTrigger
                          className="
                            inline-flex items-center justify-center
                            rounded-full p-2
                            hover:bg-white hover:shadow
                            border border-transparent hover:border-blue-100
                            transition-all
                          "
                          aria-label="More actions"
                        >
                          <MoreHorizontal className="text-blue-900/80 group-hover:text-blue-900 transition-colors" />
                        </PopoverTrigger>
                        <PopoverContent
                          align="end"
                          className="
                            w-40 p-1.5
                            bg-white/95 backdrop-blur
                            border border-blue-100/70
                            shadow-[0_10px_30px_rgba(15,70,140,.18)]
                            rounded-xl
                          "
                        >
                          {shortListingStatus.map((status) => (
                            <button
                              key={status}
                              onClick={() => statusHandler(status, item?._id)}
                              className="
                                w-full text-left px-3 py-2 rounded-lg
                                text-blue-900/90 hover:text-blue-900
                                hover:bg-[#EEF5FF]
                                transition-colors
                              "
                            >
                              {status}
                            </button>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
