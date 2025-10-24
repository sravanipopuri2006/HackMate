import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/roleSlice';

const category = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Data Scientist',
  'UI/UX Designer',
  'Mobile Developer',
  'DevOps Engineer',
  'Graphic Designer',
];

const CategoryCarousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const searchRoleHandler = (query) => {
    dispatch(setSearchedQuery(query));
    navigate('/browse');
  };

  return (
    <div className="my-20 w-full max-w-3xl mx-auto relative">
      <Carousel className="relative px-10"> {/* adds side padding for arrow spacing */}
        <CarouselContent className="flex items-center">
          {category.map((cat, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 flex justify-center"
            >
              <Button
                onClick={() => searchRoleHandler(cat)}
                className="rounded-full text-blue-900 border border-blue-300 bg-gradient-to-r from-[#5AA9FF] to-[#BEE3FF] hover:from-[#007BFF] hover:to-[#00A3FF] hover:text-white shadow-md transition-all duration-300"
              >
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>

        {/* Adjusted Navigation Buttons */}
        <CarouselPrevious
          className="absolute -left-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300 shadow-sm rounded-full cursor-pointer transition duration-300"
        />
        <CarouselNext
          className="absolute -right-3 top-1/2 -translate-y-1/2 z-10 w-9 h-9 flex items-center justify-center bg-blue-100 hover:bg-blue-200 text-blue-700 border border-blue-300 shadow-sm rounded-full cursor-pointer transition duration-300"
        />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
