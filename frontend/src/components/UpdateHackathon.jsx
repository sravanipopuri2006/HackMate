import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { HACKATHON_API_END_POINT } from "@/utils/constant.js";
import { Loader2 } from "lucide-react";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";

export default function UpdateHackathon() {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const navigate=useNavigate();
  const [input, setInput] = useState({
    name: "",
    description: "",
    hackathonlevel: "",
    website: "",
    date: "",
  });

  useEffect(() => {
    const fetchHackathon = async () => {
      try {
        
        const res = await axios.get(`${HACKATHON_API_END_POINT}/get/${id}`, {
          withCredentials: true,
        });
        setInput(res.data.hackathon);

      } catch (error) {
        toast.error("Failed to load hackathon!");
        
      } finally {
        setLoading(false);
      }
    };
    fetchHackathon();
  }, [id]);

  const changeEventHandler = (e) =>
    setInput({ ...input, [e.target.name]: e.target.value });

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.put(
        `${HACKATHON_API_END_POINT}/update/${id}`,
        input,
        { withCredentials: true }
      );
      toast.success("Hackathon updated!");
      navigate("/hackathons");
    } catch (error) {
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 border p-6 rounded">
      <h2 className="text-xl font-bold mb-4">Update Hackathon</h2>
      <form onSubmit={onSubmitHandler} className="space-y-4">
        <div>
          <Label>Name</Label>
          <Input name="name" value={input.name} onChange={changeEventHandler} />
        </div>
        <div>
          <Label>Description</Label>
          <Input
            name="description"
            value={input.description}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label>Website</Label>
          <Input
            name="website"
            value={input.website}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label>Level</Label>
          <Input
            name="hackathonlevel"
            value={input.hackathonlevel}
            onChange={changeEventHandler}
          />
        </div>
        <div>
          <Label>Date</Label>
          <Input
            name="date"
            value={input.date}
            onChange={changeEventHandler}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Updating...
            </>
          ) : (
            "Update"
          )}
        </Button>
      </form>
    </div>
  );
}
