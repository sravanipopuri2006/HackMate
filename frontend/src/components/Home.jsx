import { useEffect } from 'react';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCarousel from './CategoryCarousel';
import LatestRoles from './LatestRoles';
import Footer from './shared/Footer';
import useGetAllRoles from '@/hooks/useGetAllRoles';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  useGetAllRoles();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'hackLead') {
      navigate('/admin/hackteam');
    }
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#D8EDFF] via-[#C6E3FF] to-[#B3DBFF] text-blue-900 font-inter">
      {/* Navbar */}
      <header className="bg-gradient-to-r from-[#5AA9FF] to-[#7BC8FF] shadow-md">
        <Navbar />
      </header>

      {/* Hero Section */}
      <section className="pt-10  bg-gradient-to-b from-[#C6E3FF] to-[#BEE3FF]">
        <HeroSection />
      </section>

      {/* Category Carousel */}
      <section className="bg-gradient-to-b from-[#BEE3FF] to-[#CDE8FF] border-t border-blue-100">
        <CategoryCarousel />
      </section>

      {/* Latest Roles Section */}
      <section className="bg-gradient-to-b from-[#CDE8FF] to-[#D8EDFF] border-blue-200 shadow-inner">
        <div className="max-w-6xl mx-auto">
          <LatestRoles />
        </div>
      </section>

      {/* Footer */}
      <footer className="mt-auto bg-gradient-to-r from-[#5AA9FF] to-[#7BC8FF] text-white shadow-inner">
        <Footer />
      </footer>
    </div>
  );
}
