import { useEffect } from "react";
import Navbar from "./shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestRoles from "./LatestRoles";
import Footer from "./shared/Footer";
import useGetAllRoles from "@/hooks/useGetAllRoles";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Home() {
  useGetAllRoles();
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === "hackLead") navigate("/admin/hackteam");
  }, [user, navigate]);

  return (
    <div
      className="min-h-screen flex flex-col text-blue-900 font-inter
                 bg-[linear-gradient(180deg,#E8F5FF_0%,#D5EBFF_40%,#C7E3FF_70%,#BFE0FF_100%)]"
    >
      {/* Fixed navbar (glass look kept) */}
      <Navbar />

      {/* Spacer to offset the fixed navbar height (64–72px) */}
      <div className="h-16 md:h-[72px]" />

      {/* Page content */}
      <main className="flex-1">
        {/* Hero Section */}
        <section className="bg-transparent">
          <HeroSection />
        </section>

        {/* Category Carousel */}
        <section className="bg-transparent">
          <CategoryCarousel />
        </section>

        {/* Latest Roles Section */}
        <section className="bg-transparent">
          <div className="max-w-6xl mx-auto">
            <LatestRoles />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-transparent text-blue-900">
        <Footer />
      </footer>
    </div>
  );
}
