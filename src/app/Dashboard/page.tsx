

"use client"
import React from 'react'
import { NavbarDemo } from '../nav'

import "../(root)/_components/Testimonials.css"

import { SignedIn, SignedOut} from '@clerk/nextjs'
import CountUp from '../groups/CountUp'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import UserExpanse from '../Expanse/_components/UserExpanse'
import GrpsExpanse from './_components/GrpsExpanse'
// import NoUser from './_components/NoUser'


function Page() {

    
// const {user} = useUser();

//  if (!user) {
//   return <NoUser/>
// }


  const payable = useQuery(api.expanses.getTotalPay);
  const owed = useQuery(api.expanses.ToPay);
  const allGrps = useQuery(api.group.getUserGroups)
  const expUsers = useQuery(api.users.getExpanseUsers)
  
  if (payable === undefined || owed === undefined || 
    allGrps === undefined || expUsers === undefined) {
      return <div>Loading...</div>;
    }

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
  <div className='border border-gray-100/20 rounded-2xl flex justify-start items-start flex-col gap-3 p-8 w-1/3 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1'>
    <p className='testimonials-subtitle'>Net Balance</p>
     <div className="flex items-baseline gap-2">
  <span className='text-gray-400 text-lg'>₹</span>
  <div className={` ${(payable || 0) > (owed || 0) ? "bg-gradient-to-r from-[#00ff1a] to-[#00ffb7]" : "bg-gradient-to-r from-[#ff0000] to-[#ff0000]"} bg-clip-text text-transparent`}>
    <CountUp
      from={0}
      to={(payable || 0) - (owed || 0)}
      separator=","
      direction="up"
      duration={1}
      className="font-bold text-7xl font-mono"
    />
  </div>
</div>
    <p className='font-light text-gray-400 text-xs mt-2'>*Your current net worth across all groups</p>
  </div>

  {/* Owed to You Card */}
  <div className='border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8 w-1/3 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1'>
    <p className='testimonials-subtitle'>Receivables</p>
   <div className="flex items-baseline gap-2">
  <span className='text-gray-400 text-lg'>₹</span>
  <div className="bg-gradient-to-br from-[#00ff1a] to-[#00ffb7] bg-clip-text text-transparent">
    <CountUp
      from={0}
      to={payable || 0}
      separator=","
      direction="up"
      duration={1}
      className="font-bold text-7xl font-mono"
    />
  </div>
</div>
    <p className='font-light text-gray-400 text-xs mt-2'>*Pending payments from others</p>
  </div>

  {/* You Owe Card */}
  <div className='border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8 w-1/3 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1'>
    <p className='testimonials-subtitle'>Payables</p>
   <div className="flex items-baseline gap-2">
  <span className='text-gray-400 text-lg'>₹</span>
  <div className="bg-gradient-to-br from-[#ff0000] to-[#ff0000] bg-clip-text text-transparent">
    <CountUp
      from={0}
      to={owed || 0}
      separator=","
      direction="up"
      duration={1}
      className="font-bold text-7xl font-mono"
    />
  </div>
</div>
    <p className='font-light text-gray-400 text-xs mt-2'>*Amounts you need to settle</p>
  </div>
</div>  

<div className='flex justify-center gap-8 mt-8 items-start'>
    <div className='w-1/2 border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8  bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1 h-auto'>
        <p className='testimonials-subtitle'>Balance Details</p>
        <div className='flex flex-col w-full gap-3'>
 {expUsers?.map((user) => (
  <UserExpanse key={user._id} user={user} />
              ))}
</div>
<div className='mx-auto'>
    <button className='bg-gradient-to-r from-[#00ff1a] to-[#00ff33] text-black px-8 py-2 rounded-full'>View</button>
</div>
    </div>
    <div className='w-1/2 border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-8  bg-white/5 backdrop-blur-2xl glass-card  transition-all hover:-translate-y-1 h-auto'>
         <p className='testimonials-subtitle'>Group Details</p>
       <div className="flex flex-col w-full gap-3">
  {allGrps?.map((group) => (
    <GrpsExpanse key={group._id} group={group} />
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

export default Page
