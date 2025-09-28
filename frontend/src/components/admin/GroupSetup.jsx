import React, { useState } from 'react'
import Navbar from '../shared/Navbar'
import { Button } from '../ui/button'
import { ArrowLeft } from 'lucide-react'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { TEAM_API_END_POINT } from '@/utils/constant'
import { useParams ,useNavigate} from 'react-router-dom'
import { toast } from 'sonner'

export default function GroupSetup() {
  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    hackathonlevel: "",
    file: null

  });
  const navigate=useNavigate();
  const[loading,setLoading]=useState(false);
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  }
  const changeFileHandler=(e)=>{
    const file=e.target.files?.[0];
    setInput({...input,file});
  }
  const submitHandler=async(e)=>{
    const params=useParams();
    e.preventDefault();
    const formData=new FormData();
    formData.append("name",input.name);
    formData.append("description",input.description);
    formData.append("website",input.website);
    formData.append("hackathonlevel",input.hackathonlevel);
    if(input.file){
      formData.append({...input,file});
    }
    try{
      setLoading(true);
      const res=await axios.put(`${TEAM_API_END_POINT}/update/${params.id}`,formData,{
        headers:{
          'Content-Type':'multipart/form-data'
        },
        withCredentials:true

      });
      if(res.data.success){
        toast.success(res.data.message);
        navigate("/admin/hackteam");

      }
    }
    catch(error){
      console.log(error);
      toast.error(error.response.data.message);

    }
    finally{
      setLoading(false);
    }

  }
  useEffect(()=>{
    setInput({
      name: "",
    description: "",
    website: "",
    hackathonlevel: "",
    file: null

    })
  })

  return (
    <div>
      <Navbar />
      <div className='max-w-xl mx-auto my-10'>
        <form action="" onSubmit={submitHandler}>
          <div className='flex itens-center gap-5 p-8'>
            <Button onClick={()=>navigate("/admin/hackteam")} variant="outline" className='flex items-center gap-2 text-gray-500 font-semibold' >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className='font-bold text-xl'>Team Setup</h1>

          </div>
          <div className='grid grid-cols-2 gap-4' >
            <Label>Team Name</Label>
            <Input value={input.name} onChange={changeEventHandler} type="text" name="name"></Input>

          </div>
          <div className='grid grid-cols-2 gap-4 mt-2' >
            <Label>Team Description</Label>
            <Input value={input.description} onChange={changeEventHandler} type="text" name="description"></Input>

          </div>
          <div className='grid grid-cols-2 gap-4 mt-2' >
            <Label>Hackathon Website</Label>
            <Input value={input.website} onChange={changeEventHandler} type="text" name="website"></Input>

          </div>
           <div className='grid grid-cols-2 gap-4 mt-2' >
            <Label>Hackathon Level</Label>
            <Input value={input.hackathonlevel} onChange={changeEventHandler} type="text" name="hackathonlevel"></Input>

          </div>
           <div className='grid grid-cols-2 gap-4 mt-2' >
            <Label>Team Logo</Label>
            <Input type="file" accept="image/*" onChange={changeFileHandler}></Input>

          </div>
           {
loading? <Button className='w-full my-4 cursor-pointer '><Loader2 className='mr2- h-4 w-4 animate-spin'/>Please wait </Button>: <Button type="submit" className='w-full my-4 cursor-pointer'>Update</Button>
            }
          



        </form>

      </div>
    </div>
  )
}
