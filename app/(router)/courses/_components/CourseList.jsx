import GlobalApi from '@/app/_utils/GlobalApi';
import React, { useEffect, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import CourseItem from './CourseItem';
import ManualCourseItem from './CourseItem';
import Link from 'next/link';

const manualCourses = [
  {
    name: 'მიმღები კონსიერჟი',
    author: 'AIskill',
    chapter: Array(12).fill('Chapter'), // Array with 12 chapters
    free: true,
  },
  {
    name: 'მიმტანის გადამზადება',
    author: 'AIskill',
    chapter: Array(16).fill('Chapter'), // Array with 12 chapters
    free: true,
  },
  {
    name: 'დამლაგებელის გადამზადების პროგრამა',
    author: 'Tubeguruji',
    chapter: Array(19).fill('Chapter'), // Array with 12 chapters
    free: true,
  },
];

function CourseList() {
  const [courseList, setCourseList] = useState([]);

  useEffect(() => {
    getAllCourses();
  }, []);

  // Fetch Course List
  const getAllCourses = () => {
    GlobalApi.getAllCourseList().then(resp => {
      setCourseList(resp?.courseLists);
    });
  };

  return (
    <div className='p-5 bg-white rounded-lg mt-3'>
      {/* Title and Filter */}
      <div className='flex items-center justify-between'>
        <h2 className='text-[20px] font-bold text-primary'>ყველა კურსი</h2>
        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="light">ყველა</SelectItem>
            <SelectItem value="dark">მიმტანი</SelectItem>
            <SelectItem value="system">კონსიერჟი</SelectItem>
            <SelectItem value="system">ბელბოი</SelectItem>
            <SelectItem value="system">კონსულტანტი</SelectItem>
          </SelectContent>
        </Select>
      </div>
      {/* Display Course List */}
      <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4'>
        {/* Display Manual Courses */}
        {manualCourses.map((course, index) => (
          <CourseItem key={index} course={course} />
        ))}
      </div>
    </div>
  );
}

export default CourseList;

