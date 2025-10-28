import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import {
  Users, CalendarDays, Building2, Briefcase, ClipboardList,
} from "lucide-react";

import Navbar from "./shared/Navbar";               // ⬅️ fixed navbar
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

import { setSingleRole } from "@/redux/roleSlice";
import { APPLICATION_API_END_POINT, ROLE_API_END_POINT } from "@/utils/constant";

const TeamsDescription = () => {
  const { singleRole } = useSelector((s) => s.role);
  const user = useSelector((s) => s.user);
  const { id: roleId } = useParams();
  const dispatch = useDispatch();

  const isInitiallyApplied =
    user?._id &&
    singleRole?.applications?.some(
      (a) =>
        a.hackApplicant?.toString() === user._id ||
        a.hackApplicant?.id?.toString() === user._id
    );
  const [isApplied, setIsApplied] = useState(!!isInitiallyApplied);

  const applyRoleHandler = async () => {
    try {
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/apply/${roleId}`,
        {},
        { withCredentials: true }
      );
      if (res.data.success) {
        setIsApplied(true);
        const updated = {
          ...singleRole,
          applications: [...(singleRole?.applications || []), { hackApplicant: user?._id }],
        };
        dispatch(setSingleRole(updated));
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to apply");
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchSingleRole = async () => {
      try {
        const res = await axios.get(`${ROLE_API_END_POINT}/get/${roleId}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setSingleRole(res.data.role));
          const already =
            res.data.role?.applications?.some(
              (a) => a.hackApplicant?.toString() === user?._id?.toString()
            ) || false;
          setIsApplied(already);
        }
      } catch (error) {
        console.error("Error fetching role:", error);
      }
    };
    fetchSingleRole();
  }, [roleId, dispatch, user?._id]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#EAF3FF_0%,#DCEBFF_45%,#CFE6FF_100%)]">
      {/* Fixed glass navbar */}
      <div className="fixed inset-x-0 top-0 z-50 bg-white/50 backdrop-blur-xl border-b border-white/60">
        <Navbar />
      </div>
      {/* Spacer for fixed navbar height */}
      <div className="h-16 md:h-[72px]" />

      <div className="max-w-5xl mx-auto my-10 px-4">
        {/* Header Card */}
        <Card className="group rounded-2xl border border-white/60 bg-white/70 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,70,140,0.12)] transition-all duration-300 hover:shadow-[0_16px_44px_rgba(15,70,140,0.18)] hover:-translate-y-0.5">
          <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
            <div>
              <CardTitle className="text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
                {singleRole?.title}
              </CardTitle>
              <div className="flex flex-wrap items-center gap-2 mt-3">
                <BlueBadge>Positions: {singleRole?.position}</BlueBadge>
                <OrangeBadge>{singleRole?.hackathonName}</OrangeBadge>
                <PurpleBadge>{singleRole?.experienceLevel}</PurpleBadge>
              </div>
            </div>

            <Button
              onClick={isApplied ? undefined : applyRoleHandler}
              disabled={isApplied}
              className={`relative h-11 px-6 rounded-xl text-white overflow-hidden transition-all ${
                isApplied
                  ? "bg-slate-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-[#1570EF] to-[#54A7FF] hover:opacity-95 active:translate-y-[1px]"
              }`}
            >
              <span className="relative z-10">
                {isApplied ? "Already Applied" : "Apply Now"}
              </span>
              {!isApplied && (
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
              )}
            </Button>
          </CardHeader>
        </Card>

        {/* Details Section */}
        <Card className="mt-6 rounded-2xl border border-white/60 bg-white/75 backdrop-blur-xl shadow-[0_10px_30px_rgba(15,70,140,0.10)] transition-all duration-300 hover:shadow-[0_16px_40px_rgba(15,70,140,0.16)] hover:-translate-y-0.5">
          <CardContent className="p-6 space-y-6">
            <h2 className="text-lg font-semibold text-[#0B2C5E] border-b border-blue-100 pb-3">
              Team Description
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <DetailItem icon={<Briefcase />} label="Role" value={singleRole?.title} />
                <DetailItem icon={<ClipboardList />} label="Hackathon" value={singleRole?.hackathonName} />
                <DetailItem icon={<Users />} label="Total Applicants" value={singleRole?.applications?.length} />
              </div>
              <div className="space-y-3">
                <DetailItem icon={<Building2 />} label="College" value="Saveetha Engineering College" />
                <DetailItem icon={<CalendarDays />} label="Posted Date" value={singleRole?.createdAt?.split?.("T")?.[0]} />
                <DetailItem icon={<Briefcase />} label="Knowledge Level" value={singleRole?.experienceLevel} />
              </div>
            </div>

            <div className="group">
              <h3 className="font-semibold text-[#0B2C5E] mb-1">Description</h3>
              <p className="text-[#1f3b6b]/80 leading-relaxed">
                {singleRole?.description}
              </p>
              <div className="mt-4 h-1 w-full bg-gradient-to-r from-[#2E6BFF] to-[#00A2FF] rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

/* Themed Badges */
const BlueBadge = ({ children }) => (
  <Badge className="bg-blue-50 text-[#1570EF] border border-blue-200 px-3 py-1 rounded-full font-semibold hover:bg-blue-100 transition">
    {children}
  </Badge>
);

const OrangeBadge = ({ children }) => (
  <Badge className="bg-orange-50 text-[#F56A24] border border-orange-200 px-3 py-1 rounded-full font-semibold hover:bg-orange-100 transition">
    {children}
  </Badge>
);

const PurpleBadge = ({ children }) => (
  <Badge className="bg-purple-50 text-[#6D28D9] border border-purple-200 px-3 py-1 rounded-full font-semibold hover:bg-purple-100 transition">
    {children}
  </Badge>
);

const DetailItem = ({ icon, label, value }) => (
  <div className="group flex items-center gap-3 rounded-xl border border-blue-50 bg-blue-50/40 px-3 py-2 transition-all duration-300 hover:bg-blue-50/70 hover:border-blue-100 hover:-translate-y-[1px] shadow-sm hover:shadow">
    <div className="text-[#1570EF]">{icon}</div>
    <p className="font-medium text-[#0B2C5E]">
      {label}: <span className="font-normal text-[#1f3b6b]/80">{value || "-"}</span>
    </p>
  </div>
);

export default TeamsDescription;
