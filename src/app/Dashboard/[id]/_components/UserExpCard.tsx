// import React from 'react'

import { FaPerson } from "react-icons/fa6"
// import { IoFastFoodOutline } from "react-icons/io5";
// import { GiClothes } from "react-icons/gi";
// import { TbWorld } from "react-icons/tb";
import { Id } from "../../../../../convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"
import AllSplits from "./AllSplits"
import { BsCaretDownSquareFill } from "react-icons/bs";
import { useState } from "react"
// import { IoLogoGameControllerB } from "react-icons/io";
// import { MdOutlineLocalGroceryStore } from "react-icons/md";


function UserExpCard({item} : {item : {_id : Id<"expanses">,description : string,amount : number,category? : string | undefined,date : number,paidByUserId : Id<"users">,splits? : Array<{userId : Id<"users">,amount : number,paid : boolean}>}}) {
  const someUser = useQuery(api.users.getUserById, 
  item?.paidByUserId ? { _id: item.paidByUserId } : "skip");
    // const {user} = useUser();
    const user = useQuery(api.users.getCurrUser);

    const [showSplits,setShowSplits] = useState(false);


    
  return (
<div className="w-full rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm ">

{/* Modern Transaction Card */}
<div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all hover:shadow-sm">
  {/* Icon with subtle background */}
  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/30 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
    <FaPerson className="h-5 w-5 text-green-600 dark:text-green-400" />
     {/* {item.category === 'Transportation' && (
    <FaPlaneDeparture className="h-5 w-5 text-green-600 dark:text-green-400" />
  )}
  {item.category === 'Food' && (
    <IoFastFoodOutline className="h-5 w-5 text-green-600 dark:text-green-400" />
  )}
  {item.category === 'Entertainment' && (
    <IoLogoGameControllerB className="h-5 w-5 text-green-600 dark:text-green-400" />
  )}
  {item.category === 'Utilities' && (
    <GiClothes className="h-5 w-5 text-green-600 dark:text-green-400" />
  )}
  {item.category === 'Groceries' && (
    <MdOutlineLocalGroceryStore className="h-5 w-5 text-green-600 dark:text-green-400" />
  )}
  {item.category === 'Other' && (
    <TbWorld className="h-5 w-5 text-green-600 dark:text-green-400" />
  )} */}
  </div>

  {/* Main content - grows to fill space */}
  <div className="flex-1 min-w-0 space-y-1">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {/* Title and description */}
      <div className="min-w-0">
        <h3 className="text-lg font-medium text-white truncate">
          {item.description}
        </h3>
        <p className="text-xs text-gray-300 dark:text-gray-400 truncate">
          {item.category}
        </p>
      </div>

      {/* Amount - positioned differently on mobile */}
      <div className={`text-xl font-semibold sm:text-right font-mono ${user?._id === item.paidByUserId ? 'text-[#0bf903]' : 'text-red-500'}
      `}
      >
        ₹{item.amount}
      </div>
    </div>

    {/* Meta information */}
    <div className="flex flex-wrap items-center gap-2 text-sm mb-2">
     
      <span className="text-[#0bf903] text-xs font-mono">
        {item.date}
      </span>
      <span className="text-gray-500 dark:text-gray-400 text-sm">
        Paid by <span className="font-medium text-gray-700 dark:text-gray-200">{someUser?.name}</span>
      </span>
    </div>
  </div>

</div>

  {/* Divider */}
 <div className="relative flex items-center justify-center group">
  <div className={`h-px w-full bg-[#0bf903] transition-all duration-300 ${showSplits ? 'opacity-100' : 'opacity-80'}`} />
  <BsCaretDownSquareFill 
    onClick={() => setShowSplits(!showSplits)} 
    size={20}  
    className={`absolute bottom-0 text-[#0bf903] transition-all duration-300 transform ${showSplits ? 'rotate-180' : ''} cursor-pointer hover:scale-110 active:scale-95`}
  />
</div>


  {/* Split Details (unchanged) */}
  {showSplits &&
  <div className="p-5 backdrop-blur-2xl">
    <div className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Split Details</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {item.splits?.map((split) => (
        <AllSplits key={split.userId} split={split} item={item} />
      ))}
    </div>
  </div>
    }
</div>

  )
}

export default UserExpCard
