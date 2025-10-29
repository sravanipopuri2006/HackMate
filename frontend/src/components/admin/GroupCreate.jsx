import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleTeam } from "@/redux/teamSlice";
import axios from "axios";
import { TEAM_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const GroupCreate = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [teamName, setTeamName] = useState("");
  const [loading, setLoading] = useState(false);

  const registerNewTeam = async () => {
    if (!teamName.trim()) {
      toast.error("Please enter a team name.");
      return;
    }
    setLoading(true);
    try {
      const res = await axios.post(
        `${TEAM_API_END_POINT}/register`,
        { teamName },
        { headers: { "Content-Type": "application/json" }, withCredentials: true }
      );

      if (res?.data?.success) {
        dispatch(setSingleTeam(res.data.hackTeam));
        toast.success(res.data.message || "Team created!");
        navigate(`/admin/hackteam/${res?.data?.hackTeam?._id}`);
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "Failed to create team.");
      // console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      {/* Page wrapper with spacing for fixed navbar */}
      <div className="min-h-screen bg-[linear-gradient(180deg,#F5FAFF_0%,#EAF3FF_30%,#E8F1FF_100%)] pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-[#0B2C5E]">
              Create Your Team
            </h1>
            <p className="mt-2 text-[#1f3b6b]/80">
              Choose a name for your team. You can change it later anytime.
            </p>
          </div>

          {/* Card */}
          <div
            className="
              group rounded-2xl p-[1px]
              bg-gradient-to-br from-[#cfe4ff] via-[#e9f3ff] to-[#c0dbff]
              shadow-[0_10px_30px_rgba(15,70,140,.12)]
              hover:shadow-[0_18px_44px_rgba(15,70,140,.22)]
              transition-shadow
            "
          >
            <div
              className="
                relative rounded-2xl bg-white/75 backdrop-blur-xl
                border border-white/60 p-6 md:p-7
              "
            >
              {/* Title row inside card */}
              <div className="mb-5">
                <h2 className="text-xl font-bold text-[#0B2C5E]">Your Team Name</h2>
                <p className="text-sm text-[#1f3b6b]/70 mt-1">
                  Make it short, memorable, and unique.
                </p>
              </div>

              {/* Input */}
              <div className="space-y-2">
                <Label
                  htmlFor="teamName"
                  className="text-[#0B2C5E] font-medium"
                >
                  Team Name
                </Label>
                <div className="relative">
                  <Input
                    id="teamName"
                    type="text"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    placeholder="e.g., Web Spiders"
                    className="
                      h-11 bg-white/90 border border-[#cfe4ff]
                      text-[#0B2C5E] placeholder:text-[#1f3b6b]/50
                      rounded-xl shadow-sm
                      focus-visible:ring-0 focus-visible:border-[#1570EF]
                      transition-all
                    "
                    onKeyDown={(e) => e.key === "Enter" && registerNewTeam()}
                  />

                  {/* animated focus glow */}
                  <span
                    className="
                      pointer-events-none absolute inset-0 rounded-xl
                      ring-2 ring-transparent
                      focus-within:ring-[#1570EF]/30
                      transition-all duration-300
                    "
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="mt-6 flex items-center gap-3">
                <Button
                  variant="outline"
                  className="
                    h-11 rounded-xl border-[#cfe4ff] bg-white/85 text-[#0B2C5E]
                    hover:bg-white hover:shadow-md hover:-translate-y-[1px]
                    transition-all
                  "
                  onClick={() => navigate("/admin/hackteam")}
                >
                  Cancel
                </Button>

                <Button
                  onClick={registerNewTeam}
                  disabled={loading}
                  className="
                    h-11 rounded-xl px-6 relative overflow-hidden
                    bg-gradient-to-r from-[#1570EF] to-[#54A7FF]
                    text-white shadow-md
                    hover:opacity-95 hover:-translate-y-[1px] active:scale-[0.98]
                    transition-all
                  "
                >
                  <span className="relative z-10">
                    {loading ? "Creating..." : "Continue"}
                  </span>
                  {/* shine */}
                  <span
                    className="
                      pointer-events-none absolute inset-0 -translate-x-full
                      bg-[linear-gradient(120deg,transparent,rgba(255,255,255,.45),transparent)]
                      transition-transform duration-700 ease-out
                      group-hover:translate-x-full
                    "
                  />
                </Button>
              </div>

              {/* Subtle footer line */}
              <div className="mt-6 h-[2px] w-full bg-gradient-to-r from-[#2E6BFF] to-[#00A2FF] rounded-full opacity-70" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GroupCreate;
