import { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TEAM_API_END_POINT } from "@/utils/constant";
import { setTeams } from "@/redux/teamSlice";

const  useGetAllTeams= () => {
    const dispatch = useDispatch();
    const {searchedQuery}=useSelector(store=>store.role);
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await axios.get(`${TEAM_API_END_POINT}/get`, { withCredentials: true });
                console.log(res.data);
                if (res.data.success){
                    dispatch(setTeams(res.data.teams));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchTeams();
    },[]);
}

export default useGetAllTeams;