import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import GroupTable from "./GroupTable";
import { useNavigate } from "react-router-dom";
import useGetAllTeams from "@/hooks/useGetAllTeams";
import { useDispatch } from "react-redux";
import { setSearchTeamByText } from "@/redux/teamSlice";

const Group = () => {
  useGetAllTeams();
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchTeamByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F3F8FF_0%,#E8F2FF_50%,#F3F8FF_100%)]">
      <Navbar />

      {/* Page container with fixed-navbar offset */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-24 pb-12">
        {/* HEADER CARD (Matches Manage Roles style) */}
        <div
          className="
            max-w-6xl mx-auto mb-6
            rounded-2xl border border-blue-100/70
            bg-white/80 backdrop-blur-xl
            shadow-[0_12px_34px_rgba(15,70,140,.12)]
            transition-shadow
            hover:shadow-[0_18px_48px_rgba(15,70,140,.18)]
          "
        >
          {/* Gradient Top Section */}
          <div className="border-b border-blue-100/70 bg-gradient-to-r from-[#EAF3FF] to-[#DCEEFF] p-5 rounded-t-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
              Search for Teams
            </h1>
            <p className="text-sm text-blue-900/70 mt-1">
              Filter, review, and create new teams for your hackathons.
            </p>
          </div>

          {/* Filter Input & Button Section */}
          <div className="p-5 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
            <div className="flex-1">
              <Input
                className="
                  w-full
                  bg-white/80 border border-blue-100/70
                  focus:border-[#2E6BFF] focus:ring-2 focus:ring-[#2E6BFF]/20
                  transition-all
                "
                placeholder="Filter teams by name..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
            </div>

            <div className="flex-shrink-0">
              <Button
                onClick={() => navigate("/admin/hackteam/create")}
                className="
                  group relative overflow-hidden
                  bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                  text-white font-semibold
                  shadow-md hover:shadow-lg
                  transition-all duration-300
                "
              >
                <span className="relative z-10">➕ New Team</span>
                <span
                  className="
                    pointer-events-none absolute inset-0 -translate-x-full
                    bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent)]
                    transition-transform duration-700 ease-out
                    group-hover:translate-x-full
                  "
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div
          className="
            mt-6 rounded-2xl
            border border-blue-100/70
            bg-white/80 backdrop-blur-xl
            shadow-[0_6px_22px_rgba(15,70,140,.08)]
            hover:shadow-[0_10px_30px_rgba(15,70,140,.14)]
            transition-shadow duration-300
          "
        >
          <div className="p-3 md:p-5">
            <GroupTable />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
