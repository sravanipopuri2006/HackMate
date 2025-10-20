import { useEffect } from "react";  
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { HACKATHON_API_END_POINT } from "@/utils/constant";
import { setHackathons } from "@/redux/hackathonSlice";


const  useGetAllHackathons= () => {
    const dispatch = useDispatch();
    const {hackathons}=useSelector(store=>store.hackathon);
    useEffect(() => {
        const fetchHackathon = async () => {
            try {
                const res = await axios.get(`${HACKATHON_API_END_POINT }/get`, { withCredentials: true });
                console.log(res.data);
                if (res.data.success){
                    dispatch(setHackathons(res.data.hackathons));
                }
            } catch (error) {
                console.error('Error fetching :', error);
            }
        }
        fetchHackathon();
    },[]);
}

export default useGetAllHackathons;