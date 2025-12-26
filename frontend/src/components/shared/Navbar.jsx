import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { LogOut, User2, Menu, X } from "lucide-react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const goHome = () => navigate("/");

  // ✅ Bright blue you want (like "Find" screenshot)
  const brandBlue = "text-[#007BFF]";

  const linkBase =
    "transition-all duration-200 hover:-translate-y-[1px] hover:text-[#007BFF]";

  const activeClass = ({ isActive }) =>
    isActive
      ? "text-[#007BFF] font-semibold"
      : "text-[#0A58CA]"; // slightly darker blue by default

  return (
    <nav
      className="
        fixed top-0 left-0 w-full z-50
        bg-white/10 backdrop-blur-xl
        border-b border-white/30
        shadow-[0_10px_30px_rgba(15,70,140,0.18)]
      "
    >
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">
        {/* Brand */}
        <button
          onClick={goHome}
          className="flex items-center space-x-3 select-none group"
          type="button"
        >
          <div className="relative h-12 w-12 flex items-center justify-center">
            <img
              src="/LOGO.png"
              alt="Hackmate Logo"
              className="
                h-12 w-12 object-contain
                transition-transform duration-300
                group-hover:scale-[1.05]
              "
            />
          </div>

          <span
            className={`
              text-xl font-extrabold tracking-wide
              ${brandBlue}
              drop-shadow-[0_8px_18px_rgba(0,123,255,0.25)]
            `}
          >
            HACKMATE
          </span>
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8 font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
            >
              Home
            </NavLink>
          </li>

          {user?.role === "hackLead" ? (
            <>
              <li>
                <NavLink
                  to="/admin/hackteam"
                  className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
                >
                  Teams
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hackathons"
                  className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
                >
                  Hackathons
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/role"
                  className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
                >
                  Roles
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/browse"
                  className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
                >
                  Browse
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink
                  to="/teams"
                  className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
                >
                  Teams
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/hackathons"
                  className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
                >
                  Hackathons
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/browse"
                  className={({ isActive }) => `${linkBase} ${activeClass({ isActive })}`}
                >
                  Browse
                </NavLink>
              </li>
            </>
          )}
        </ul>

        {/* Right side */}
        {!user ? (
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login">
              <Button
                className="
                  bg-gradient-to-r from-[#007BFF] to-[#54A7FF]
                  text-white font-semibold
                  shadow-md hover:shadow-lg hover:-translate-y-[1px]
                  transition-all
                "
              >
                Login
              </Button>
            </Link>

            <Link to="/signup">
              <Button
                className="
                  bg-white/20 text-[#0A58CA]
                  hover:bg-white/30
                  shadow-sm font-semibold backdrop-blur-md
                  transition-all
                "
              >
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <div className="hidden md:flex items-center gap-3">
            <span className="text-[#0A58CA] font-semibold">
              Hi,&nbsp;{user?.fullname?.split(" ")[0] || "User"}
            </span>

            <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer ring-1 ring-white/60 hover:ring-[#007BFF]/60 transition-all shadow-sm">
                  <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                  <AvatarFallback className="font-semibold">
                    {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>

              <PopoverContent className="w-72 bg-white/95 shadow-xl rounded-xl border border-gray-200 p-4">
                <div className="flex gap-4 border-b pb-3 mb-3">
                  <Avatar className="ring-1 ring-[#007BFF]/20">
                    <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                    <AvatarFallback className="font-semibold">
                      {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>

                  <div>
                    <h4 className="font-semibold text-gray-800">{user?.fullname}</h4>
                    <p className="text-sm text-gray-500">
                      {user?.profile?.bio || "No bio available"}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-3 text-gray-700">
                  <Link
                    to="/profile"
                    className="flex items-center gap-2 hover:text-[#007BFF] transition cursor-pointer"
                  >
                    <User2 className="w-4" />
                    <span>View Profile</span>
                  </Link>

                  <button
                    onClick={logOutHandler}
                    className="flex items-center gap-2 hover:text-red-600 transition cursor-pointer"
                  >
                    <LogOut className="w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        )}

        {/* Mobile menu button */}
        <button
          className="
            md:hidden inline-flex items-center justify-center
            h-10 w-10 rounded-xl
            border border-white/30 bg-white/20
            backdrop-blur-md text-[#007BFF]
            shadow-sm
          "
          onClick={() => setOpenMobile((s) => !s)}
          type="button"
          aria-label="Toggle menu"
        >
          {openMobile ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {openMobile && (
        <div className="md:hidden px-6 pb-4">
          <div className="mt-2 rounded-2xl border border-white/30 bg-white/20 backdrop-blur-md p-4 space-y-3">
            <Link
              onClick={() => setOpenMobile(false)}
              to="/"
              className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition"
            >
              Home
            </Link>

            {user?.role === "hackLead" ? (
              <>
                <Link onClick={() => setOpenMobile(false)} to="/admin/hackteam" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Teams
                </Link>
                <Link onClick={() => setOpenMobile(false)} to="/hackathons" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Hackathons
                </Link>
                <Link onClick={() => setOpenMobile(false)} to="/admin/role" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Roles
                </Link>
                <Link onClick={() => setOpenMobile(false)} to="/browse" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Browse
                </Link>
              </>
            ) : (
              <>
                <Link onClick={() => setOpenMobile(false)} to="/teams" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Teams
                </Link>
                <Link onClick={() => setOpenMobile(false)} to="/hackathons" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Hackathons
                </Link>
                <Link onClick={() => setOpenMobile(false)} to="/browse" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Browse
                </Link>
              </>
            )}

            {user ? (
              <>
                <Link onClick={() => setOpenMobile(false)} to="/profile" className="block text-[#0A58CA] font-medium hover:text-[#007BFF] transition">
                  Profile
                </Link>
                <button
                  onClick={() => {
                    setOpenMobile(false);
                    logOutHandler();
                  }}
                  className="w-full text-left text-red-600 font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-2 pt-2">
                <Link onClick={() => setOpenMobile(false)} to="/login" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-[#007BFF] to-[#54A7FF] text-white">
                    Login
                  </Button>
                </Link>
                <Link onClick={() => setOpenMobile(false)} to="/signup" className="flex-1">
                  <Button className="w-full bg-white/30 text-[#0A58CA]">
                    Signup
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
