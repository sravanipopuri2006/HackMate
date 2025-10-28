import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Bookmark, CalendarClock } from "lucide-react";

const Team = ({ role }) => {
  const navigate = useNavigate();

  const getTime = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const now = new Date();
    const d = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    return d === 0 ? "Today" : `${d} days ago`;
  };

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      className="h-full"
    >
      {/* Gradient border wrapper */}
      <div
        className="
          group relative h-full rounded-2xl p-[1px]
          bg-gradient-to-br from-[#cfe4ff] via-[#e9f3ff] to-[#c0dbff]
          shadow-[0_10px_30px_rgba(15,70,140,.12)]
          hover:shadow-[0_18px_44px_rgba(15,70,140,.22)]
          transition-shadow
        "
      >
        {/* Glow on hover */}
        <div
          className="
            pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100
            transition-opacity duration-300
            [background:radial-gradient(280px_180px_at_60%_-20%,rgba(21,112,239,.20),transparent_60%)]
          "
        />

        {/* Card body */}
        <div
          className="
            relative z-10 h-full rounded-2xl
            bg-white/70 backdrop-blur-xl border border-white/50
            p-6 flex flex-col
          "
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar className="h-12 w-12 ring-1 ring-white/70 transition-transform group-hover:scale-[1.03]">
                  <AvatarImage
                    src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                    alt="Team"
                    className="object-cover"
                  />
                </Avatar>
                {/* subtle animated ring on hover */}
                <span className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[#1570EF]/0 group-hover:ring-[#1570EF]/30 transition-all duration-300" />
              </div>
              <div className="leading-tight">
                <h3 className="font-semibold text-[#0B2C5E]">Hack Team</h3>
                <p className="text-sm text-[#1f3b6b]/75">
                  Saveetha Engineering College
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs text-[#1f3b6b]/85 shadow-sm">
                <CalendarClock className="h-3.5 w-3.5" />
                {getTime(role?.createdAt)}
              </span>
              <button
                type="button"
                aria-label="Bookmark"
                className="grid h-9 w-9 place-items-center rounded-full border border-white/70 bg-white/80 text-[#1f3b6b]/70 shadow-sm hover:bg-white"
              >
                <Bookmark className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Title & description */}
          <div className="mt-5">
            <h2 className="text-2xl font-extrabold tracking-tight text-[#0B2C5E]">
              {role?.title}
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-[#183866]/85">
              {role?.description}
            </p>

            {/* Chips */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Badge className="border-white/70 bg-white/85 text-[#1570EF] shadow-sm">
                Position: {role?.position}
              </Badge>
              {role?.hackathonName && (
                <Badge className="border-white/70 bg-white/85 text-[#F83002] shadow-sm">
                  {role?.hackathonName}
                </Badge>
              )}
              {role?.experienceLevel && (
                <Badge className="border-white/70 bg-white/85 text-[#7209b7] shadow-sm">
                  {role?.experienceLevel}
                </Badge>
              )}
            </div>
          </div>

          {/* CTAs pinned to bottom */}
          <div className="mt-auto pt-5 flex items-center gap-3">
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-11 border-white/70 bg-white/85 text-[#0B2C5E] hover:bg-white"
                onClick={() => navigate(`/description/${role._id}`)}
              >
                Details
              </Button>
            </motion.div>

            <motion.div className="relative" whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="
                  relative h-11 overflow-hidden
                  bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                  text-white hover:opacity-95
                "
              >
                <span className="relative z-10">Save for Later</span>
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
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Team;
