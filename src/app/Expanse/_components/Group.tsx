// import React from 'react'

import { useState } from "react";

import EqualSplitGrp from "./EqualSplitGrp";
import EqualAmountGrp from "./EqualAmountGrp";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
// import { Id } from "../../../../convex/_generated/dataModel";


function Group() {
  const category = ["Food", "Entertainment", "Transportation", "Utilities", "Groceries", "Other"];
  const [grp, setGrp] = useState ("");
  const groups = useQuery(api.group.getUserGroups);
  const getMembers = useQuery(api.group.getGroupMembers,  grp ? {_id : grp as Id<"groups">} : "skip");
  const createExp = useMutation(api.expanses.CreateIndivisualExpanse);

  const [splitType, setSplitType] = useState("Equal");

  interface FieldState {
    description: string;
    amount: number;
    category: string;
    date: number;
    paidByUserId: Id<"users">;
    splitType: string;
    splits: Array<{
      userId: Id<"users">; // Remove the | "" since we'll filter out empty ones
      amount: number;
      paid: boolean;
    }>;
    groupId: Id<"groups">

  }

  const [field, setField] = useState<FieldState>({
    description: "",
    amount: 0,
    category: "",
    date: 0,
    paidByUserId: "" as Id<"users">,
    splitType: "Equal",
    splits: [],
    groupId: "" as Id<"groups">
  });

  const [exactSplits, setExactSplits] = useState<Array<{
  userId: Id<"users">;
  amount: number;
  paid: boolean;
}>>([]);

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const calculatedSplits =  field.amount > 0 && getMembers ?
      getMembers.members.map((m) => ({
        userId: m._id,
        amount: field.amount / getMembers?.members?.length,
        paid: false
      }))
      : [];

    const finalField = {...field, splits: exactSplits.length > 0 ? exactSplits : calculatedSplits};
    setField(finalField);


    console.log("Form submitted:", finalField);

    try {
        await toast.promise(
          createExp(finalField),
          {
            loading: 'Creating expense...',
            success: 'Expense created successfully!',
            error: 'Failed to create expense',
          }
        );

        setField({
              description: "",
              amount: 0,
              category: "",
              date: 0,
              paidByUserId: "" as Id<"users">,
              splitType: splitType,
              splits: [],
              groupId: "" as Id<"groups">
            });
        
      } catch (error) {
        console.error('Error creating expense:', error);
      }
    
  }

  return (
    <form className="space-y-6">
      {/* Description + Amount */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-white/80 mb-1">Description</label>
          <input
            value={field.description}
            onChange={(e) => setField({...field, description: e.target.value})}
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
              value={field.amount}
              onChange={(e) => setField({...field, amount: Number(e.target.value)})}
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
          <select 
          value={field.category}
          onChange={(e) => setField({...field, category: e.target.value})}
          className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white">
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
           value={field.date ? new Date(field.date).toISOString().split('T')[0] : ''}
  onChange={(e) => setField({
    ...field,
    date: e.target.value ? new Date(e.target.value).getTime() : 0
  })}
            type="date"
            className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white"
          />
        </div>
      </div>

      {/* Group */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">Group</label>
        <select 
        value={grp}
        onChange={(e) => {
          setGrp(e.target.value);
          setField({...field, groupId: e.target.value as Id<"groups">})
        }}
        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white">
          <option value="" className="bg-gray-800">Select group</option>
          {groups?.map((item) => (
            <option key={item._id} value={item._id}  className="bg-gray-800">
              {item.name}
            </option>
          ))}
        </select>
      </div>

      {/* Paid by */}
      <div>
        <label className="block text-sm font-medium text-white/80 mb-1">Paid by</label>
        <select 
        value={field.paidByUserId}
        onChange={(e) => setField({...field, paidByUserId: e.target.value as Id<"users">})}
        className="w-full px-4 py-2.5 bg-white/10 border border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#00ff26]/50 text-white">
          <option value="" className="bg-gray-800">Select member</option>
          {getMembers?.members?.map((item :{_id : Id<"users"> , name: string}) => (
            <option key={item._id} value={item._id} className="bg-gray-800">
              {item.name}
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
        {splitType === "Equal" ? <EqualSplitGrp getMembers={getMembers} amount={field.amount} /> : 
        <EqualAmountGrp  getMembers={getMembers} amount={field.amount} onSplitsChange={(splits) => setExactSplits(splits)}/>}
      </div>

      {/* Submit button */}
      <div className="pt-4">
        <button
          onClick={handleSubmit}
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
