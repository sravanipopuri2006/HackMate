import { setAllAppliedRoles } from '@/redux/roleSlice';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';

export const useGetAplliedRoles = () => {
    const dispatch=useDispatch();
    useEffect(()=>{
        const fetchAppliedRoles=async()=>{
            try{
                const res=await axios.post(`${APPLICATION_API_END_POINT}/get`,{withCredentials:true});
                console.log(res.data);
                if(res.data.success){
                    dispatch(setAllAppliedRoles(res.data.application));
                }
            }
            catch(error){
                console.log(error);

            }
        }
        fetchAppliedRoles();
    },[])
 
};
export default useGetAplliedRoles;
