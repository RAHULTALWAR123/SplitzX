import React from 'react'
import { NavbarDemo } from '../nav'

import "../(root)/_components/Testimonials.css"
import { GrGroup } from 'react-icons/gr'
import { SignedIn, SignedOut } from '@clerk/nextjs'
import CountUp from '../groups/CountUp'


function page() {
    const names = [
        {
            name: "John Doe",
            balance: 1000
        },
        {
            name: "Jane Doe",
            balance: 2000
        },
         {
            name: "John Doe",
            balance: 1000
        },
        {
            name: "Jane Doe",
            balance: 2000
        },
    ]

    const groups = [
        {
            name: "Group 1",
            members: ["John Doe", "Jane Doe"],
            balance: "2000",
            owner: "John Doe",
        },
        {
            name: "Group 2",
            members: ["John Doe", "Jane Doe"],
            balance: "3000",
            owner: "Jane Doe",
        },
         {
            name: "John Doe",
            members: ["John Doe", "Jane Doe"],
            balance: 1000
        },
        {
            name: "Jane Doe",
            members: ["John Doe", "Jane Doe"],
            balance: 2000
        },
         {
            name: "John Doe",
            members: ["John Doe", "Jane Doe"],
            balance: 1000
        },
        {
            name: "Jane Doe",
            members: ["John Doe", "Jane Doe"],
            balance: 2000
        },
    ]

  return (
    <>
    {<SignedIn>
        <NavbarDemo/>
        <div className='text-center p-20 m-20'>
            <div className='mb-10'>
            <h1 className="testimonials-title">Dashboard</h1>
            <p className="testimonials-subtitle">Add your dashboard here</p>
            </div>

           <div className='flex justify-center gap-8'>
  {/* Total Balance Card */}
  <div className='border border-gray-100/20 rounded-2xl flex justify-start items-start flex-col gap-3 p-8 w-1/3 bg-white/5 backdrop-blur-sm shadow-sm shadow-[#09ff00] hover:shadow-md transition-all hover:-translate-y-1'>
    <p className='testimonials-subtitle'>Net Balance</p>
     <div className="flex items-baseline gap-2">
  <span className='text-gray-400 text-lg'>₹</span>
  <div className="bg-gradient-to-r from-[#aa00ff] to-[#6600ff] bg-clip-text text-transparent">
    <CountUp
      from={0}
      to={300}
      separator=","
      direction="up"
      duration={1}
      className="font-bold text-7xl"
    />
  </div>
</div>
    <p className='font-light text-gray-400 text-xs mt-2'>*Your current net worth across all groups</p>
  </div>

  {/* Owed to You Card */}
  <div className='border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8 w-1/3 bg-white/5 backdrop-blur-sm shadow-sm shadow-[#09ff00] hover:shadow-md transition-all hover:-translate-y-1'>
    <p className='testimonials-subtitle'>Receivables</p>
   <div className="flex items-baseline gap-2">
  <span className='text-gray-400 text-lg'>₹</span>
  <div className="bg-gradient-to-r from-[#00ff1a] to-[#00ffb7] bg-clip-text text-transparent">
    <CountUp
      from={0}
      to={300}
      separator=","
      direction="up"
      duration={1}
      className="font-bold text-7xl"
    />
  </div>
</div>
    <p className='font-light text-gray-400 text-xs mt-2'>*Pending payments from others</p>
  </div>

  {/* You Owe Card */}
  <div className='border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8 w-1/3 bg-white/5 backdrop-blur-sm shadow-sm shadow-[#09ff00] hover:shadow-md transition-all hover:-translate-y-1'>
    <p className='testimonials-subtitle'>Payables</p>
   <div className="flex items-baseline gap-2">
  <span className='text-gray-400 text-lg'>₹</span>
  <div className="bg-gradient-to-r from-red-700 to-pink-700 bg-clip-text text-transparent">
    <CountUp
      from={0}
      to={300}
      separator=","
      direction="up"
      duration={1}
      className="font-bold text-7xl"
    />
  </div>
</div>
    <p className='font-light text-gray-400 text-xs mt-2'>*Amounts you need to settle</p>
  </div>
</div>  

<div className='flex justify-center gap-8 mt-8 items-start'>
    <div className='w-1/2 border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8  bg-white/5 backdrop-blur-sm shadow-sm shadow-[#09ff00] hover:shadow-md transition-all hover:-translate-y-1 h-auto'>
        <p className='testimonials-subtitle'>Balance Details</p>
        <div className='flex flex-col w-full gap-3'>
  {names.map((name, index) => (
    <div 
    key={index} 
    className='flex justify-between items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-gray-200/20'
    >
      <div className='flex items-center gap-3'>
        <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff1a] to-[#00ffb7] flex items-center justify-center text-white font-medium text-sm'>
          {name.name.charAt(0).toUpperCase()}
        </div>
        <p className='font-medium text-gray-800 dark:text-gray-200'>{name.name}</p>
      </div>
      
      <div className='bg-gradient-to-r from-[#00ff1a] to-[#00ffb7] bg-clip-text text-transparent'>
        <CountUp
          from={0}
          to={name.balance}
          separator=","
          direction="up"
          duration={1}
          className="font-bold text-xl"
        />
        <span className='text-gray-400 ml-1'>₹</span>
      </div>
    </div>
  ))}
</div>
<div className='mx-auto'>
    <button className='bg-gradient-to-r from-[#00ff1a] to-[#00ff33] text-black px-8 py-2 rounded-full'>View</button>
</div>
    </div>
    <div className='w-1/2 border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8  bg-white/5 backdrop-blur-sm shadow-sm shadow-[#09ff00] hover:shadow-md transition-all hover:-translate-y-1 h-auto'>
         <p className='testimonials-subtitle'>Group Details</p>
       <div className="flex flex-col w-full gap-3">
  {groups.map((group, index) => (
    <div 
      key={index}
      className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-gray-200/20 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-[#00ff1a] to-[#00ffb7]">
          <GrGroup className="text-black" size={18} />
        </div>
        <div>
          <p className="font-medium text-gray-800 dark:text-gray-200  text-start">{group.name}</p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
            {group.members.length} {group.members.length === 1 ? 'member' : 'members'} • Owned by {group.owner}
          </p>
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-green-400 to-teal-500 bg-clip-text text-transparent">
        <CountUp
          from={0}
          to={group.balance} // Replace with your actual value
          separator=","
          direction="up"
          duration={1}
          className="font-bold text-xl"
        />
        <span className="text-gray-400 ml-1">₹</span>
      </div>
    </div>
  ))}
</div>
<div className='mx-auto'>
    <button className='bg-gradient-to-r from-[#00ff1a] to-[#00ff33] text-black px-8 py-2 rounded-full'>View</button>
</div>
    </div>

</div>
 </div>  
 </SignedIn> }

 {<SignedOut>
          <NavbarDemo/>
  <p>Please sign in to view your dashboard</p>
  </SignedOut>}
    </>
  )
}

export default page
