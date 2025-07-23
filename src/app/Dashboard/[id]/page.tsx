"use client"
import AnimatedList from "@/app/groups/_components/AnimatedList"
import { NavbarDemo } from "@/app/nav"
import { SignedIn, SignedOut } from "@clerk/nextjs"

import { MdAddToPhotos } from "react-icons/md"
import UserExpCard from "./_components/UserExpCard"
import { useParams } from "next/navigation"
import { useQuery } from "convex/react"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel"
import { SiAfterpay } from "react-icons/si"
import Link from "next/link"
import { useState } from "react"
import UserSettlements from "./_components/UserSettlements"


function Page() {

const userExpId = useParams().id;

const userExpHistory = useQuery(api.expanses.getUserExpHistory, { _id: userExpId as Id<"users"> });
const [tab,setTab] = useState("expanses");

  return (
    <>
    {<SignedIn>
    <NavbarDemo/>
    <div className="p-20 text-center m-20">
      <h1 className="testimonials-title">Expanse History</h1>
      <p className="testimonials-subtitle">Add your expanse history here</p>

       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium font-mono text-gray-800 dark:text-gray-100">All Contacts ({userExpHistory?.length})</h2>
          <div className="flex gap-2">
          <Link href={`/settlements/${userExpId}`} className="flex items-center gap-2 px-4 py-2 bg-black  text-white rounded-xl transition-colors">
            <SiAfterpay  size={18} />
            Settle Up
          </Link>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors">
            <MdAddToPhotos size={18} />
            Add Expanse
          </button>
          </div>

        </div>

        <div className="flex justify-center gap-4 ">
  <button 
    onClick={() => setTab("expanses")}
    className={`px-8 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
      tab === "expanses" 
        ? "bg-[#0bf903]/90 text-black shadow-lg shadow-[#0bf903]/30"
        : "bg-white/10 backdrop-blur-lg text-[#0bf903]/70 hover:bg-[#0bf903]/20"
    }`}
  >
    Expenses
  </button>
  
  <button 
    onClick={() => setTab("settlements")}
    className={`px-8 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
      tab === "settlements"
        ? "bg-[#0bf903]/90  text-black shadow-lg shadow-[#0bf903]/30"
        : "bg-white/10 backdrop-blur-lg text-[#0bf903]/70 hover:bg-[#0bf903]/20"
    }`}
  >
    Settlements
  </button>
</div>

      <div className="flex justify-center mt-10">
{tab === "expanses" &&
        <AnimatedList
  items={userExpHistory}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={false}
  enableArrowNavigation={true}
  displayScrollbar={false}
  className="text-left"
   renderItem={(item) => (
    <UserExpCard item={item}/>
  )}
/>
}
{tab === "settlements" && 
<UserSettlements  userExpId={userExpId as Id<"users">}/>
}
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
