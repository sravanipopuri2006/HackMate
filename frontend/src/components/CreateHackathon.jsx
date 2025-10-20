import React, { useState } from "react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { HACKATHON_API_END_POINT } from "@/utils/constant";
import { useNavigate } from "react-router-dom";

export default function CreateHackathon() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState({
    name: "",
    description: "",
    hackathonlevel: "",
    website: "",
    date: "",
  });

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(
        `${HACKATHON_API_END_POINT}/add`,
        input,
        { withCredentials: true }
      );
      toast.success("Hackathon created successfully!");
      navigate("/hackathons");
    } catch (error) {
      console.error(error);
      toast.error("Failed to create hackathon!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded-md shadow-md">
      <h2 className="text-xl font-bold mb-4 text-center">Create New Hackathon</h2>
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input
            name="name"
            value={input.name}
            onChange={changeEventHandler}
            placeholder="Enter hackathon name"
            required
          />
        </div>
        <div>
          <Label>Description</Label>
          <Input
            name="description"
            value={input.description}
            onChange={changeEventHandler}
            placeholder="Enter description"
            required
          />
        </div>
        <div>
          <Label>Website</Label>
          <Input
            name="website"
            value={input.website}
            onChange={changeEventHandler}
            placeholder="Enter website URL"
          />
        </div>
        <div>
          <Label>Level</Label>
          <Input
            name="hackathonlevel"
            value={input.hackathonlevel}
            onChange={changeEventHandler}
            placeholder="Beginner / Intermediate / Advanced"
          />
        </div>
        <div>
          <Label>Date</Label>
          <Input
            type="date"
            name="date"
            value={input.date}
            onChange={changeEventHandler}
            required
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full bg-[#0077b6] text-white">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
            </>
          ) : (
            "Create Hackathon"
          )}
        </Button>
      </form>
    </div>
  );
}

