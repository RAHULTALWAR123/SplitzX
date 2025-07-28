// import React from 'react'

import CountUp from "@/app/groups/CountUp";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";


function UserExpanse({user} : {user : { _id: Id<"users">; name: string; email: string;}}) {
    const balance = useQuery(api.expanses.getUserExp, { _id: user._id });
    if (balance === undefined) {
    return <div className="p-4">Loading...</div>;
  }
  
    
  return (
   <Link href={`/Dashboard/${user._id}`}
                       key={user._id} 
                       className='flex justify-between items-center p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-gray-200/20'
                     >
                       <div className='flex items-center gap-3'>
                         <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#00ff1a] to-[#00ffb7] flex items-center justify-center text-white font-medium text-sm'>
                           {user.name.charAt(0).toUpperCase()}
                         </div>
                         <p className='font-medium text-gray-200'>{user.name}</p>
                       </div>
                       
                       <div className={`${
                         balance >= 0 
                           ? 'bg-gradient-to-br from-[#00ff1a] to-[#00ffb7]' 
                           : 'bg-gradient-to-br from-[#ff0000] to-[#ff0000]'
                       } bg-clip-text text-transparent`}>
                         <CountUp
                           from={0}
                           to={Math.abs(balance)}
                           separator=","
                           direction="up"
                           duration={1}
                           className="font-bold text-xl font-mono"
                         />
                         <span className='text-gray-400 ml-1'>₹</span>
                       </div>
                     </Link>
  )
}

export default UserExpanse




 