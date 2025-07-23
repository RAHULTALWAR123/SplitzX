// import React from 'react'
"use client"
import { NavbarDemo } from "../nav"
import "../(root)/_components/Testimonials.css"
// import { FiPlus } from "react-icons/fi";
import AnimatedList from "../groups/_components/AnimatedList";

import { FaPerson } from "react-icons/fa6";
import { MdAddToPhotos } from "react-icons/md";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

function Page() {

  const contacts = useQuery(api.users.getExpanseUsers);

  return (
    <>
    {<SignedIn>
    <NavbarDemo/>
    <div className="p-20 text-center m-20">
      <h1 className="testimonials-title">Your Contacts</h1>
      <p className="testimonials-subtitle">Add and track indivisual expanses with ease</p>

       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium font-mono text-gray-800 dark:text-gray-100">All Contacts ({contacts?.length})</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors">
            <MdAddToPhotos size={18} />
            Add Expanse
          </button>
        </div>

      <div className="flex justify-center mt-10">
        <AnimatedList
  items={contacts}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={false}
  enableArrowNavigation={true}
  displayScrollbar={false}
  className="text-left"
   renderItem={(item) => (
  <div className="group px-5 py-5 rounded-lg transition-colors cursor-pointer">
  <div className="flex items-start gap-4">
    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
      <FaPerson size={20} className="text-green-600 dark:text-green-400" />
    </div>
    
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100  transition-colors">
          {item?.name}
        </h3>
       
      </div>

      <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors">
        {item?.email}
      </p>
      
     
    </div>
  </div>
</div>
  )}
/>
      </div>
    </div>
    </SignedIn>}

    <SignedOut>
      <NavbarDemo/>
      <p>Please sign in to view your contacts</p>
    </SignedOut>
    </>
  )
}

export default Page