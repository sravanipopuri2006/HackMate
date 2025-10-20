import React from 'react';
import { Button } from './ui/button';
import { Bookmark } from 'lucide-react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { HACKATHON_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import axios from 'axios';
import { setHackathons } from '@/redux/hackathonSlice';

export const HackathonCard = ({ hackathon }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);
  const hackathonId = hackathon?._id;

  // Utility: get how many days ago it was created
  const getTime = (mongoTime) => {
    const createdAt = new Date(mongoTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    return days === 0 ? "Today" : `${days} days ago`;
  };

  const isOwner = user?._id === hackathon?.userId;

  const handleEdit = () => {
    navigate(`edit/${hackathonId}`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${HACKATHON_API_END_POINT}/delete/${hackathonId}`, {
        withCredentials: true,
      });
      toast.success("Hackathon deleted successfully");

    
      const res = await axios.get(`${HACKATHON_API_END_POINT}/get`,{withCredentials:true});
      dispatch(setHackathons(res.data.hackathons));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete hackathon");
    }
  };

  return (
    <div className="w-full max-w-lg p-5 rounded-md shadow-xl bg-white border border-gray-100 overflow-x-hidden">

      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{getTime(hackathon?.createdAt)}</p>
        <Button variant="outline" className="rounded-full" size="icon">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-3 my-3">
        <div>
          <h1 className="font-medium text-lg">{hackathon?.name}</h1>
          <p className="text-sm text-gray-500">Saveetha Engineering College</p>
        </div>
      </div>


      <p className="text-sm text-gray-600 break-words">
        {hackathon?.description}
      </p>


      <div className="flex flex-wrap items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="ghost">
          {hackathon?.hackathonlevel}
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="ghost">
          {hackathon?.date}
        </Badge>
        <Badge className="text-green-700 font-bold" variant="ghost"><a href={hackathon?.website} target="_blank">Visit website</a></Badge>
      </div>



      {isOwner && (
        <div className="flex flex-wrap items-center gap-4 mt-4">
          <Button onClick={handleDelete} variant="outline">
            Delete
          </Button>
          <Button onClick={handleEdit} className="bg-[#7209b7] text-white">
            Edit
          </Button>
        </div>
      )}
    </div>
  );
};

export default HackathonCard;

