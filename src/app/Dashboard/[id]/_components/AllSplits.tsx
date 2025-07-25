// import React from 'react'

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel"

function AllSplits({split ,item}:{split:{userId : Id<"users">,amount : number,paid : boolean} , item : {paidByUserId : Id<"users">}}) {
    const someUser = useQuery(api.users.getUserById,{_id : split.userId});

    if(someUser === undefined) return (
      <div className="font-mono text-xs font-medium ">
        Loading...
      </div>
    )
  return (
<div key={split.userId} className="flex justify-between items-center backdrop-blur-2xl bg-white/10 p-3 rounded-2xl shadow-sm ">
          <span className="text-sm font-medium text-gray-100">
            {someUser?.name}
          </span>
          <span className={`text-sm font-medium font-mono ${
            split.userId === item.paidByUserId || split.paid ? 'text-[#0bf903]' : 'text-red-500'
          }`}>
            ₹{split.amount} 
          </span>
        </div>
  )
}

export default AllSplits
