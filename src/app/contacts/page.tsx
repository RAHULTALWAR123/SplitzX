
// import React from 'react'
"use client"
import { NavbarDemo } from "../nav"
import "../(root)/_components/Testimonials.css"
// import { FiPlus } from "react-icons/fi";
import AnimatedList from "../groups/_components/AnimatedList";
import { MdAddToPhotos } from "react-icons/md";
import { SignedIn, SignedOut} from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
// import NoUser from "../Dashboard/_components/NoUser";
import DashboardSkeleton from "../Dashboard/_components/DashboardSkeleton";
import { FaRegUser } from "react-icons/fa";
import NoUsers from "../Dashboard/_components/NoUsers";
import NoUser from "../Dashboard/_components/NoUser";
import Link from "next/link";
// import NoUser from "../Dashboard/_components/NoUser";

function Page() {

  const SignedInContent = () => {

  const contacts = useQuery(api.users.getExpanseUsers);

  if(contacts == undefined){
    return (
      <DashboardSkeleton/>
    )
  }

  return (
    <>
    <NavbarDemo/>
    <div className="sm:p-20  text-center sm:m-20 mt-20 mx-3">
      <h1 className="testimonials-title">Your Contacts</h1>
      <p className="testimonials-subtitle">Add and track indivisual expanses with ease</p>

       <div className="flex justify-between items-center mb-6 mt-10">
          <h2 className="sm:text-xl text-sm font-medium font-mono text-gray-800 dark:text-gray-100">All Contacts ({contacts?.length})</h2>
          <Link href={"/Expanse"} className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors">
            <MdAddToPhotos size={18} />
            Add Expanse
          </Link>
        </div>

      <div className="flex justify-center mt-10">
        {contacts?.length == 0 ? (
          <NoUsers/>
        ) : (
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
      <FaRegUser size={20} className="text-green-600 dark:text-green-400" />
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
        )}
      </div>
    </div>

    </>
  )
}

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
)
}

export default Page