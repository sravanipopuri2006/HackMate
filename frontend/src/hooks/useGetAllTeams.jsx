import { TEAM_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import { useEffect } from 'react'

const useGetAllTeams = () => {
    useEffect(()=>{
        const fetchAllTeams=async()=>{
            try{
                const res=await axios.get(`${TEAM_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatchEvent(setAllTeams(res.data.hackteam));
                }
            }
            catch(error){
                console.log(error);
            }
        }
        fetchAllTeams();
    },[])
 
}

export default useGetAllTeams

