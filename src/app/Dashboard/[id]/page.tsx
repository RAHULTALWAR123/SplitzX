"use client"
import AnimatedList from "@/app/groups/_components/AnimatedList"
import { NavbarDemo } from "@/app/nav"

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
import DashboardSkeleton from "../_components/DashboardSkeleton"
import "../../(root)/_components/Testimonials.css"


function Page() {

const userExpId = useParams().id;

const userExpHistory = useQuery(api.expanses.getUserExpHistory, { _id: userExpId as Id<"users"> });
const [tab,setTab] = useState("expanses");

if(userExpHistory === undefined || userExpId === null){
  return (
    <DashboardSkeleton/>
  )
}

  return (
    <>
    <NavbarDemo/>
    <div className="sm:p-20  text-center sm:m-20 mt-20 mx-3">
      <h1 className="testimonials-title">Expanse History</h1>
      <p className="testimonials-subtitle">Track all your expanses and settlements</p>

       <div className="flex justify-between items-center mb-10 mt-10">
          <h2 className="sm:text-xl text-sm font-medium font-mono text-gray-100">All Expanses ({userExpHistory?.length})</h2>
          <div className="sm:flex flex-row gap-2">
          <Link href={`/settlements/${userExpId}`} className="text-sm flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-lg text-[#0bf903]/70 hover:bg-[#0bf903]/20 rounded-xl transition-colors">
            <SiAfterpay  size={18} />
            Settle Up
          </Link>
          <Link href={"/Expanse"} className="text-sm flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors">
            <MdAddToPhotos size={18} />
            Add Expanse
          </Link>
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



    </>
  )
}

export default Page
