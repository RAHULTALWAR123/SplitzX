// import React from 'react'

import { useQuery } from "convex/react"
import { Id } from "../../../../../convex/_generated/dataModel"
import { api } from "../../../../../convex/_generated/api"
import AnimatedList from "@/app/groups/_components/AnimatedList";
import UsersettlementCard from "./UsersettlementCard";
import DashboardSkeleton from "../../_components/DashboardSkeleton";

function UserSettlements({userExpId}:{userExpId?: Id<"users"> }) {
    const settlements = useQuery(api.settlements.getUserSettlements, { _id: userExpId as Id<"users"> });

    if(settlements === undefined){
      return (
        <DashboardSkeleton/>
      )
    }

  return (
    <AnimatedList
      items={settlements}
      onItemSelect={(item, index) => console.log(item, index)}
      showGradients={false}
      enableArrowNavigation={true}
      displayScrollbar={false}
      className="text-left"
       renderItem={(item) => (
        <UsersettlementCard item={item}/>
      )}
    />
  )
}

export default UserSettlements
