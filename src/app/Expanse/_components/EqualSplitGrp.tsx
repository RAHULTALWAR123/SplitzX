// import React from 'react'

import { Id } from "../../../../convex/_generated/dataModel";

function EqualSplitGrp({
  getMembers,
  amount
}: {
  getMembers: { members: { _id: Id<"users">; name: string }[] } | undefined;
  amount: number;
}) {
  // Safely get members array or fallback to empty array
  const members = getMembers?.members ?? [];
  const memberCount = members.length;
  
  // Calculate equal amount safely
  const equalAmount = memberCount > 0 ? amount / memberCount : 0;

  // Create group members data safely
  const groupMembers = members.map((person) => ({
    id: person._id,
    name: person.name,
    avatar: person.name.split(' ').map((n: string) => n[0]).join('').toUpperCase(),
    amount: equalAmount
  }));

  return (
    <div className="mt-6 backdrop-blur-3xl rounded-2xl p-4 shadow-sm">
      {memberCount >= 2 ? (
        <>
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#00ff26]/60">
            <h3 className="font-medium text-gray-700">Equal Split</h3>
            <div className="text-sm text-gray-500">
              Total: <span className="font-medium">${amount.toFixed(2)}</span>
            </div>
          </div>
             
          <div className="space-y-3">
            {groupMembers.map((member) => (
              <div key={member.id} className="flex items-center justify-between p-2 hover:bg-gray-700/60 rounded-md">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-[#00ff26]/20 flex items-center justify-center text-[#00ff26] font-medium">
                    {member.avatar}
                  </div>
                  <span className="text-white">{member.name}</span>
                </div>
                <div className="text-gray-200 font-medium">
                  ${member.amount.toFixed(2)}
                </div>
              </div>
            ))}
          </div>
       
          <div className="mt-4 pt-3 border-t border-[#00ff26]/60 text-sm text-gray-500">
            <p>Each member pays an equal share</p>
          </div>
        </>
      ) : (
        <p className="text-gray-400">Please select at least two individuals</p>
      )}
    </div>
  );
}

export default EqualSplitGrp
