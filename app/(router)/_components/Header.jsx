"use client"
import { Button } from '@/components/ui/button'
import { UserButton, useUser } from '@clerk/nextjs'
import { BellDot, Search, Menu, X } from 'lucide-react'
import Link from 'next/link'
import React, { useState } from 'react'
import SideNav from './SideNav' // Adjust the import based on your project structure

function Header() {
  const { user, isLoaded } = useUser();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <div className='p-4 bg-white flex justify-between items-center'>
        {/* Sidebar Toggle Button for Mobile */}
        <button className='md:hidden' onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
          {isSidebarOpen ? <X className='h-6 w-6' /> : <Menu className='h-6 w-6' />}
        </button>

        {/* Search bar */}
        <div className='flex gap-2 border p-2 rounded-md'>
          <Search className='h-5 w-5' />
          <input type="text" placeholder='Search...' className='outline-none' />
        </div>

        {/* Get Started Button & Bell Icon */}
        <div className='flex items-center gap-4'>
          <BellDot className='text-gray-500' />
          {isLoaded && user
            ? <UserButton afterSignOutUrl='/courses' />
            : <Link href={'/sign-in'}>
                <Button>რეგისტრაცია</Button>
              </Link>}
        </div>
      </div>

      {/* Sidebar for Mobile View */}
      <SideNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
    </>
  )
}

export default Header
