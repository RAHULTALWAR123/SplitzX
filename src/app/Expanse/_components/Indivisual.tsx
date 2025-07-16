"use client"
// import { NavbarDemo } from "@/app/nav";
import { useState } from "react";
import EqualSplit from "./EqualSplit";
import ExactAmounts from "./ExactAmounts";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";


function Indivisual() {
    const category = ["Food", "Entertainment", "Transportation", "Utilities", "Groceries", "Other"];
    const users = useQuery(api.users.getAllUsers);
    const createExp = useMutation(api.expanses.CreateIndivisualExpanse);
    const {user} = useUser();
    
    const [splitType, setSplitType] = useState("Equal");

    const [indivisual,setIndivisual] = useState("");

  const individuals = [
  // Current user (from Clerk)
  {
    id: users?.find(u => 
      u.email === user?.emailAddresses[0]?.emailAddress || 
      u.name === `${user?.firstName} ${user?.lastName}`
    )?._id ?? "" as Id<"users">,
    name: `${user?.firstName} ${user?.lastName}`
  },
  // Selected individual
  ...(indivisual ? [{
    id: users?.find(u => u.name === indivisual)?._id ?? "" as Id<"users">,
    name: indivisual
  }] : [])
].filter(person => person.id); // Only include if we found an ID

   
    
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
}

const [field, setField] = useState<FieldState>({
  description: "",
  amount: 0,
  category: "",
  date: 0,
  paidByUserId: users?.find(u => 
    u.email === user?.emailAddresses[0]?.emailAddress || 
    u.name === `${user?.firstName} ${user?.lastName}`
  )?._id ?? "" as Id<"users">,
  splitType: splitType,
  splits: [],
});

const [exactSplits, setExactSplits] = useState<Array<{
  userId: Id<"users">;
  amount: number;
  paid: boolean;
}>>([]);


const handleSubmit = async(e: React.FormEvent) => {
  e.preventDefault();

  if(!field.paidByUserId){
    toast.error("Please select a paid by user");
    return;
  }

  if (individuals.length === 0) {
    toast.error('Please select at least one person to share with');
    return;
  }

  const calculatedSplits = individuals.length > 0 && field.amount > 0 
    ? individuals.map((person) => ({
        userId: person.id,
        amount: field.amount / individuals.length,
        paid: false
      }))
    : [];

  const finalField = {
    ...field,
    splits: exactSplits.length > 0 ? exactSplits : calculatedSplits
  };

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
    });

  }
  catch(error){
    console.error("Error creating expense:", error);
  }
}

  return (
    <>
          {/* Form */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Description + Amount */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Description</label>
                <input 
                  type="text" 
                  value={field.description}
                  onChange={(e) => setField({...field,description: e.target.value})}
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
                    value={field.amount}
                    onChange={(e) => setField({...field,amount: parseFloat(e.target.value)})}
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
                <select
                value={field.category}
                onChange={(e) => setField({...field,category: e.target.value})}
                className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white">
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
  value={field.date ? new Date(field.date).toISOString().split('T')[0] : ''}
  onChange={(e) => setField({
    ...field,
    date: e.target.value ? new Date(e.target.value).getTime() : 0
  })}
  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white"
/>
              </div>
            </div>

            {/* users */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Shared with</label>
              <select
              value={indivisual} 
              onChange={(e) => setIndivisual(e.target.value)}
            className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white">
                <option value="">Select a person</option>
                {users?.map((item, index) => (
                  <option key={index} className="bg-black">{item.name}</option>
                ))}
              </select>
            </div>

            {/* Paid by */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Paid by</label>
              <select
  value={field.paidByUserId}
  onChange={(e) => {
    if (e.target.value) {
      setField({
        ...field,
        paidByUserId: e.target.value as Id<"users">
      });
    }
  }}
  className="w-full px-4 py-2 bg-black border border-gray-700 rounded-lg focus:ring-2 focus:ring-[#00ff26] focus:border-[#00ff26] text-white"
>
  <option value="">Select member</option>
  {individuals.filter(person => person.id).map((item) => (
    <option key={item.id} value={item.id} className="bg-black">
      {item.name}
    </option>
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
                    <EqualSplit individuals={individuals} amount={field.amount}/>
                ) : (
                    <ExactAmounts individuals={individuals} amount={field.amount} onSplitsChange={(splits) => setExactSplits(splits)}/>
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

export default Indivisual