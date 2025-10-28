import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant.js";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice.js";

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(",") || "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) formData.append("file", input.file);

    try {
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated successfully!");
        setOpen(false);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Glassy, blue-themed content with soft border + glow */}
      <DialogContent
        className="
    sm:max-w-[520px] rounded-2xl
    border border-[#BFD9FF]/60 bg-[#EAF3FF]/95 backdrop-blur-xl
    shadow-[0_10px_40px_rgba(15,70,140,0.15)]
    p-0 overflow-hidden transition-all duration-300
  "
      >

        {/* Gradient header bar */}
        <DialogHeader
  className="
    p-5 border-b border-[#0B2C5E]/40
    bg-[linear-gradient(90deg,#0B2C5E_0%,#1570EF_60%,#1E88FF_100%)]
    text-white shadow-[0_4px_12px_rgba(11,44,94,0.3)]
  "
>

          <DialogTitle className="text-[#ffffff] text-xl font-extrabold tracking-tight">
            Update Profile
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmitHandler} className="p-5">
          <div className="grid gap-5">
            {/* Row */}
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="fullname" className="text-right text-[#0B2C5E] font-semibold">
                Name
              </Label>
              <Input
                id="fullname"
                name="fullname"
                value={input.fullname}
                onChange={changeEventHandler}
                type="text"
                className="
                  col-span-3 rounded-xl border-white/60 bg-white/70
                  focus-visible:ring-2 focus-visible:ring-[#1570EF]/40 focus-visible:border-[#1570EF]/50
                  transition-all
                "
                placeholder="Your full name"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="email" className="text-right text-[#0B2C5E] font-semibold">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
                type="email"
                className="
                  col-span-3 rounded-xl border-white/60 bg-white/70
                  focus-visible:ring-2 focus-visible:ring-[#1570EF]/40 focus-visible:border-[#1570EF]/50
                  transition-all
                "
                placeholder="you@example.com"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="phoneNumber" className="text-right text-[#0B2C5E] font-semibold">
                Number
              </Label>
              <Input
                id="phoneNumber"
                name="phoneNumber"
                value={input.phoneNumber}
                onChange={changeEventHandler}
                className="
                  col-span-3 rounded-xl border-white/60 bg-white/70
                  focus-visible:ring-2 focus-visible:ring-[#1570EF]/40 focus-visible:border-[#1570EF]/50
                  transition-all
                "
                placeholder="+91-XXXXXXXXXX"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="bio" className="text-right text-[#0B2C5E] font-semibold">
                Bio
              </Label>
              <Input
                id="bio"
                name="bio"
                value={input.bio}
                onChange={changeEventHandler}
                className="
                  col-span-3 rounded-xl border-white/60 bg-white/70
                  focus-visible:ring-2 focus-visible:ring-[#1570EF]/40 focus-visible:border-[#1570EF]/50
                  transition-all
                "
                placeholder="Short intro about you"
              />
            </div>

            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="skills" className="text-right text-[#0B2C5E] font-semibold">
                Skills
              </Label>
              <Input
                id="skills"
                name="skills"
                value={input.skills}
                onChange={changeEventHandler}
                className="
                  col-span-3 rounded-xl border-white/60 bg-white/70
                  focus-visible:ring-2 focus-visible:ring-[#1570EF]/40 focus-visible:border-[#1570EF]/50
                  transition-all
                "
                placeholder="e.g., React, Tailwind, Node.js"
              />
            </div>

            {/* File input – styled */}
            <div className="grid grid-cols-4 items-center gap-3">
              <Label htmlFor="file" className="text-right text-[#0B2C5E] font-semibold">
                Resume
              </Label>
              <div className="col-span-3">
                <label
                  htmlFor="file"
                  className="
                    group block cursor-pointer
                    rounded-xl border border-white/60 bg-white/70 px-4 py-2
                    text-[#0B2C5E] shadow-sm
                    hover:bg-white hover:shadow-[0_6px_18px_rgba(21,112,239,0.18)]
                    transition-all
                  "
                >
                  <span className="inline-flex items-center gap-2">
                    <span className="text-sm">Upload PDF</span>
                    <span className="text-xs text-[#1f3b6b]/70">(Max ~5MB)</span>
                  </span>
                </label>
                <Input
                  id="file"
                  name="file"
                  type="file"
                  accept="application/pdf"
                  onChange={fileHandler}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <DialogFooter className="mt-6">
            {loading ? (
              <Button className="w-full h-11 rounded-xl" variant="gradient" disabled>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="
                  w-full h-11 rounded-xl relative overflow-hidden
                  hover:-translate-y-[1px]
                "
                variant="gradient"
              >
                <span className="relative z-10">Update</span>
                {/* Shine effect */}
                <span
                  aria-hidden="true"
                  className="
                    pointer-events-none absolute inset-0 -translate-x-full
                    bg-[linear-gradient(120deg,transparent,rgba(255, 255, 255, 1),transparent)]
                    transition-transform duration-700 ease-out
                    hover:translate-x-full
                  "
                />
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
