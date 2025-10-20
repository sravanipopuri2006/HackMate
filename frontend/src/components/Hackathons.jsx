import React from 'react';
import Navbar from './shared/Navbar';
import { useSelector } from 'react-redux';
import HackathonCard from './HackathonCard';
import useGetAllHackathons from '@/hooks/useGetAllHackathons';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export default function Hackathons() {
  useGetAllHackathons(); // custom hook fetches all hackathons on mount

  const navigate = useNavigate();
  const { hackathons } = useSelector((store) => store.hackathon);
  const { user } = useSelector((store) => store.auth);

  const isCollegeAdmin = user?.role === 'collegeAdmin';

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto my-10">
        {/* Header Section */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-semibold">All Hackathons</h1>

          {/* Visible only to College Admins */}
          {isCollegeAdmin && (
            <Button
              className="bg-[#0077b6] text-white"
              onClick={() => navigate('/create')}
            >
              + Add New Hackathon
            </Button>
          )}
        </div>

        {/* Hackathon Cards Grid */}
        {hackathons?.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {hackathons.map((hack) => (
              <HackathonCard hackathon={hack} key={hack._id} />
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No hackathons available at the moment.
          </p>
        )}
      </div>
    </div>
  );
}
