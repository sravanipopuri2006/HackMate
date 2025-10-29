import React, { useMemo, useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import store from "@/redux/store";
import {
  Select,
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  SelectGroup,
} from "../ui/select";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { ROLE_API_END_POINT } from "@/utils/constant";

export default function PostRole() {
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    hackathonName: "",
    hackathonType: "",
    position: "",
    experienceLevel: "",
    hackTeamId: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { teams } = useSelector((store) => store.hackteam);

  const hasTeams = (teams?.length ?? 0) > 0;

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const selectChangeHandler = (value) => {
    const selectedTeam = teams.find((t) => t?.name?.toLowerCase() === value);
    setInput({ ...input, hackTeamId: selectedTeam?._id || "" });
  };

  const isValid = useMemo(() => {
    const {
      title,
      description,
      requirements,
      hackathonName,
      hackathonType,
      position,
      experienceLevel,
      hackTeamId,
    } = input;
    return (
      title.trim() &&
      description.trim() &&
      requirements.trim() &&
      hackathonName.trim() &&
      hackathonType.trim() &&
      String(position).trim() &&
      Number(position) > 0 &&
      experienceLevel.trim() &&
      hackTeamId
    );
  }, [input]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!isValid) {
      toast.error("Please fill all fields correctly.");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post(`${ROLE_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data?.success) {
        toast.success(res.data?.message || "Role posted successfully");
        navigate("/admin/role");
      } else {
        toast.message("No change reported by server.");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to post role");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FAFF]">
      {/* Fixed Navbar (already styled globally) */}
      <Navbar />

      {/* Page container with top padding to clear fixed navbar */}
      <div className="pt-20 px-4">
        <div
          className="
            max-w-5xl mx-auto
            relative overflow-hidden
            rounded-2xl border border-blue-100/70
            bg-white/80 backdrop-blur-xl
            shadow-[0_12px_34px_rgba(15,70,140,.12)]
            transition-shadow
            hover:shadow-[0_18px_48px_rgba(15,70,140,.18)]
          "
        >
          {/* soft radial glow */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(420px_220px_at_95%_-40%,rgba(21,112,239,.12),transparent_60%)]" />

          {/* Header bar */}
          <div className="relative z-10 border-b border-blue-100/70 bg-gradient-to-r from-[#EAF3FF] to-[#DCEEFF] p-5">
            <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
              Announce a New Role
            </h1>
            <p className="text-sm text-blue-900/70 mt-1">
              Share role details for your hack team — keep it clear and compelling.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={submitHandler} className="relative z-10 p-6 md:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="group">
                <Label className="text-blue-900">Title</Label>
                <Input
                  type="text"
                  name="title"
                  value={input.title}
                  onChange={changeEventHandler}
                  required
                  className="
                    mt-2
                    bg-white/80 border-blue-100
                    focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                    focus-visible:border-[#1570EF]
                    transition-all
                  "
                  placeholder="e.g., Frontend Developer"
                />
              </div>

              <div className="group">
                <Label className="text-blue-900">Description</Label>
                <Input
                  type="text"
                  name="description"
                  value={input.description}
                  onChange={changeEventHandler}
                  required
                  className="
                    mt-2
                    bg-white/80 border-blue-100
                    focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                    focus-visible:border-[#1570EF]
                    transition-all
                  "
                  placeholder="Brief role summary"
                />
              </div>

              <div className="group">
                <Label className="text-blue-900">Requirements</Label>
                <Input
                  type="text"
                  name="requirements"
                  value={input.requirements}
                  onChange={changeEventHandler}
                  required
                  className="
                    mt-2
                    bg-white/80 border-blue-100
                    focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                    focus-visible:border-[#1570EF]
                    transition-all
                  "
                  placeholder="Key skills / tools"
                />
              </div>

              <div className="group">
                <Label className="text-blue-900">Hackathon Name</Label>
                <Input
                  type="text"
                  name="hackathonName"
                  value={input.hackathonName}
                  onChange={changeEventHandler}
                  required
                  className="
                    mt-2
                    bg-white/80 border-blue-100
                    focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                    focus-visible:border-[#1570EF]
                    transition-all
                  "
                  placeholder="e.g., CodeFest 2025"
                />
              </div>

              <div className="group">
                <Label className="text-blue-900">Hackathon Type</Label>
                <Input
                  type="text"
                  name="hackathonType"
                  value={input.hackathonType}
                  onChange={changeEventHandler}
                  required
                  className="
                    mt-2
                    bg-white/80 border-blue-100
                    focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                    focus-visible:border-[#1570EF]
                    transition-all
                  "
                  placeholder="e.g., Intra-college / National"
                />
              </div>

              <div className="group">
                <Label className="text-blue-900">No. of Participants Required</Label>
                <Input
                  type="number"
                  name="position"
                  value={input.position}
                  onChange={changeEventHandler}
                  min={1}
                  required
                  className="
                    mt-2
                    bg-white/80 border-blue-100
                    focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                    focus-visible:border-[#1570EF]
                    transition-all
                  "
                  placeholder="e.g., 3"
                />
              </div>

              <div className="group">
                <Label className="text-blue-900">Experience Level</Label>
                <Input
                  type="text"
                  name="experienceLevel"
                  value={input.experienceLevel}
                  onChange={changeEventHandler}
                  required
                  className="
                    mt-2
                    bg-white/80 border-blue-100
                    focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                    focus-visible:border-[#1570EF]
                    transition-all
                  "
                  placeholder="e.g., Beginner / Intermediate / Advanced"
                />
              </div>

              <div className="group">
                <Label className="text-blue-900 mb-1 block">Select Team</Label>
                {hasTeams ? (
                  <Select onValueChange={selectChangeHandler}>
                    <SelectTrigger
                      className="
                        w-full mt-2 bg-white/80 border-blue-100
                        hover:border-[#1570EF]/60
                        focus-visible:ring-2 focus-visible:ring-[#1570EF]/30
                        focus-visible:border-[#1570EF]
                        transition-all
                      "
                    >
                      <SelectValue placeholder="Choose your team" />
                    </SelectTrigger>
                    <SelectContent
                      className="
                        bg-white/95 backdrop-blur
                        border border-blue-100/70
                        shadow-[0_10px_30px_rgba(15,70,140,.18)]
                        rounded-xl
                      "
                    >
                      <SelectGroup>
                        {teams.map((team) => (
                          <SelectItem
                            key={team?._id}
                            value={team?.name?.toLowerCase()}
                            className="
                              focus:bg-[#EEF5FF]
                              data-[highlighted]:bg-[#EEF5FF]
                              data-[state=checked]:bg-[#EAF3FF]
                              rounded-lg
                            "
                          >
                            {team?.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <div className="text-xs font-semibold text-red-600 mt-2">
                    * Please register a Team before posting a role
                  </div>
                )}
              </div>
            </div>

            {/* Submit */}
            <div className="mt-6">
              <Button
                type="submit"
                disabled={loading || !isValid || !hasTeams}
                className="
                  relative w-full h-11
                  bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                  text-white font-semibold
                  shadow-md
                  transition-all
                  hover:opacity-95
                  disabled:opacity-60
                  overflow-hidden
                "
              >
                {/* radiant shine on hover */}
                <span className="relative z-10">
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Please wait
                    </span>
                  ) : (
                    "Announce New Role"
                  )}
                </span>
                <span
                  className="
                    pointer-events-none absolute inset-0 -translate-x-full
                    bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent)]
                    transition-transform duration-700 ease-out
                    hover:translate-x-full
                  "
                />
              </Button>

              {!hasTeams && (
                <p className="text-xs text-red-600 font-bold text-center my-3">
                  * Please register the Team to post the Role
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
