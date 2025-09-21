import React from 'react'
import Navbar from './shared/Navbar'
import HeroSection from './HeroSection'
import CategoryCarousel from './CategoryCarousel'
import LatestTeams from './LatestTeams'
import Footer from './shared/Footer'
import useGetAllTeams from '@/hooks/useGetAllTeams'

export default function Home() {
  useGetAllTeams();

  return (
    <>
    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestTeams/>
    <Footer/> 


    </>
  )
}
