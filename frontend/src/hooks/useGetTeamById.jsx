
import { useEffect } from "react";  
import { useDispatch } from "react-redux";
import axios from "axios";
import { TEAM_API_END_POINT } from "@/utils/constant";
import { setSingleGroup } from "@/redux/teamSlice";

const  useGetTeamById= (teamId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleTeam = async () => {
            try {
                const res = await axios.get(`${TEAM_API_END_POINT}/get/${teamId}`, {withCredentials: true});
                if (res.data.success){
                    dispatch(setSingleGroup(res.data.teams));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchSingleTeam();
    },[teamId, dispatch]);
}

export default useGetTeamById;