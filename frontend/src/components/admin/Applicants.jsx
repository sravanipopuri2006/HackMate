import React, { useEffect, useState } from "react";
import Navbar from "../shared/Navbar";
import { ApplicantsTable } from "./ApplicantsTable";
import { useParams } from "react-router-dom";
import { setAllApplicants } from "@/redux/applicationSlice";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { Toaster, toast } from "sonner";
import { Badge } from "../ui/badge";

export const Applicants = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchAllApplicants = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${APPLICATION_API_END_POINT}/${params.id}/applicants`,
          { withCredentials: true }
        );
        if (!cancelled) {
          dispatch(setAllApplicants(res.data.role));
        }
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          toast.error(
            error?.response?.data?.message || "Failed to fetch applicants"
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchAllApplicants();
    return () => {
      cancelled = true;
    };
  }, [params.id, dispatch]);

  const count = applicants?.applications?.length || 0;

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#F3F8FF_0%,#E8F2FF_50%,#F3F8FF_100%)]">
      <Navbar />

      {/* Page container (with fixed-navbar offset) */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-24 pb-10">
        {/* Header card */}
        <div
          className="
            relative overflow-hidden rounded-2xl
            border border-blue-100/70
            bg-white/70 backdrop-blur-md
            shadow-[0_8px_28px_rgba(15,70,140,.10)]
            hover:shadow-[0_14px_44px_rgba(15,70,140,.18)]
            transition-shadow duration-300
          "
        >
          {/* subtle gradient sheen */}
          <div className="pointer-events-none absolute inset-0 [background:radial-gradient(320px_180px_at_80%_-40%,rgba(21,112,239,.12),transparent_60%)]" />

          <div className="relative z-10 p-6 md:p-7 flex items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-[#0B2C5E]">
                Applicants
              </h1>
              <p className="mt-1 text-sm md:text-base text-[#1f3b6b]/80">
                Review and manage all candidates who applied to this role.
              </p>
            </div>

            {/* Animated count badge */}
            <Badge
              className="
                border-white/70 bg-white/90 text-[#1570EF]
                shadow-sm px-4 py-2 text-sm md:text-base
                transition-all
                hover:-translate-y-0.5 hover:shadow
              "
            >
              Total:&nbsp;
              <span className="font-bold">{count}</span>
            </Badge>
          </div>
        </div>

        {/* Content area */}
        <div
          className="
            mt-6 rounded-2xl border border-blue-100/70
            bg-white/80 backdrop-blur-xl
            shadow-[0_6px_22px_rgba(15,70,140,.08)]
            hover:shadow-[0_10px_30px_rgba(15,70,140,.14)]
            transition-shadow duration-300
          "
        >
          {/* Top bar */}
          <div className="flex items-center justify-between p-4 md:p-5 border-b border-blue-100/70">
            <div className="flex items-center gap-2">
              <span className="inline-block h-2 w-2 rounded-full bg-[#2E6BFF] animate-pulse" />
              <span className="text-[#1f3b6b]/85 text-sm md:text-base">
                {loading ? "Loading applicants…" : "Applicants loaded"}
              </span>
            </div>
          </div>

          {/* Table / Loader */}
          <div className="p-3 md:p-5">
            {loading ? (
              <div className="grid gap-3">
                {/* skeleton rows */}
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="h-12 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100/60 animate-pulse"
                  />
                ))}
              </div>
            ) : (
              <ApplicantsTable />
            )}
          </div>
        </div>
      </div>

      <Toaster position="top-center" richColors />
    </div>
  );
};
