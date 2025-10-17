import React, { use, useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/roleSlice";

export default function HeroSection() {
  const [query,setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchRoleHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  }
  return (
    <section className="relative bg-gradient-to-b from-white via-purple-50 to-white py-20">
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Tagline */}
        <span className="inline-block mx-auto px-5 py-2 rounded-full bg-purple-100 text-[#F83002] font-medium shadow-sm text-sm">
          🚀 One platform. Endless hackathon opportunities.
        </span>

        {/* Heading */}
        <h1 className="mt-6 text-5xl md:text-6xl font-extrabold leading-tight text-gray-900">
          Ready to hack the future? <br />
          Start by finding your{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6A38C2] to-[#F83002]">
            Crew.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
          Great ideas deserve great teams – connect with skilled people, build
          together, and win hackathons through collaboration.
        </p>

        {/* Search bar */}
        <div className="mt-10 flex items-center w-full md:w-[70%] lg:w-[50%] mx-auto bg-white border border-gray-200 rounded-full shadow-xl overflow-hidden transition-all hover:shadow-2xl">
          <input
            type="text"
            placeholder="Find your hackathon crew"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-5 py-3 outline-none text-gray-700 placeholder-gray-400"
          />
          <Button onClick={searchRoleHandler} className="rounded-none rounded-r-full px-6 py-6 bg-gradient-to-r from-[#6A38C2] to-[#F83002] hover:opacity-90 transition-all">
            <Search className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </section>
  );
}
