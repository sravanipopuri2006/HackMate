
import { useEffect } from "react";  
import { useDispatch } from "react-redux";
import axios from "axios";
import { TEAM_API_END_POINT } from "@/utils/constant";
import { setGroups } from "@/redux/teamSlice";

const  useGetAllTeams= () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await axios.get(`${TEAM_API_END_POINT}/get`, {withCredentials: true});
                if (res.data.success){
                    dispatch(setGroups(res.data.teams));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchTeams();
    },[]);
}

export default useGetAllTeams;