import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestRoles from './LatestRoles'
import Footer from './shared/Footer'
import useGetAllRoles from '@/hooks/useGetAllRoles'
import { useSelector } from 'react-redux'

export default function Home() {
  useGetAllRoles();
  const {user} = useSelector(store=>store.auth);
  const navigate = useNavigate();
  useEffect(()=>{
    if (user?.role == 'hackLead'){
      navigate("/admin/XXXX");
    }
  }, []);
  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestRoles/>
    <Footer/> 


    </>
  )
}
