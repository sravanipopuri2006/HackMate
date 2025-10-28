import React, { useState } from "react";
import Navbar from "./shared/Navbar";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Contact, Mail, Pen } from "lucide-react";
import { Label } from "@radix-ui/react-label"; // keep as you had it
import RegisteredTeamsTable from "./RegisteredTeamsTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import useGetAllAdminRoles from "@/hooks/useGetAllAdminRoles";
import useGetAplliedRoles from "@/hooks/useGetAplliedRoles";

const isResume = true;

const Profile = () => {
  useGetAllAdminRoles();
  useGetAplliedRoles();

  const [open, setOpen] = useState(false);
  const { user } = useSelector((s) => s.auth);

  const skills =
    user?.profile?.skills && user.profile.skills[0]
      ? user.profile.skills[0].split(",").map((s) => s.trim()).filter(Boolean)
      : [];

  return (
    <div
      className="
        min-h-screen relative overflow-hidden
        bg-[linear-gradient(180deg,#E8F5FF_0%,#DFF0FF_20%,#CFE8FF_55%,#BFE0FF_100%)]
        text-blue-900
      "
    >
      {/* Fixed navbar */}
      <Navbar />
      {/* Spacer for the fixed navbar height */}
      <div className="h-16 md:h-[72px]" />

      {/* Soft background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300/25 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-sky-300/25 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/4 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* PROFILE CARD */}
        <section
          className="
            group rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl
            shadow-[0_16px_44px_rgba(15,70,140,0.12)]
            hover:shadow-[0_22px_60px_rgba(15,70,140,0.18)]
            transition-shadow
            p-6 md:p-8
          "
        >
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
            {/* Left: Avatar + Name */}
            <div className="flex items-center gap-4 md:gap-6">
              <div className="relative">
                <Avatar className="h-20 w-20 md:h-24 md:w-24 ring-1 ring-white/70 transition-transform group-hover:scale-[1.02]">
                  <AvatarImage
                    src={
                      user?.profile?.profilePhoto ||
                      "https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                    }
                    alt="profile"
                    className="object-cover"
                  />
                  <AvatarFallback className="font-semibold">
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>

                {/* subtle animated ring on hover */}
                <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#1570EF]/0 group-hover:ring-[#1570EF]/25 transition-all duration-300" />
              </div>

              <div className="leading-tight">
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
                  {user?.fullname || "User"}
                </h1>
                <p className="mt-1 text-[15px] text-[#1f3b6b]/80">
                  {user?.profile?.bio || "Tell the world about yourself."}
                </p>
              </div>
            </div>

            {/* Edit button */}
            <div className="md:pt-2">
              <Button
                variant="outline"
                onClick={() => setOpen(true)}
                className="
                  h-10 rounded-xl border-white/70 bg-white/80
                  text-[#0B2C5E] hover:bg-white hover:shadow
                  transition-all
                "
              >
                <Pen className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>
          </div>

          {/* Contact + Skills + Resume */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Contact */}
            <div
              className="
                rounded-xl border border-white/50 bg-white/70 backdrop-blur-xl p-5
                shadow-[0_8px_28px_rgba(15,70,140,0.10)]
                hover:shadow-[0_12px_36px_rgba(15,70,140,0.14)]
                transition-shadow
              "
            >
              <h3 className="text-lg font-bold text-[#0B2C5E]">Contact</h3>
              <div className="mt-3 space-y-3">
                <div className="flex items-center gap-2 text-[#183866]/85">
                  <Mail className="h-4 w-4" />
                  <span className="break-all">{user?.email || "NA"}</span>
                </div>
                <div className="flex items-center gap-2 text-[#183866]/85">
                  <Contact className="h-4 w-4" />
                  <span>{user?.phoneNumber || "NA"}</span>
                </div>
              </div>
            </div>

            {/* Skills */}
            <div
              className="
                rounded-xl border border-white/50 bg-white/70 backdrop-blur-xl p-5
                shadow-[0_8px_28px_rgba(15,70,140,0.10)]
                hover:shadow-[0_12px_36px_rgba(15,70,140,0.14)]
                transition-shadow
              "
            >
              <h3 className="text-lg font-bold text-[#0B2C5E]">Skills</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {skills.length > 0 ? (
                  skills.map((skill, i) => (
                    <Badge
                      key={`${skill}-${i}`}
                      className="border-white/70 bg-white/85 text-[#1570EF] shadow-sm hover:scale-[1.03] transition-transform"
                    >
                      {skill}
                    </Badge>
                  ))
                ) : (
                  <span className="text-[#183866]/70">NA</span>
                )}
              </div>
            </div>

            {/* Resume */}
            <div
              className="
                rounded-xl border border-white/50 bg-white/70 backdrop-blur-xl p-5
                shadow-[0_8px_28px_rgba(15,70,140,0.10)]
                hover:shadow-[0_12px_36px_rgba(15,70,140,0.14)]
                transition-shadow
              "
            >
              <Label className="text-lg font-bold text-[#0B2C5E]">Resume</Label>
              <div className="mt-3">
                {isResume && user?.profile?.resume ? (
                  <a
                    href={user.profile.resume}
                    target="_blank"
                    rel="noreferrer"
                    className="
                      inline-flex items-center justify-center rounded-xl
                      bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                      px-4 py-2 text-white font-semibold shadow
                      hover:opacity-95 transition-opacity
                    "
                  >
                    {user?.profile?.resumeOriginalName || "View Resume"}
                  </a>
                ) : (
                  <span className="text-[#183866]/70">NA</span>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* REGISTERED TEAMS */}
        <section
          className="
            rounded-2xl border border-white/50 bg-white/60 backdrop-blur-xl
            shadow-[0_16px_44px_rgba(15,70,140,0.12)]
            hover:shadow-[0_22px_60px_rgba(15,70,140,0.18)]
            transition-shadow
            p-6 md:p-8
          "
        >
          <div className="flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
              Registered Teams
            </h2>
          </div>

          <div className="mt-4">
            <RegisteredTeamsTable />
          </div>
        </section>
      </main>

      {/* Update Profile Dialog */}
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
