// import React from 'react'

import { useState } from "react";
import EqualSplit from "./EqualSplit";
import ExactAmounts from "./ExactAmounts";

function Group() {
        const category = ["Food", "Entertainment", "Transportation", "Utilities", "Groceries", "Other"];
        const groups = ["Group 1", "Group 2", "Group 3"];
        const individuals = ["John Doe", "Jane Doe"];
    
        const [splitType, setSplitType] = useState("Equal");
  return (
    <>
                {/* Form */}
      
                    <form className="space-y-6">
                  {/* Description + Amount */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                      <input 
                        type="text" 
                        placeholder="Dinner at restaurant" 
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">$</span>
                        <input 
                          type="number" 
                          placeholder="0.00" 
                          className="w-full pl-8 pr-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white"
                          />
                      </div>
                    </div>
                  </div>
      
                  {/* Category + Date */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Category</label>
                      <select className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white">
                        <option value="">Select category</option>
                        {category.map((item, index) => (
                          <option key={index} className="bg-black">{item}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Date</label>
                      <input 
                        type="date" 
                        className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white"
                        />
                    </div>
                  </div>
      
                  {/* Group */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Group</label>
                    <select className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white">
                      <option value="">Select group</option>
                      {groups.map((item, index) => (
                        <option key={index} className="bg-black">{item}</option>
                      ))}
                    </select>
                  </div>
      
                  {/* Paid by */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Paid by</label>
                    <select className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white">
                      <option value="">Select member</option>
                      {individuals.map((item, index) => (
                          <option key={index} className="bg-black">{item}</option>
                      ))}
                    </select>
                  </div>
      
                  {/* Split type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-3">Split type</label>
                    <div className="flex gap-4">
                      <button 
                        type="button"
                        onClick={() => setSplitType("Equal")}
                        className={`flex-1 py-2 px-4 rounded-lg ${splitType === 'Equal' ? 'bg-[#00ff26] text-black' : 'bg-black text-gray-400'} font-medium transition-all`}
                      >
                        Equal
                      </button>
                      <button 
                        type="button"
                        onClick={() => setSplitType("Exact amount")}
                        className={`flex-1 py-2 px-4 rounded-lg ${splitType !== 'Equal' ? 'bg-[#00ff26] text-black' : 'bg-black text-gray-400'} font-medium transition-all`}
                      >
                        Exact amount
                      </button>
                    </div>
                  </div>
      
                  <div className="">
                      {splitType === "Equal" ? (
                          <EqualSplit />
                      ) : (
                          <ExactAmounts/>
                      )}
                  </div>
      
                  {/* Submit button */}
                  <div className="pt-4">
                    <button 
                      type="submit"
                      className="w-full py-3 px-4 bg-[#00ff26] hover:bg-[#00cc1f] text-black font-medium rounded-lg transition-colors"
                    >
                      Add Expense
                    </button>
                  </div>
                </form>
    </>
  )
}

export default Group
