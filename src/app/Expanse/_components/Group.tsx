// import React from 'react'

import { useState } from "react";

import EqualSplitGrp from "./EqualSplitGrp";
import EqualAmountGrp from "./EqualAmountGrp";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";


function Group() {
  const category = ["Food", "Entertainment", "Transportation", "Utilities", "Groceries", "Other"];
  const groups = useQuery(api.group.getUserGroups);
  const individuals = ["John Doe", "Jane Doe"];

  const [splitType, setSplitType] = useState("Equal");

  return (
    <form className="space-y-6">
      {/* Description + Amount */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
          <input
            type="text"
            placeholder="Dinner at restaurant"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white placeholder-white/50"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Amount</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/70">$</span>
            <input
              type="number"
              placeholder="0.00"
              className="w-full pl-8 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white placeholder-white/50"
            />
          </div>
        </div>
      </div>

      {/* Category + Date */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Category</label>
          <select className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white">
            <option value="" className="bg-gray-800">Select category</option>
            {category.map((item, index) => (
              <option key={index} value={item} className="bg-gray-800">
                {item}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Date</label>
          <input
            type="date"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white"
          />
        </div>
      </div>

      {/* Group */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">Group</label>
        <select className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white">
          <option value="" className="bg-gray-800">Select group</option>
          {groups?.map((item) => (
            <option key={item._id} value={item._id} className="bg-gray-800">
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Paid by */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">Paid by</label>
        <select className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white">
          <option value="" className="bg-gray-800">Select member</option>
          {individuals.map((item, index) => (
            <option key={index} value={item} className="bg-gray-800">
              {item}
            </option>
          ))}
        </select>
      </div>

      {/* Split type */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-3">Split type</label>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setSplitType("Equal")}
            className={`flex-1 py-2.5 px-4 rounded-xl ${
              splitType === "Equal"
                ? "bg-[#00ff26] text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            } font-medium transition-all`}
          >
            Equal
          </button>
          <button
            type="button"
            onClick={() => setSplitType("Exact amount")}
            className={`flex-1 py-2.5 px-4 rounded-xl ${
              splitType !== "Equal"
                ? "bg-[#00ff26] text-black"
                : "bg-white/5 text-white/70 hover:bg-white/10"
            } font-medium transition-all`}
          >
            Exact amount
          </button>
        </div>
      </div>

      <div className="">
        {splitType === "Equal" ? <EqualSplitGrp /> : <EqualAmountGrp />}
      </div>

      {/* Submit button */}
      <div className="pt-4">
        <button
          type="submit"
          className="w-full py-3 px-4 bg-[#00ff26] hover:bg-[#00cc1f] text-black font-medium rounded-xl transition-colors"
        >
          Add Expense
        </button>
      </div>
    </form>
  );
}

export default Group
