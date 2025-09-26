import React from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'

const GroupCreate = () => {
    const navigate = useNavigate(); 
    const [teamName, setTeamName] = useState();
    const registerNewTeam = async () => {
        try{
            const res = await axios.post(`${TEAM_API_END_POINT}/register`,{teamName}, {
                headers: {
                    'Content-Type': 'application/json',
            },
            withCredentials: true
            });
            if (res?.data?.success) {
                    toast.success(res.data.message);
                    const teamId = res?.data?.team?._id;
                    navigate(`/admin/hackteam/${teamId}`);
            }
        }
        catch(error)
        {
            console.log(error);
        }
    }
  return (
    <div>
        <Navbar/>
        <div className='max-w-4xl mx-auto'>
            <div className='my-10'>
                <h1 className='font-bold text-2xl'>Your Team Name</h1>
                <p className='text-gray-500'>What would you like to give your team name? You can change this later.</p>
            </div>
            <Label>Team Name</Label>
            <Input
            type="text"
            className='my-2'
            placeholder="Enter your team name"
            onChange={(e) => setTeamName(e.target.value)}
            />
            <div className='flex items-center gap-2 my-10'>
                <Button variant='outline' onClick={()=>navigate("/admin/hackteam")}>Cancel</Button>
                <Button onClick={registerNewTeam}>Continue</Button>     
            </div>
        </div>
    </div>
  )
}

export default GroupCreate