import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setSearchedQuery } from "@/redux/roleSlice";

const category = [
  "Frontend Developer",
  "Backend Developer",
  "Full Stack Developer",
  "Data Scientist",
  "UI/UX Designer",
  "Mobile Developer",
  "DevOps Engineer",
  "Graphic Designer",
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchRoleHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-full max-w-3xl mx-auto relative bg-transparent">
      <Carousel className="relative px-10">
        <CarouselContent className="flex items-center">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center">
              <Button
                onClick={() => searchRoleHandler(cat)}
                className="rounded-full text-blue-900 bg-white/70 border border-blue-200 backdrop-blur-sm shadow-sm hover:bg-white hover:text-[#0078D7] transition-all duration-300">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white text-blue-700 border border-blue-200 shadow-sm rounded-full cursor-pointer transition duration-300"/>
        <CarouselNext className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-white/70 hover:bg-white text-blue-700 border border-blue-200 shadow-sm rounded-full cursor-pointer transition duration-300"/>
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
