import { setAllRoles } from "@/redux/roleSlice";
import React, { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { ROLE_API_END_POINT } from "@/utils/constant";

const useGetAllRoles = () => {
    const dispatch = useDispatch();
    const {searchedQuery}=useSelector(store=>store.role);
    useEffect(() => {
        const fetchAllRoles = async () => {
            try {
                const res = await axios.get(`${ROLE_API_END_POINT}/get?keyword=${searchedQuery}`,{ withCredentials: true });
                if (res.data.success){
                    dispatch(setAllRoles(res.data.roles));
                }
            } catch (error) {
                console.error('Error fetching roles:', error);
            }
        }
        fetchAllRoles();
    },[searchedQuery]);
}

export default useGetAllRoles