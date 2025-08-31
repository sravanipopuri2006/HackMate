import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';

const category =[
    "Frontend Developer",
    "Backend Developer",
    "Full Stack Developer",
    "Data Scientist",
    "UI/UX Designer",
    "Mobile Developer",
    "DevOps Engineer",
    "Graphic Designer"
]

const CategoryCarousel = () => {

    return (    
        <div>
            <Carousel className='w-full max-w-xl mx-auto my-20'>
                <CarouselContent>
                    {
                        category.map((cat,index)=>(
                            <CarouselItem className='md:basis-1/2 lg:basis-1/3'>
                                <Button variant='outline'className='rounded-full'>{cat}</Button>

                            </CarouselItem>

                        ))
                    }
                  
                </CarouselContent>
                <CarouselPrevious className='cursor-pointer'/>
                <CarouselNext className='cursor-pointer'/>
            </Carousel>
            
        </div>
    )
}

export default CategoryCarousel