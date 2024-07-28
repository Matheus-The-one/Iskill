"use client"
import React, { useContext, useEffect } from 'react'
import SideNav from './_components/SideNav'
import Header from './_components/Header'
import { useUser } from '@clerk/nextjs'



function layout({children}) {

  const {user}=useUser();
  
  

  /**
   * USed to check user membership
   */
  

  return (
    <div>
        <div className='md:w-64  
        md:block hidden 
        fixed'>
            <SideNav/>
        </div>
        <div className='md:ml-64'>
            <Header/>
        {children}
        </div>
        </div>
  )
}

export default layout