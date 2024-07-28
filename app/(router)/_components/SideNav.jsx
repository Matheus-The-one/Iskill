"use client"
import { useUser } from '@clerk/nextjs'
import { BadgeCheck, BookOpen, GraduationCap, LayoutDashboard, Mail } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect } from 'react'

function SideNav({ setIsSidebarOpen }) {
  const { user } = useUser();

  const menu = [
    {
      id: 8,
      name: 'მართვის პანელი',
      icon: LayoutDashboard,
      path: '/dashboard',
      auth: user
    },
    {
      id: 1,
      name: 'ყველა კურსი',
      icon: BookOpen,
      path: '/courses',
      auth: true
    },
    {
      id: 2,
      name: 'ფასი და შეთავაზებები',
      icon: BadgeCheck,
      path: '/tubeguruji-pro',
      auth: true
    },
    {
      id: 3,
      name: 'ინსტრუქტორი',
      icon: GraduationCap,
      path: '/instructor',
      auth: true
    },
    {
      id: 5,
      name: 'კონტაქტი',
      icon: Mail,
      path: '/newsletter',
      auth: true
    }
  ]

  const path = usePathname();

  useEffect(() => {
    console.log("path", path)
  }, [path])

  return (
    <>
      {/* Sidebar */}
      <div className='fixed left-0 top-0 p-5 bg-white shadow-sm border h-screen w-64 z-50 transition-transform transform md:translate-x-0 ease-in-out duration-300'>
        <Image src='/loggo.png' alt='logo' width={70} height={70} className="hidden md:block" />
        <hr className='mt-7' />
        <div className='mt-5'>
          {menu.map((item) => item.auth && (
            <Link key={item.id} href={item.path}>
              <div className={`group flex gap-3 mt-2 p-3 text-[18px] items-center text-gray-500 cursor-pointer hover:bg-primary hover:text-white rounded-md transition-all ease-in-out duration-200 ${path.includes(item.path) && 'bg-primary text-white'}`}>
                <item.icon className='group-hover:animate-bounce' />
                <h2>{item.name}</h2>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Overlay for Mobile View */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>
    </>
  )
}

export default SideNav
