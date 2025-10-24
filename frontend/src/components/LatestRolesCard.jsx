import React from 'react'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { Briefcase, MapPin, Star } from "lucide-react"

export default function LatestRolesCard({ role }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/description/${role._id}`)}
      className="group p-5 rounded-2xl bg-white/70 backdrop-blur-sm shadow-md border border-blue-100 cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-400"
    >
      {/* Header */}
      <div className="pb-3 border-b border-blue-50">
        <h1 className="font-semibold text-lg text-blue-900 flex items-center gap-2">
          <Briefcase size={18} />
          {role?.hackTeam?.name || "Team Name"}
        </h1>
        <p className="text-sm text-blue-600 font-medium flex items-center gap-1">
          <MapPin size={15} />
          Saveetha Engineering College
        </p>
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
      <div className="flex items-center gap-2 mt-4 flex-wrap">
        <Badge className="bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">
          Positions: {role?.position}
        </Badge>
        <Badge className="bg-orange-50 text-orange-600 border border-orange-200 px-3 py-1 rounded-full font-semibold">
          {role?.experienceLevel}
        </Badge>
        <Badge className="bg-purple-50 text-purple-600 border border-purple-200 px-3 py-1 rounded-full font-semibold flex items-center gap-1">
          <Star size={14} />
          {role?.hackathonName}
        </Badge>
      </div>

      {/* Hover Accent Line */}
      <div className="h-1 w-full mt-4 bg-gradient-to-r from-[#2E6BFF] to-[#00A2FF] rounded-full opacity-0 group-hover:opacity-100 transition-all" />
    </div>
  );
}
