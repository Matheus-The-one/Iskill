import Image from 'next/image';
import React from 'react';

function CourseItem({ course }) {
  return (
    <div className='border rounded-md hover:shadow-md hover:shadow-purple-300 cursor-pointer'>
      <div className='flex flex-col gap-1 p-2'>
        <h2 className='font-medium'>{course.name}</h2>
        <h2 className='text-[12px] text-gray-400'>{course.author}</h2>
        <div className='flex gap-2'>
          <Image
            src='/chapter.png'
            alt='chapter'
            width={20}
            height={20}
          />
          <h2 className='text-[14px] text-gray-400'>{course.chapter.length} Chapters</h2>
        </div>
        <h2 className='text-[15px]'>{course.free ? 'Free' : 'Paid'}</h2>
      </div>
    </div>
  );
}

export default CourseItem;
