"use client"
import { useUser } from '@clerk/nextjs'
import { BadgeCheck, BookOpen, GraduationCap, LayoutDashboard, Mail, Menu, X } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState, useEffect } from 'react'

function SideNav() {
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

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
  }, [])

  return (
    <div>
      {/* Mobile Navbar */}
      <div className="md:hidden p-5 bg-white shadow-sm border flex justify-between items-center">
        <Image src='/logo.png' alt='logo' width={170} height={80} />
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="cursor-pointer" /> : <Menu className="cursor-pointer" />}
        </button>
      </div>

      {/* Sidebar */}
      <div className={`fixed md:relative ${isOpen ? 'left-0' : '-left-full'} md:left-0 top-0 p-5 bg-white shadow-sm border h-screen transition-all ease-in-out duration-300 z-50`}>
        <Image src='/logo.png' alt='logo' width={170} height={80} className="hidden md:block" />

        <hr className='mt-7' />

        {/* Menu List */}
        <div className='mt-5'>
          {menu.map((item, index) => item.auth && (
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
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)}></div>
      )}
    </div>
  )
}

export default SideNav

