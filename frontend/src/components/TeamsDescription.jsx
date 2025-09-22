import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, CalendarDays, Building2, Briefcase, ClipboardList } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setSingleRole } from "@/redux/roleSlice";
import { ROLE_API_END_POINT } from "@/utils/constant";

const TeamsDescription = ({role}) => {
    const {singleRole}=useSelector(store=>store.role);
    const user=useSelector(store=>store.user);

    const isApplied = user?._id
  ? singleRole?.applications?.some(app => 
      app.hackApplicant?.toString() === user._id ||  
      app.hackApplicant?._id?.toString() === user._id 
    )
  : false;

    console.log(isApplied);

  const params=useParams();
  const roleId=params.id;
  const dispatch=useDispatch();
  


  useEffect(() => {
        const fetchSingleRole = async () => {
            try {
                const res = await axios.get(`${ROLE_API_END_POINT}/get/${roleId}`, {withCredentials: true});
                console.log(res);
                if (res.data.success){
                    dispatch(setSingleRole(res.data.role));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchSingleRole();
    },[roleId,dispatch,user?._id])

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Header Card */}
      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {singleRole?.title}
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge className="text-blue-700 font-semibold px-3 py-1" variant="secondary">
                Positions: {singleRole?.position}
              </Badge>
              <Badge className="text-[#F83002] font-semibold px-3 py-1" variant="secondary">
                {singleRole?.hackathonName}
              </Badge>
              <Badge className="text-[#7209b7] font-semibold px-3 py-1" variant="secondary">
                {singleRole?.experienceLevel}
              </Badge>
            </div>
          </div>
          <Button
            disabled={isApplied}
            className={`px-6 py-2 rounded-xl shadow-md transition-all ${
              isApplied
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-[#7289b7] to-[#5f32ad] hover:opacity-90 text-white"
            }`}
          >
            {isApplied ? "Already Applied" : "Apply Now"}
          </Button>
        </CardHeader>
      </Card>

      {/* Details Section */}
      <Card className="mt-6 rounded-2xl shadow-lg border border-gray-200">
        <CardContent className="p-6 space-y-5">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
          Team Description
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <DetailItem icon={<Briefcase />} label="Role" value={singleRole?.title} />
              <DetailItem icon={<ClipboardList />} label="Hackathon" value={singleRole?.hackathonName} />
              <DetailItem
                icon={<Users />}
                label="Total Applicants"
                value={singleRole?.applications?.length}
              />
            </div>
            <div className="space-y-3">
              <DetailItem icon={<Building2 />} label="College" value="Saveetha Engineering College" />
              <DetailItem icon={<CalendarDays />} label="Posted Date" value={singleRole?.createdAt.split("T")[0]} />
              <DetailItem icon={<Briefcase />} label="Knowledge Level" value={singleRole?.experienceLevel} />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Description:</h3>
            <p className="text-gray-600 leading-relaxed">
              {singleRole?.description}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const DetailItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-3">
    <div className="text-[#5f32ad]">{icon}</div>
    <p className="font-medium text-gray-700">
      {label}: <span className="font-normal text-gray-600">{value}</span>
    </p>
  </div>
);

export default TeamsDescription;
