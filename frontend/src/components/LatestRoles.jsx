import React from 'react';
import LatestRolesCard from './LatestRolesCard';
import { useSelector } from 'react-redux';

export default function LatestRoles() {
  const allRoles = useSelector((store) => store.role?.allRoles) || [];

  return (
    <div className="max-w-7xl mx-auto my-24 px-5">
      {/* Section Heading */}
      <h1 className="text-3xl md:text-4xl font-bold text-center">
        <span className="bg-gradient-to-r from-[#2E6BFF] to-[#00A2FF] bg-clip-text text-transparent">
          Discover Fresh
        </span>{" "}
        <span className="text-blue-900 drop-shadow-sm">Opportunities</span>
      </h1>

      {/* Roles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 my-12">
        {allRoles.length <= 0 ? (
          <div className="text-center text-blue-600 font-medium w-full">
            No Roles Available at the moment!
          </div>
        ) : (
          allRoles
            ?.slice(0, 6)
            .map((role) => (
              <LatestRolesCard
                key={role._id}
                role={role}
              />
            ))
        )}
      </div>
    </div>
  );
}
