// import React from 'react'

import { useEffect, useState } from "react";
import { Id } from "../../../../convex/_generated/dataModel";



function EqualAmountGrp({getMembers,amount,onSplitsChange}:{getMembers: {members: {_id: string, name: string}[]} | undefined,amount:number,onSplitsChange: (splits: Array<{ userId: Id<"users">; amount: number; paid: boolean; }>) => void}) {

  const equalAmount = getMembers?.members.length ? amount / getMembers?.members.length : 0;

  const [amounts,setAmounts] = useState<Record<string, number>>(
    getMembers?.members.reduce((acc, p) => ({ ...acc, [p._id]: equalAmount }), {}) || {}
  );

  useEffect(() => {
      const splits = getMembers?.members.map(p => ({
        userId: p._id as Id<"users">,
        amount: amounts[p._id] ?? equalAmount,
        paid: false
      }));
      onSplitsChange(splits as Array<{ userId: Id<"users">; amount: number; paid: boolean; }>);
    }, [amounts]); // Only depends on amounts


    const handleAmountChange = (id: string, value: string) => {
    setAmounts(prev => ({ ...prev, [id]: parseFloat(value) || 0 }));
  };
  

   const remaining = amount - Object.values(amounts).reduce((sum, val) => sum + val, 0);

  return (
   <div className="mt-6 backdrop-blur-3xl rounded-2xl p-4 shadow-sm">
      {getMembers?.members?.length >= 2 ? (
        <>
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-[#00ff26]/60">
            <h3 className="font-medium text-gray-200">Exact Amounts</h3>
            <div className="text-sm text-gray-400">
              Total: <span className="font-medium">${amount.toFixed(2)}</span>
              {remaining !== 0 && (
                <span className={`ml-2 ${remaining > 0 ? 'text-yellow-400' : 'text-red-400'}`}>
                  ({remaining > 0 ? `+${remaining.toFixed(2)}` : remaining.toFixed(2)})
                </span>
              )}
            </div>
          </div>
          
          <div className="space-y-3">
            {getMembers?.members.map((person) => {
              const avatar = person.name.split(' ').map((n: string) => n[0]).join('').toUpperCase();
              const personAmount = amounts[person._id] ?? equalAmount; // Fallback to equalAmount if undefined
              return (
                <div key={person._id} className="flex items-center justify-between p-2 hover:bg-gray-700/60 rounded-md">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-[#00ff26]/20 flex items-center justify-center text-[#00ff26] font-medium">
                      {avatar}
                    </div>
                    <span className="text-gray-200">{person.name}</span>
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                    <input
                      type="number"
                      value={personAmount.toFixed(2)}
                      onChange={(e) => handleAmountChange(person._id, e.target.value)}
                      className="pl-8 pr-3 py-1 w-24 bg-gray-800/60 border border-gray-600 rounded-md text-gray-200 focus:ring-1 focus:ring-[#00ff26] focus:border-[#00ff26]"
                    />
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-[#00ff26]/60 text-sm text-gray-400">
            <p>
              {remaining === 0 
                ? "Amounts match the total expense"
                : remaining > 0
                  ? `Enter $${remaining.toFixed(2)} more to match the total`
                  : `Reduce by $${Math.abs(remaining).toFixed(2)} to match the total`}
            </p>
          </div>
        </>
      ) : (
        <p className="text-gray-400">Please select at least two individuals</p>
      )}
    </div>
  )
}

export default EqualAmountGrp
