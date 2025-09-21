import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestRoles from './LatestRoles'
import Footer from './shared/Footer'
import useGetAllRoles from '@/hooks/useGetAllRoles'

export default function Home() {
  useGetAllRoles();

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
