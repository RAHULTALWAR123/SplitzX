// import React from 'react'

import CountUp from "@/app/groups/CountUp"
import { useQuery } from "convex/react"
import { GrGroup } from "react-icons/gr"
import { api } from "../../../../convex/_generated/api"
import { Id } from "../../../../convex/_generated/dataModel";
import Link from "next/link";

function GrpsExpanse({group} : {group : {_id : Id<"groups">,name : string,description : string , members : Id<"users">[]}}) {
    const grpExp = useQuery(api.expanses.getGrpExp , { _id: group._id });

    if(grpExp === undefined) return <div className="p-4">Loading...</div>;
  return (
    <Link href={`/Dashboard/Group-Exp/${group._id}`} 
      key={group._id}
      className="flex justify-between items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-gray-200/20 shadow-sm hover:shadow-md"
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-gradient-to-br from-[#00ff1a] to-[#00ffb7]">
          <GrGroup className="text-black" size={18} />
        </div>
        <div>
          <p className="font-medium text-gray-200  text-start">{group.name}</p>
          <p className="text-xs text-gray-400 mt-1">
            {group.members.length} {group.members.length === 1 ? 'member' : 'members'} • {group.description}
          </p>
        </div>
      </div>
      
      <div className={`${grpExp >= 0 ? 'bg-gradient-to-br from-[#00ff1a] to-[#00ffb7]' : 'bg-gradient-to-br from-[#ff0000] to-[#ff0000]'} bg-clip-text text-transparent`}>
        <CountUp
          from={0}
          to={Math.abs(grpExp)} // Replace with your actual value
          separator=","
          direction="up"
          duration={1}
          className="font-bold text-xl font-mono"
        />
        <span className="text-gray-400 ml-1">₹</span>
      </div>
    </Link>
  )
}

export default GrpsExpanse
