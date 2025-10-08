import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { Select, SelectValue,SelectTrigger, SelectItem,SelectContent,SelectGroup } from '../ui/select';


const roleArray=[];



export default function PostRole() {
    const [input, setInput] = useState({
        title: "",
        description: "",
        requirements: "",
        hackathonName: "",
        hackathonType: "",
        position: 0,
        experienceLevel: "",
        hackTeamId: ""
    });
    const {teams}=useSelector(store=>store.hackteam);

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const selectChangeHandler=(value)=>{
        const selectedTeam=teams.find((team)=>team.name.toLowerCase()===value);
        setInput({...input,hackTeamId:selectedTeam._id});
    };

    const submitHandler = (e) => {
                e.preventDefault();
                console.log(input);
    }
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center w-screen'>
                <form onSubmit = {submitHandler} className='p-8 max-w-4xl border border-gray-200 shadow-lg rounded-md'>
                <div className='grid grid-cols-2 gap-2'>
                    <div>
                        <Label>Title</Label>
                        <Input type="text" name="title" value={input.title} className='focus-visible:ring-offest-0 focus-visible:ring-offset-0 mt-2' onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Description</Label>
                        <Input type="text" name="description" value={input.description} className='focus-visible:ring-offest-0 focus-visible:ring-offset-0 mt-2' onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Requirements</Label>
                        <Input type="text" name="requirements" value={input.requirements} className='focus-visible:ring-offest-0 focus-visible:ring-offset-0 mt-2' onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Hackathon Name</Label>
                        <Input type="text" name="hackathonName" value={input.hackathonName} className='focus-visible:ring-offest-0 focus-visible:ring-offset-0 mt-2' onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Hackathon Type</Label>
                        <Input type="text" name="hackathonType" value={input.hackathonType} className='focus-visible:ring-offest-0 focus-visible:ring-offset-0 mt-2' onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>No .of Participants Required:</Label>
                        <Input type="number" name="position" value={input.position} className='focus-visible:ring-offest-0 focus-visible:ring-offset-0 mt-2' onChange={changeEventHandler} />
                    </div>
                    <div>
                        <Label>Experience Level</Label>
                        <Input type="text" name="experienceLevel" value={input.experienceLevel} className='focus-visible:ring-offest-0 focus-visible:ring-offset-0 mt-2' onChange={changeEventHandler} />
                    </div>
                    <div className='mt-2'>
                        <Label className='mb-1'>Select Team</Label>
                    {
                        teams.length>=0 && (
                                    <Select onValueChange={selectChangeHandler}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select The Team" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                {
                                                    teams.map((team)=>{
                                                        return(
                                                            <SelectItem value={team?.name?.toLowerCase()}>{team.name}</SelectItem>
                                                        )
                                                    })
                                                }

                                            </SelectGroup>
                                          
                                        </SelectContent>
                                    </Select>
                        )
                    }
                    </div>



                </div>
                <Button className='w-full wt-4 mt-4'>Announce New Role</Button>
                {
                    roleArray.length==0 && <p className='text-xs text-red-600 font-bold text-center my-3'>*Please Register the Team to Post the Role</p>
                }
                </form>

            </div>
            

        </div>
    )
}
