import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Team from './Team';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/roleSlice';
import useGetAllRoles from '@/hooks/useGetAllRoles';
import useGetAllTeams from '@/hooks/useGetAllTeams'; // (kept if you need it elsewhere)

export default function Browse() {
  useGetAllRoles();
  useGetAllTeams?.(); // safe if your hook exists; remove if unused

  const { allRoles } = useSelector((store) => store.role);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchedQuery(''));
    };
  }, [dispatch]);

  return (
    <div
      className="
        min-h-screen relative overflow-hidden
        bg-[linear-gradient(180deg,#E8F5FF_0%,#DFF0FF_20%,#CFE8FF_55%,#BFE0FF_100%)]
        text-blue-900
      "
    >
      {/* Fixed, glassy navbar */}
      <Navbar />
      {/* Spacer for fixed navbar height */}
      <div className="h-16 md:h-[72px]" />

      {/* Decorative background blobs (subtle) */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-blue-300/30 blur-3xl" />
        <div className="absolute top-1/4 -right-24 h-72 w-72 rounded-full bg-sky-300/30 blur-3xl" />
        <div className="absolute bottom-[-80px] left-1/4 h-96 w-96 rounded-full bg-indigo-300/20 blur-3xl" />
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-4 py-10">
        {/* Header panel */}
        <div
          className="
            rounded-2xl border border-white/40 bg-white/30 backdrop-blur-xl
            shadow-[0_10px_36px_rgba(15,70,140,0.12)] px-6 py-5
            flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between
          "
        >
          <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
            Search Results
          </h1>
          <p className="text-sm md:text-[15px] text-[#1f3b6b]/80">
            Showing <span className="font-semibold text-[#0B2C5E]">{allRoles?.length || 0}</span> team{(allRoles?.length || 0) === 1 ? '' : 's'}
          </p>
        </div>

        {/* Grid of Teams */}
        {allRoles?.length > 0 ? (
          <div
            className="
      mt-8 grid gap-6
      grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
      items-stretch
    "
          >
            {allRoles.map((role) => (
              <div
                key={role._id}
                className="
          rounded-2xl border border-white/40 bg-white/40 backdrop-blur-xl
          shadow-[0_12px_36px_rgba(15,70,140,0.10)]
          hover:shadow-[0_16px_44px_rgba(15,70,140,0.16)]
          transition-shadow flex flex-col justify-between
          min-h-[380px] h-full
        "
              >
                <Team role={role} />
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
              No teams match your search right now.
            </p>
          </div>
        )}

      </main>
    </div>
  );
}
