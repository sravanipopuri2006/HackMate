import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import { ApplicantsTable } from './ApplicantsTable'
import { useParams } from 'react-router-dom'
import { setAllApplicants } from '@/redux/applicationSlice'
import { useDispatch, useSelector } from 'react-redux'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import axios from 'axios'
import { Toaster } from '../ui/sonner'

export const Applicants = () => {
  const params=useParams();
  const dispatch=useDispatch();
  const {applicants}=useSelector(store=>store.application);
  console.log("Applicants....",applicants);
  useEffect(()=>{
    const fetchAllApplicants=async ()=>{
      try{

        const res=await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`,{withCredentials:true});

        dispatch(setAllApplicants(res.data.role));

        
      }catch(error){
        console.log(error);

      }

    }
    fetchAllApplicants();


  },[]);
  return (
    <div>
        <Navbar/>
        <div className='max-w-7xl mx-auto'>
            <h1 className='font-bold text-xl my-5'>No.of Applications {applicants?.applications?.length}</h1>
            <Toaster position="top-center" richColors />
            <ApplicantsTable/>
        </div>
    </div>
  )
}