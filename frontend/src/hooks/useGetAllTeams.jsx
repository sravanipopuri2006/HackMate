import { setSingleTeam } from "@/redux/roleSlice";
import React, { useEffect } from "react";  
import { useDispatch } from "react-redux";
import axios from "axios";
import { ROLE_API_END_POINT } from "@/utils/constant";
import { setGroups, setSingleTeam } from "@/redux/teamSlice";

const  useGetAllTeams= () => {
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchTeams = async () => {
            try {
                const res = await axios.get(`${ROLE_API_END_POINT}/get`, {withCredentials: true});
                if (res.data.success){
                    dispatch(setGroups(res.data.hackteams));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchTeams();
    },[]);
}

export default useGetAllTeams;