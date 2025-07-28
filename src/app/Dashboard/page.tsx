"use client"
import React from 'react'
import { NavbarDemo } from '../nav'
import "../(root)/_components/Testimonials.css"
import { SignedIn, SignedOut } from '@clerk/nextjs'
import CountUp from '../groups/CountUp'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import UserExpanse from '../Expanse/_components/UserExpanse'
import GrpsExpanse from './_components/GrpsExpanse'
import NoUser from './_components/NoUser'
import DashboardSkeleton from './_components/DashboardSkeleton'
import { motion } from 'framer-motion'
import NoUsers from './_components/NoUsers'
import NoGrps from './_components/NoGrps'


function Page() {
  // SignedIn content component - queries only run when user is signed in
  const SignedInContent = () => {
    const payable = useQuery(api.expanses.getTotalPay);
    const owed = useQuery(api.expanses.ToPay);
    const allGrps = useQuery(api.group.getUserGroups);
    const expUsers = useQuery(api.users.getExpanseUsers);
    
    if (payable === undefined || owed === undefined || 
        allGrps === undefined || expUsers === undefined) {
      return (
        <DashboardSkeleton/>
      );
    }

    return (
      <div className='text-center p-4 md:p-20 m-4 md:m-20'>
  <div className='mb-10'>
    <h1 className="testimonials-title">Dashboard</h1>
    <p className="testimonials-subtitle">Track all your expanses in one place</p>
  </div>

  {/* Top Cards - Stack vertically on mobile */}
  <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-8'>
    {/* Total Balance Card */}
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className='border border-gray-100/20 rounded-2xl flex justify-start items-start flex-col gap-3 p-6 md:p-8 w-full md:w-1/3 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1'>
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
            className="font-bold text-5xl md:text-7xl font-mono"
          />
        </div>
      </div>
      <p className='font-light text-gray-400 text-xs mt-2'>*Your current net worth across all groups</p>
    </motion.div>

    {/* Owed to You Card */}
    <motion.div 
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9 }}
      className='border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-6 md:p-8 w-full md:w-1/3 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1'>
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
            className="font-bold text-5xl md:text-7xl font-mono"
          />
        </div>
      </div>
      <p className='font-light text-gray-400 text-xs mt-2'>*Pending payments from others</p>
    </motion.div>

    {/* You Owe Card */}
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className='border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-6 md:p-8 w-full md:w-1/3 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1'>
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
            className="font-bold text-5xl md:text-7xl font-mono"
          />
        </div>
      </div>
      <p className='font-light text-gray-400 text-xs mt-2'>*Amounts you need to settle</p>
    </motion.div>
  </div>  

  {/* Bottom Cards - Stack vertically on mobile */}
  <div className='flex flex-col md:flex-row justify-center gap-4 md:gap-8 mt-4 md:mt-8 items-start'>
    <motion.div 
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className='w-full md:w-1/2 border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-6 md:p-8 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1 h-auto'>
      <p className='testimonials-subtitle'>Balance Details</p>
      <div className='flex flex-col w-full gap-3'>
        {expUsers?.length === 0 ? (
          <NoUsers/>
          ) : (
            expUsers?.map((user) => (
              <UserExpanse key={user._id} user={user} />
            ))
          )
        }
      </div>
    </motion.div>
    
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.9 }}
      className='w-full md:w-1/2 border border-gray-100/20 rounded-2xl justify-start items-start flex flex-col gap-3 p-6 md:p-8 bg-white/5 backdrop-blur-2xl glass-card transition-all hover:-translate-y-1 h-auto mt-4 md:mt-0'>
      <p className='testimonials-subtitle'>Group Details</p>
      <div className="flex flex-col w-full gap-3">
        {allGrps?.length === 0 ? (
          <NoGrps/>
        ) : (
          allGrps?.map((group) => (
            <GrpsExpanse key={group._id} group={group} />
          ))
        )
      }
      </div>
    </motion.div>
  </div>
</div>
    );
  };

  return (
    <>
      <NavbarDemo/>
      <SignedIn>
        <SignedInContent />
      </SignedIn>
      <SignedOut>
        <NoUser/>
      </SignedOut>
    </>
  );
}

export default Page;
