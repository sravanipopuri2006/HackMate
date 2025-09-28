import { setSingleTeam } from "@/redux/roleSlice";
import React, { useEffect } from "react";  
import { useDispatch } from "react-redux";
import axios from "axios";
import { ROLE_API_END_POINT } from "@/utils/constant";
import { setSingleTeam } from "@/redux/teamSlice";

const  useGetTeamById= (teamId) => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchSingleTeam = async () => {
            try {
                const res = await axios.get(`${ROLE_API_END_POINT}/get/${teamId}`, {withCredentials: true});
                if (res.data.success){
                    dispatch(setSingleTeam(res.data.hackteam));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchSingleTeam();
    },[teamId, dispatch]);
}

export default useGetTeamById;