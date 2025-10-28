import React from 'react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { Bookmark, CalendarClock, User, Building2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Team = ({ role }) => {
  const navigate = useNavigate();

  const getTime = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const now = new Date();
    const diffMs = now - createdAt;
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Today';
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  const initial = role?.hackTeam?.name?.[0]?.toUpperCase() || 'H';

  return (
    <div
      className="
        group relative w-full rounded-2xl overflow-hidden
        border border-white/30 bg-white/30 backdrop-blur-xl
        shadow-[0_12px_40px_rgba(15,70,140,0.12)]
        transition-all duration-300 hover:shadow-[0_16px_50px_rgba(15,70,140,0.18)]
      "
    >
      {/* Decorative top gradient strip */}
      <div className="h-1.5 w-full bg-gradient-to-r from-[#1570EF] via-[#3F8CFF] to-[#54A7FF]" />

      {/* Card body */}
      <div className="p-5">
        {/* Top row: brand + time + save */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <Avatar className="h-12 w-12 ring-2 ring-white/60 shadow-sm">
              <AvatarImage
                src="https://www.shutterstock.com/image-vector/circle-line-simple-design-logo-600nw-2174926871.jpg"
                className="object-cover"
              />
              <AvatarFallback className="font-semibold">{initial}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-[#0B2C5E] font-bold leading-tight">
                {role?.hackTeam?.name || 'Hack Team'}
              </h3>
              <div className="mt-0.5 flex items-center gap-2 text-xs text-[#1f3b6b]/80">
                <Building2 className="h-3.5 w-3.5" />
                <span>Saveetha Engineering College</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-full bg-white/60 px-2 py-1 text-xs text-[#0B2C5E] shadow-sm">
              <span className="inline-flex items-center gap-1">
                <CalendarClock className="h-3.5 w-3.5" />
                {getTime(role?.createdAt)}
              </span>
            </span>

            <Button
              variant="outline"
              size="icon"
              className="
                rounded-full border-white/60 bg-white/70
                text-[#0B2C5E] hover:bg-white
              "
              title="Save for later"
            >
              <Bookmark className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Title */}
        <h2 className="mt-4 text-lg font-extrabold tracking-tight text-[#0B2C5E]">
          {role?.title || 'Open Role'}
        </h2>

        {/* Description */}
        <p className="mt-1.5 text-sm leading-relaxed text-[#1f3b6b]/85 line-clamp-3">
          {role?.description || 'No description provided.'}
        </p>

        {/* Badges */}
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge className="bg-white/70 text-[#1570EF] border-white/60">
            Position: {role?.position ?? '-'}
          </Badge>
          {role?.hackathonName && (
            <Badge className="bg-white/70 text-[#F83002] border-white/60">
              {role.hackathonName}
            </Badge>
          )}
          {role?.experienceLevel && (
            <Badge className="bg-white/70 text-[#7209b7] border-white/60">
              {role.experienceLevel}
            </Badge>
          )}
        </div>

        {/* Footer actions */}
        <div className="mt-5 flex flex-wrap items-center gap-3">
          <Button
            onClick={() => navigate(`/description/${role._id}`)}
            variant="outline"
            className="
              border-white/70 bg-white/70 text-[#0B2C5E]
              hover:bg-white
            "
          >
            Details
          </Button>

          <Button
            className="
              bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
              text-white shadow-md hover:opacity-95
            "
          >
            <User className="mr-2 h-4 w-4" />
            Save for Later
          </Button>
        </div>
      </div>

      {/* Soft hover glow */}
      <div
        className="
          pointer-events-none absolute inset-0 opacity-0
          group-hover:opacity-100 transition-opacity duration-300
          bg-[radial-gradient(300px_160px_at_80%_-10%,rgba(21,112,239,0.15),transparent_60%)]
        "
      />
    </div>
  );
};

export default Team;
