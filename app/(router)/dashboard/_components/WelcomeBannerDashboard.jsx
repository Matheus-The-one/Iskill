import Image from 'next/image'
import React from 'react'

function WelcomeBannerDashboard({user}) {
  return (
    <div className='bg-purple-100 rounded-sm p-5 flex gap-5 items-center'>
        <Image src={'/hi-panda.png'} alt='panda'
        width={150}
        height={150}/>
        <div>
            <h2 className='text-[32px] font-light'>კეთილი იყოს თქვენი დაბრუნება, 
            <span className='font-bold text-primary'>{user?.fullName}</span></h2>
            <h2 className='text-[16px] font-light text-slate-500'>გავაგრძელოთ იქიდან სადაც შევწყვიტეთ, <br></br>
            განაგრძე და განავითარე შენი შესაძლებლობი</h2>
        </div>
    </div>
  )
}

export default WelcomeBannerDashboard