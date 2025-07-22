// import React from 'react'
"use client"
import AnimatedList from "@/app/groups/_components/AnimatedList"
import { NavbarDemo } from "@/app/nav"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { useQuery } from "convex/react"
import { MdAddToPhotos } from "react-icons/md"
import { api } from "../../../../../convex/_generated/api"
import { useParams } from "next/navigation"
import { Id } from "../../../../../convex/_generated/dataModel"
import GrpExpCard from "../../[id]/_components/GrpExpCard"
import { SiAfterpay } from "react-icons/si"
import Link from "next/link"

function Page() {
    const grpId = useParams().groupId
    const grpExpHistory = useQuery(api.expanses.getGrpExpHistory , { _id: grpId as Id<"groups"> });
  return (
    <>
    {<SignedIn>
    <NavbarDemo/>
    <div className="p-20 text-center m-20">
      <h1 className="testimonials-title">Expanse History</h1>
      <p className="testimonials-subtitle">Add your expanse history here</p>

       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium font-mono text-gray-800 dark:text-gray-100">All Contacts ({grpExpHistory?.length})</h2>
          <div className="flex gap-2">
            <Link href={`/settlements/group-settlements/${grpId}`} className="flex items-center gap-2 px-4 py-2 bg-black  text-white rounded-xl transition-colors">
              <SiAfterpay  size={18} />
              Settle Up
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors">
            <MdAddToPhotos size={18} />
            Add Expanse
          </button>
          </div>
        </div>

      <div className="flex justify-center mt-10">
        <AnimatedList
  items={grpExpHistory}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={false}
  enableArrowNavigation={true}
  displayScrollbar={false}
  className="text-left"
   renderItem={(item) => (
    <GrpExpCard item={item}/>
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
