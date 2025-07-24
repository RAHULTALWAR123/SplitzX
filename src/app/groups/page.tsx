
// import React from 'react'
"use client"
import { GrGroup } from "react-icons/gr";
import { NavbarDemo } from "../nav"
import AnimatedList from "./_components/AnimatedList";
import "../(root)/_components/Testimonials.css"
import { FiPlus } from "react-icons/fi";
import { MdAddToPhotos } from "react-icons/md";
import { SignedIn, SignedOut} from "@clerk/nextjs";
import { useState } from "react";
import GroupModal from "./_components/GroupModal";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
// import NoUser from "../Dashboard/_components/NoUser";

function Page() {

  const [open, setOpen] = useState(false);

  // const {user} = useUser();

  // if(!user) return <NoUser/>

  // const user = useQuery(api.users.getCurrUser);

  const groups = useQuery(api.group.getUserGroups);



  return (
    <>
    <SignedIn>

    <NavbarDemo/>
    {open && <GroupModal setOpen={setOpen}/>}
    <div className="p-20 text-center m-20">
      <h1 className="testimonials-title">Your Groups</h1>
      <p className="testimonials-subtitle">Join groups to split expenses with friends and family</p>

       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium font-mono text-gray-800 dark:text-gray-100">All Groups ({groups?.length})</h2>
          <div className="flex gap-2">
          <Link href={"/Expanse"} className="flex items-center gap-2 px-4 py-2 bg-[#000000]  text-white rounded-xl transition-colors cursor-pointer">
            <MdAddToPhotos size={18} />
            Add an Expense
          </Link>
          <button 
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors cursor-pointer">
            <FiPlus size={18} />
            Create Group
          </button>
          </div>
        </div>

      <div className="flex justify-center mt-10">
        <AnimatedList
  items={groups}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={false}
  enableArrowNavigation={true}
  displayScrollbar={false}
  className="text-left"
  renderItem={(item) => (
  <div className="group px-5 py-5 rounded-lg transition-colors cursor-pointer">
  <div className="flex items-start gap-4">
    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
      <GrGroup size={20} className="text-green-600 dark:text-green-400" />
    </div>
    
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-xl font-semibold text-gray-100  transition-colors">
          {item?.name}
        </h3>
        <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full text-[#10ff04]">
          {item?.members?.length} {item?.members?.length === 1 ? 'member' : 'members'}
        </span>
      </div>
      
      <p className="text-sm text-gray-500 line-clamp-2">
        {item?.description}
      </p>
      
      {/* <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Owner:</span>
        <span className="font-medium text-[#10ff04] ">{item.createdBy}</span>
      </div> */}
    </div>
  </div>
</div>
  )}
/>
      </div>
    </div>
    </SignedIn>

<SignedOut>
  <div className="min-h-screen">
    <NavbarDemo />
    
    <div className="max-w-2xl mx-auto px-4 py-16 sm:py-24 text-center ">
      <div className="backdrop-blur-2xl rounded-2xl p-8 shadow-sm border border-[#10ff04] shadow-[#10ff04]">
        <div className="mx-auto flex justify-center relative">
          {/* Gradient glow behind the icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-20 w-20 rounded-full bg-[#10ff04] opacity-20 blur-xl animate-pulse"></div>
          </div>
          
          <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-[#10ff04] relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        
        <h2 className="mt-6 text-3xl font-bold text-gray-200 tracking-tight">
          Connect with your groups
        </h2>
        
        <p className="mt-4 text-lg text-gray-400 max-w-md mx-auto">
          Sign in to view and interact with all your communities in one place.
        </p>
        
      </div>
    </div>
  </div>
</SignedOut>
    </>
  )
}

export default Page
