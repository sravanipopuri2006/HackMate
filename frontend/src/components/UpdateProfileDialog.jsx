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
import { USER_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/authSlice"; // adjust path if different

export default function UpdateProfileDialog({ open, setOpen }) {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills?.join(" ") || "",
    file: null,
  });

  // handle input change
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // handle file input
  const fileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // handle form submit
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("bio", input.bio);
    formData.append("skills", input.skills);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      const res = await axios.post(
        `${USER_API_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        console.log(input);
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
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>

          <form onSubmit={onSubmitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="fullname" className="text-right">
                  Name
                </Label>
                <Input
                  id="fullname"
                  name="fullname"
                  className="col-span-3"
                  value={input.fullname}
                  onChange={changeEventHandler}
                  type="text"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  className="col-span-3"
                  value={input.email}
                  onChange={changeEventHandler}
                  type="email"
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phoneNumber" className="text-right">
                  Number
                </Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  className="col-span-3"
                  value={input.phoneNumber}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                  id="bio"
                  name="bio"
                  className="col-span-3"
                  value={input.bio}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input
                  id="skills"
                  name="skills"
                  className="col-span-3"
                  value={input.skills}
                  onChange={changeEventHandler}
                />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input
                  id="file"
                  name="file"
                  className="col-span-3"
                  type="file"
                  accept="application/pdf"
                  onChange={fileHandler}
                />
              </div>
            </div>

            <DialogFooter>
              {loading ? (
                <Button className="w-full my-4 cursor-pointer" disabled>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button type="submit" className="w-full my-4 cursor-pointer">
                  Update
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

