import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Bookmark, CalendarClock, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { HACKATHON_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setHackathons } from "@/redux/hackathonSlice";

const HackathonCard = ({ hackathon }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((s) => s.auth);
  const hackathonId = hackathon?._id;

  const getTime = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const now = new Date();
    const d = Math.floor((now - createdAt) / (1000 * 60 * 60 * 24));
    return d === 0 ? "Today" : `${d} days ago`;
  };

  const isOwner = user?._id === hackathon?.userId;

  const handleEdit = (e) => {
    e.stopPropagation();
    navigate(`edit/${hackathonId}`);
  };

  const handleDelete = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(`${HACKATHON_API_END_POINT}/delete/${hackathonId}`, {
        withCredentials: true,
      });
      toast.success("Hackathon deleted successfully");
      const res = await axios.get(`${HACKATHON_API_END_POINT}/get`, {
        withCredentials: true,
      });
      dispatch(setHackathons(res.data.hackathons));
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete hackathon");
    }
  };

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="
        group rounded-2xl border border-blue-100
        bg-white/70 backdrop-blur-sm p-5 shadow-md
        transition-all duration-300 hover:-translate-y-1
        hover:border-blue-400 hover:shadow-xl
      "
    >
      {/* Top meta row */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-blue-50">
        <div className="min-w-0">
          <h2 className="font-semibold text-lg text-blue-900 truncate">
            {hackathon?.name || "Hackathon"}
          </h2>
          <p className="text-sm text-blue-600">Saveetha Engineering College</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/80 px-3 py-1 text-xs text-blue-800 shadow-sm">
            <CalendarClock size={14} />
            {getTime(hackathon?.createdAt)}
          </span>
          <button
            type="button"
            aria-label="Bookmark"
            className="grid h-9 w-9 place-items-center rounded-full border border-blue-100 bg-white/80 text-blue-700 hover:bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <Bookmark size={16} />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="mt-3">
        <p className="text-sm text-gray-600 line-clamp-3">
          {hackathon?.description}
        </p>
      </div>

      {/* Badges */}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        {hackathon?.hackathonlevel && (
          <Badge className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">
            {hackathon.hackathonlevel}
          </Badge>
        )}
        {hackathon?.date && (
          <Badge className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full font-semibold">
            {hackathon.date}
          </Badge>
        )}
        {hackathon?.website && (
          <Badge className="bg-purple-50 text-purple-600 border border-purple-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
            <ExternalLink size={14} />
            Website
          </Badge>
        )}
      </div>

      {/* Actions */}
      <div className="mt-3 flex items-center gap-3 flex-wrap">
        {hackathon?.website && (
          <motion.div
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="relative group/btn"
          >
            {/* Primary button with glossy sweep animation */}
            <a
              href={hackathon.website}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                className="
                  relative h-9 overflow-hidden
                  bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                  text-white transition hover:opacity-95
                "
              >
                <span className="relative z-10 flex items-center gap-2">
                  Visit website <ExternalLink size={16} />
                </span>

                {/* glossy/shine sweep */}
                <span
                  className="
                    pointer-events-none absolute inset-0 -translate-x-[120%]
                    bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.55),transparent)]
                    transition-transform duration-[750ms] ease-out
                    group-hover/btn:translate-x-[120%]
                  "
                />
                {/* soft glow ring */}
                <span
                  className="
                    pointer-events-none absolute inset-0 rounded-md ring-0 ring-white/0
                    transition-[box-shadow,ring] duration-300
                    group-hover/btn:ring-2 group-hover/btn:ring-white/30
                  "
                />
              </Button>
            </a>
          </motion.div>
        )}

        {isOwner && (
          <>
            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                className="h-9 border-blue-200 bg-white text-blue-900 hover:bg-white hover:shadow-[0_6px_16px_rgba(46,107,255,.18)]"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </motion.div>

            <motion.div whileHover={{ y: -1 }} whileTap={{ scale: 0.98 }}>
              <Button
                className="h-9 bg-[#7209b7] text-white hover:opacity-95"
                onClick={handleEdit}
              >
                Edit
              </Button>
            </motion.div>
          </>
        )}
      </div>

      {/* Accent line (reveals on hover; no extra bottom space) */}
      <div className="h-1 w-full mt-3 bg-gradient-to-r from-[#2E6BFF] to-[#00A2FF] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
    </motion.div>
  );
};

export default HackathonCard;
