import React, { useEffect, useState } from 'react';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/roleSlice';

const filterData = [
  {
    filterType: 'Experience Level',
    array: ['Beginner', 'Intermediate', 'Advanced'],
  },
  {
    filterType: 'Role',
    array: [
      'Frontend Developer',
      'Back End Developer',
      'Full Stack Developer',
      'ML Engineer',
      'UI/UX Designer',
      'API Integration Specialist',
      'Data Engineer',
    ],
  },
  {
    filterType: 'Technical Events',
    array: ['Hackathon', 'Symphosium', 'Technical conference', 'Paper Presentation'],
  },
];

export const FilterCard = () => {
  const dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState('');

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue, dispatch]);

  return (
    <div
      className="
        w-full rounded-2xl border border-white/20
        bg-gradient-to-br from-[#1570EF]/95 via-[#1B7FFF]/90 to-[#54A7FF]/90
        p-6 shadow-[0_8px_32px_rgba(10,70,160,0.25)]
        backdrop-blur-xl
        text-white
      "
    >
      <h2 className="text-2xl font-extrabold tracking-wide">Filter Events</h2>
      <p className="text-sm opacity-90">Refine by level, role & event type</p>

      <div className="my-4 h-px bg-white/30" />

      <RadioGroup
        value={selectedValue}
        onValueChange={setSelectedValue}
        className="space-y-6"
      >
        {filterData.map((section, sIdx) => (
          <div key={section.filterType}>
            <h3 className="mb-2 text-sm font-bold uppercase tracking-wide text-white/90">
              {section.filterType}
            </h3>

            <div className="space-y-2">
              {section.array.map((item, iIdx) => {
                const id = `filter-${sIdx}-${iIdx}`;
                return (
                  <div key={id} className="flex items-center space-x-3">
                    <RadioGroupItem
                      id={id}
                      value={item}
                      className="
                        border-white/70 text-white
                        data-[state=checked]:bg-white
                        data-[state=checked]:text-[#1570EF]
                        focus:ring-white/50
                      "
                    />
                    <Label
                      htmlFor={id}
                      className="
                        cursor-pointer text-[15px] text-white hover:text-white/80
                        transition-colors
                      "
                    >
                      {item}
                    </Label>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
