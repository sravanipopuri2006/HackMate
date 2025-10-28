import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Briefcase, MapPin, Star, CalendarClock, Bookmark } from "lucide-react";

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
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div
        className="
          // group cursor-pointer rounded-2xl border border-blue-100
          // bg-white/70 backdrop-blur-sm p-5 shadow-md transition-all duration-300
          // hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl
        "
        onClick={() => navigate(`/description/${role._id}`)}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-blue-50">
          <div>
            <h1 className="font-semibold text-lg text-blue-900 flex items-center gap-2">
              <Briefcase size={18} />
              {role?.hackTeam?.name || "Hack Team"}
            </h1>
            <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
              <MapPin size={15} />
              Saveetha Engineering College
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs text-blue-800 shadow-sm">
              <CalendarClock size={14} />
              {getTime(role?.createdAt)}
            </span>
            <button
              className="grid h-9 w-9 place-items-center rounded-full border border-blue-100 bg-white/80 text-blue-700 hover:bg-white"
              aria-label="Bookmark"
              onClick={(e) => e.stopPropagation()}
            >
              <Bookmark size={16} />
            </button>
          </div>
        </div>

        {/* Role Info */}
        <div className="mt-3">
          <h2 className="font-bold text-xl text-blue-700 leading-6">
            {role?.title}
          </h2>
          <p className="text-sm text-gray-600 mt-1 line-clamp-2">
            {role?.description}
          </p>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">
            Position: {role?.position}
          </Badge>
          {role?.experienceLevel && (
            <Badge className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full font-semibold">
              {role?.experienceLevel}
            </Badge>
          )}
          {role?.hackathonName && (
            <Badge className="bg-purple-50 text-purple-600 border border-purple-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
              <Star size={14} />
              {role?.hackathonName}
            </Badge>
          )}
        </div>

        {/* Actions (with glossy/shine animation on primary) */}
        <div className="mt-3 flex items-center gap-3">
          {/* Details button: subtle lift + glow */}
          <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              className="
                h-9 border-blue-200 bg-white text-blue-900 transition
                hover:bg-white hover:shadow-[0_6px_16px_rgba(46,107,255,.18)]
              "
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/description/${role._id}`);
              }}
            >
              Details
            </Button>
          </motion.div>

          {/* Save for Later: shine sweep like older version */}
          <motion.div
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative group/btn"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              className="
                relative h-9 overflow-hidden
                bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                text-white transition hover:opacity-95
              "
            >
              <span className="relative z-10">Save for Later</span>

              {/* SHINE overlay; animates across on hover */}
              <span
                className="
                  pointer-events-none absolute inset-0 -translate-x-[120%]
                  bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent)]
                  transition-transform duration-[750ms] ease-out
                  group-hover/btn:translate-x-[120%]
                "
              />

              {/* soft glow ring on hover */}
              <span
                className="
                  pointer-events-none absolute inset-0 rounded-md
                  ring-0 ring-white/0 transition-[box-shadow,ring] duration-300
                  group-hover/btn:ring-2 group-hover/btn:ring-white/30
                "
              />
            </Button>
          </motion.div>
        </div>

        {/* Accent line (no extra space below) */}
        <div className="h-1 w-full mt-3 bg-gradient-to-r from-[#2E6BFF] to-[#00A2FF] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
      </div>
    </motion.div>
  );
};

export default Team;
