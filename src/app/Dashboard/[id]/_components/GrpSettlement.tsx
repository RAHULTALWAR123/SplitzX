// import React from 'react'

import { useQuery } from "convex/react"
import { Id } from "../../../../../convex/_generated/dataModel"
import { api } from "../../../../../convex/_generated/api"
import AnimatedList from "@/app/groups/_components/AnimatedList";
import UsersettlementCard from "./UsersettlementCard";
import DashboardSkeleton from "../../_components/DashboardSkeleton";

function GrpSettlement({grpId}:{grpId: Id<"groups">}) {
    const grpSettleuUps = useQuery(api.settlements.getGrpSettlements, {_id : grpId as Id<"groups">});

    if(grpSettleuUps === undefined){
      return (
        <DashboardSkeleton/>
      )
    }
  return (
    <AnimatedList
          items={grpSettleuUps}
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

export default GrpSettlement
