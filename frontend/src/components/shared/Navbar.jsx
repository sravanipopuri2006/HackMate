import React from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setUser } from "@/redux/authSlice";

const Navbar = () => {
  const { user } = useSelector(store => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logOutHandler = async () => {
    try {
      const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  return (
    <nav className="
      fixed top-0 left-0 w-full z-50
      bg-white/10 backdrop-blur-md
      border-b border-white/30
      shadow-sm
    ">
      <div className="flex items-center justify-between mx-auto max-w-7xl h-16 px-6">

        {/* Brand */}
        <Link to="/" className="flex items-center space-x-2 select-none">
          <div className="h-9 w-9 rounded-xl bg-white/30 flex items-center justify-center shadow-sm">
            <span className="text-[#0A58CA] font-extrabold">H</span>
          </div>
          <span className="text-lg font-semibold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#0A58CA] to-[#00A6FB]">
            HACKMATE
          </span>
        </Link>

        {/* Navigation Links */}
        <ul className="hidden md:flex items-center gap-8 font-medium text-blue-900">
          {user && user.role === 'hackLead' ? (
            <>
              <li><Link to='/admin/hackteam' className="hover:text-[#0A58CA] transition">Teams</Link></li>
              <li><Link to="/hackathons" className="hover:text-[#0A58CA] transition">Hackathons</Link></li>
              <li><Link to="/admin/role" className="hover:text-[#0A58CA] transition">Roles</Link></li>
            </>
          ) : (
            <>
              <li><Link to='/' className="hover:text-[#0A58CA] transition">Home</Link></li>
              <li><Link to='/teams' className="hover:text-[#0A58CA] transition">Teams</Link></li>
              <li><Link to="/hackathons" className="hover:text-[#0A58CA] transition">Hackathons</Link></li>
              <li><Link to='/browse' className="hover:text-[#0A58CA] transition">Browse</Link></li>
            </>
          )}
        </ul>

        {/* Right Auth / Profile Section */}
        {!user ? (
          <div className="flex items-center gap-3">
            <Link to="/login">
              <Button className="bg-white text-blue-700 hover:bg-white/90 shadow-sm font-semibold">
                Login
              </Button>
            </Link>
            <Link to="/signup">
              <Button className="bg-white/20 text-blue-900 hover:bg-white/30 shadow-sm font-semibold backdrop-blur-md">
                Signup
              </Button>
            </Link>
          </div>
        ) : (
          <Popover>
            <PopoverTrigger asChild>
              <Avatar className="cursor-pointer ring-1 ring-white/60 hover:ring-white transition-all shadow-sm">
                <AvatarImage src={user?.profile?.profilePhoto} alt="profile" />
                <AvatarFallback className="font-semibold">
                  {user?.fullname?.charAt(0)?.toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </PopoverTrigger>

            <PopoverContent className="w-72 bg-white shadow-xl rounded-xl border border-gray-200 p-4">
              {/* Profile Top */}
              <div className="flex gap-4 border-b pb-3 mb-3">
                <Avatar className="ring-1 ring-blue-400/30">
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

              {/* Profile Menu Items */}
              <div className="flex flex-col gap-3 text-gray-700">
                {user && user.role === 'hackApplicant' && (
                  <Link to="/profile" className="flex items-center gap-2 hover:text-gray-900 transition cursor-pointer">
                    <User2 className="w-4" />
                    <span>View Profile</span>
                  </Link>
                )}

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
        )}
      </div>
    </nav>
  );
};

export default Navbar;
