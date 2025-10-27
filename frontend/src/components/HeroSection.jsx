import React, { useState } from "react";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/roleSlice";
import { motion } from "framer-motion";

export default function HeroSection() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchRoleHandler = () => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center bg-transparent text-gray-900 overflow-hidden">
      <div className="relative z-10 text-center px-6">
        <motion.span
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-block mx-auto px-6 py-2 rounded-full bg-white/40 text-[#0078D7] font-medium shadow-sm text-sm border border-[#0078D7]/20 backdrop-blur-md"
        >
          🚀 One platform. Endless hackathon opportunities.
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mt-8 text-5xl md:text-6xl font-extrabold leading-tight text-[#002A54]"
        >
          Ready to hack the future? <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0078D7] to-[#00A6FB]">
            Find your Crew.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-6 text-gray-700 text-lg max-w-2xl mx-auto"
        >
          Great ideas deserve great teams — connect with skilled innovators,
          collaborate effortlessly, and make your next hackathon project a win.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="mt-12 flex items-center w-full md:w-[70%] lg:w-[50%] mx-auto 
                     bg-white/70 border border-[#A0D8FF]/50 rounded-full shadow-md 
                     backdrop-blur-lg overflow-hidden hover:shadow-lg hover:bg-white/80"
        >
          <input
            type="text"
            placeholder="Find your hackathon crew"
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 px-6 py-3 outline-none bg-transparent text-gray-700 placeholder-gray-500"
          />
          <Button
            onClick={searchRoleHandler}
            className="rounded-none rounded-r-full px-6 py-6 bg-gradient-to-r from-[#0078D7] to-[#00A6FB] hover:opacity-90 transition-all"
          >
            <Search className="h-5 w-5 text-white" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
