import React from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import HackathonCard from './HackathonCard';
import useGetAllHackathons from '@/hooks/useGetAllHackathons';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export default function Hackathons() {
  useGetAllHackathons();

  const navigate = useNavigate();
  const { hackathons } = useSelector((store) => store.hackathon);
  const { user } = useSelector((store) => store.auth);
  const isCollegeAdmin = user?.role === 'collegeAdmin';

  return (
    <div className="
      min-h-screen relative overflow-hidden
      bg-[linear-gradient(180deg,#E8F5FF_0%,#DFF0FF_20%,#CFE8FF_55%,#BFE0FF_100%)]
      text-blue-900
    ">
      {/* Fixed, glassy navbar */}
      <Navbar />
      {/* Spacer for fixed navbar height (64–72px) */}
      <div className="h-16 md:h-[72px]" />

      {/* Decorative background blobs (subtle) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/4 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      {/* Page content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="
          flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between
          rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl
          shadow-[0_10px_36px_rgba(15,70,140,0.12)] px-6 py-5
        ">
          <div>
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
              All Hackathons
            </h1>
            <p className="text-sm md:text-[15px] text-[#1f3b6b]/80 mt-0.5">
              Discover and apply to upcoming events across colleges and communities.
            </p>
          </div>

          {isCollegeAdmin && (
            <Button
              onClick={() => navigate('/create')}
              className="
                bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                text-white font-semibold shadow-md hover:opacity-95
              "
            >
              + Add New Hackathon
            </Button>
          )}
        </div>

        {/* Grid */}
        {hackathons?.length > 0 ? (
          <div
            className="
              mt-8 grid gap-6
              grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
            "
          >
            {hackathons.map((hack) => (
              <div
                key={hack._id}
                className="
                  rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl
                  shadow-[0_12px_36px_rgba(15,70,140,0.10)] p-0
                  hover:shadow-[0_16px_44px_rgba(15,70,140,0.16)]
                  transition-shadow
                "
              >
                {/* Let your existing card render inside the glass panel */}
                <HackathonCard hackathon={hack} />
              </div>
            ))}
          </div>
        ) : (
          <div
            className="
              mt-10 rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl
              shadow-[0_10px_36px_rgba(15,70,140,0.10)] p-8 text-center
            "
          >
            <p className="text-[#1f3b6b]/80">
              No hackathons available at the moment.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
