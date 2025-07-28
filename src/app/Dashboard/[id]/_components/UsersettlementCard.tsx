// import React from 'react'

import { FaPerson } from "react-icons/fa6"
import { Id } from "../../../../../convex/_generated/dataModel"
import { api } from "../../../../../convex/_generated/api";
import { useQuery } from "convex/react";

// 
function UsersettlementCard({item} : {item : {_id : Id<"settlements">, note? : string | undefined , amount : number , date : number, paidByUserId : Id<"users">, receivedByUserId : Id<"users">}}) {
    const user = useQuery(api.users.getCurrUser);

    const paidUser = useQuery(api.users.getUserById,item?.paidByUserId ? { _id: item.paidByUserId } : "skip");
    const receivedUser = useQuery(api.users.getUserById,item?.receivedByUserId ? { _id: item.receivedByUserId } : "skip");

  return (
<div className="w-full rounded-3xl overflow-hidden shadow-sm bg-white/10  backdrop-blur-2xl">
  <div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-5 p-6 transition-all ">
    {/* Icon */}
    <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-green-500/20 group-hover:bg-green-600/30 transition-colors">
      <FaPerson className="h-5 w-5 text-green-500" />
    </div>

    {/* Main content - new layout */}
    <div className="flex-1 w-full min-w-0 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {/* Left column */}
      <div className="space-y-2">
        {/* Note */}
        <h3 className="text-lg font-semibold text-gray-100">
          {item.note || "Untitled transaction"}
        </h3>
        
        {/* Date */}
        <div className="text-sm text-gray-400">
          {new Date(item.date)?.toLocaleDateString('en-IN', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          })}
        </div>
        
        {/* Paid by */}
        <div className="pt-0">
          <span className="text-xs text-gray-300">Paid by </span>
          <span className="text-sm font-medium text-[#0bf903]">
            {paidUser?.name || "Unknown"}
          </span>
        </div>
      </div>

      {/* Right column */}
      <div className="flex flex-col items-end">
        {/* Amount */}
        <div className={`text-3xl font-bold font-mono ${
          user?._id === item.receivedByUserId ? 'text-[#0bf903]' : 'text-red-500'
        }`}>
          ₹{Math.abs(item.amount)}
        </div>
        
        {/* Received by */}
        <div className="pt-7 text-right">
          <span className="text-xs text-gray-300">Received by </span>
          <span className="text-sm font-medium text-[#0bf903]">
            {receivedUser?.name || "Unknown"}
          </span>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default UsersettlementCard
