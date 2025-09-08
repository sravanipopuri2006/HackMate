import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Users, CalendarDays, Building2, Briefcase, ClipboardList } from "lucide-react";
import React from "react";

const TeamsDescription = () => {
  const isApplied = false;

  return (
    <div className="max-w-5xl mx-auto my-10 px-4">
      {/* Header Card */}
      <Card className="rounded-2xl shadow-lg border border-gray-200">
        <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Frontend Developer
            </CardTitle>
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <Badge className="text-blue-700 font-semibold px-3 py-1" variant="secondary">
                2 positions
              </Badge>
              <Badge className="text-[#F83002] font-semibold px-3 py-1" variant="secondary">
                Smart India Hackathon
              </Badge>
              <Badge className="text-[#7209b7] font-semibold px-3 py-1" variant="secondary">
                Intermediate
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
              <DetailItem icon={<Briefcase />} label="Role" value="Frontend Developer" />
              <DetailItem icon={<ClipboardList />} label="Hackathon" value="Smart India Hackathon" />
              <DetailItem
                icon={<Users />}
                label="Total Applicants"
                value="4"
              />
            </div>
            <div className="space-y-3">
              <DetailItem icon={<Building2 />} label="College" value="Saveetha Engineering College" />
              <DetailItem icon={<CalendarDays />} label="Posted Date" value="17.09.2025" />
              <DetailItem icon={<Briefcase />} label="Knowledge Level" value="Intermediate" />
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-gray-800 mb-1">Description:</h3>
            <p className="text-gray-600 leading-relaxed">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
              incidunt quasi eum dolorum dolor accusantium dolorem quos earum iure
              veritatis quo perspiciatis praesentium doloremque exercitationem,
              possimus at impedit. Voluptatum, dolor!
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
