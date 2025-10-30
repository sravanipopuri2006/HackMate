import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSearchRoleByText } from "@/redux/roleSlice";
import RolesTable from "./RolesTable";
import useGetAllAdminRoles from "@/hooks/useGetAllAdminRoles";

const Roles = () => {
  // fetch roles
  // (keep your existing hook if you have one; uncomment if needed)
  useGetAllAdminRoles();

  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchRoleByText(input));
  }, [input, dispatch]);

  return (
    <div className="min-h-screen bg-[#F5FAFF]">
      {/* Fixed Navbar */}
      <Navbar />

      {/* Page container (pad top to clear fixed navbar) */}
      <div className="pt-20 px-4">
        {/* Header Card */}
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
          <div className="border-b border-blue-100/70 bg-gradient-to-r from-[#EAF3FF] to-[#DCEEFF] p-5 rounded-t-2xl">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
              Manage Roles
            </h1>
            <p className="text-sm text-blue-900/70 mt-1">
              Filter, review, and post new roles for your teams.
            </p>
          </div>

          {/* Controls Row */}
          <div className="p-5">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Filter by name, role"
                className="
                  bg-white/85 border-blue-100
                  focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                  focus-visible:border-[#1570EF]
                  transition-all
                "
              />

              <Button
                onClick={() => navigate("/admin/role/post")}
                className="
                  relative h-11 px-5
                  bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                  text-white font-semibold
                  shadow-md
                  transition-all hover:opacity-95
                  overflow-hidden
                "
              >
                <span className="relative z-10">📢 Announce Role</span>
                {/* shine */}
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
            max-w-6xl mx-auto
            rounded-2xl border border-blue-100/70
            bg-white/80 backdrop-blur-xl
            shadow-[0_12px_34px_rgba(15,70,140,.12)]
            transition-shadow
            hover:shadow-[0_18px_48px_rgba(15,70,140,.18)]
            p-4 sm:p-5
          "
        >
          <RolesTable />
        </div>
      </div>
    </div>
  );
};

export default Roles;
