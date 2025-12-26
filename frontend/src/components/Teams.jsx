import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import { FilterCard } from './FilterCard';
import  Team  from './Team';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';

export default function Teams() {
  const { allRoles, searchedQuery } = useSelector((store) => store.role);
  const [filterRoles, setFilterRoles] = useState(allRoles);

  useEffect(() => {
    const query = searchedQuery?.trim().toLowerCase() || '';
    if (query) {
      const filtered = allRoles.filter((role) => {
        const title = role?.title?.toLowerCase() || '';
        const description = role?.description?.toLowerCase() || '';
        const hackathonType = role?.hackathonType?.toLowerCase() || '';
        const experienceLevel = role?.experienceLevel?.toLowerCase() || '';
        return (
          title.includes(query) ||
          description.includes(query) ||
          hackathonType.includes(query) ||
          experienceLevel.includes(query)
        );
      });
      setFilterRoles(filtered);
    } else {
      setFilterRoles(allRoles);
    }
  }, [allRoles, searchedQuery]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#eef6ff_0%,#eaf3ff_15%,#d9ecff_40%,#cde6ff_60%,#bfe0ff_80%,#b7ddff_100%)]">
      <Navbar />

      {/* Push content below fixed navbar */}
      <main className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="flex flex-col lg:flex-row gap-11">

          {/* Left: Filter Card (30%) */}
          <aside className="lg:basis-[30%] lg:max-w-[30%]">
            <div className="lg:sticky lg:top-24">
              <FilterCard />
            </div>
          </aside>

          {/* Right: Team Cards (70%) */}
          <section className="lg:basis-[70%] lg:max-w-[70%]">
            {filterRoles?.length <= 0 ? (
              <div className="text-[#0B2C5E] font-semibold bg-white/40 backdrop-blur rounded-xl border border-white/50 p-6 shadow-sm">
                Teams Not Found
              </div>
            ) : (
              <div
                className="
                  grid gap-8
                  sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-2
                  auto-rows-[minmax(320px,auto)]
                "
              >
                {filterRoles.map((role) => (
                  <motion.div
                    key={role?._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.25 }}
                    className="h-full"
                  >
                    <div className="h-full">
                      <Team role={role} />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
