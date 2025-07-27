// import React from 'react'
"use client"
import { NavbarDemo } from "@/app/nav"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Id } from "../../../../../convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Check, ChevronDown } from "lucide-react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import "../../../(root)/_components/Testimonials.css"
import DashboardSkeleton from "@/app/Dashboard/_components/DashboardSkeleton";



function Page() {
  // const router = useRouter();
    const GrpID = useParams().groupId as Id<"groups">;
    const user = useQuery(api.users.getCurrUser);

    const exps = useQuery(api.expanses.getExpByGrpId, { _id: GrpID })

    const settleGrp = useMutation(api.settlements.createGrpSettlement);


    const [field,setField] = useState({
        note: "",
        date: Date.now(),
        amount:  0,
        paidByUserId: user?._id as Id<"users"> ,
        receivedByUserId: "" as Id<"users"> ,
        groupId: GrpID,
        relatedExpenseId : "" as Id<"expanses">,
    })

        const [loading, setLoading] = useState(false);

        const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const currExp = useQuery(
    api.expanses.getExpByExpId,
    field.relatedExpenseId && field.relatedExpenseId !== "" 
        ? { _id: field.relatedExpenseId } 
        : "skip"
);

const balance = currExp && user 
    ? currExp.splits.find(s => s.userId === user._id)?.amount 
    : undefined;

    const isPaid = currExp && user 
    ? currExp.splits.find(s => s.userId === user._id)?.paid 
    : false;

useEffect(() => {
      if (user && currExp && balance !== undefined) {
        setField(prev => ({
            ...prev,
            amount: balance,
            paidByUserId: user._id,
            receivedByUserId: currExp.paidByUserId
        }));
    }
}, [user, balance, currExp]);

    const handleSubmit = async(e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try{
            await settleGrp(field);
            console.log(field);
            toast.success("Settlement created successfully");
            // router.push("/Dashboard");
        }
        catch(error){
            toast.error("Error submitting form");
            console.log(error);
        }
        finally{
            setLoading(false);
        }
    }

    if (!user || !exps) {
    return (
      <DashboardSkeleton/>
    );
}



  return (
    <div className="">
          <NavbarDemo/>
    
          <div className="container mx-auto px-4 py-12">
            <div className="text-center mb-16 sm:mt-20 mt-10">
              <h1 className="testimonials-title">Settle Up</h1>
              <p className="testimonials-subtitle">settle all your past debts in this group</p>
            </div>
    
            <div className="max-w-md mx-auto">
              <motion.div 
               initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9 }}
              className="glass-card p-8 rounded-2xl backdrop-blur-lg border border-white/10 shadow-xl">
                <div className="mb-8">
                  <div className="text-center mb-2">
                    <span className="text-gray-300">Amount to settle</span>
                  </div>
                  <div className="text-2xl font-bold text-center text-[#4bfb24] py-4 px-6 bg-white/10 rounded-2xl backdrop-blur-sm border border-white/10">
                  {/* {balance !== undefined ? `$${Math.abs(balance)}` : 'Loading...'}  */}
{currExp?.paidByUserId === user._id || isPaid
    ? "All Settled" 
    : balance !== undefined 
        ? `$${Math.abs(balance)}` 
        : 'Select an expense'
}
                  </div>
                </div>
    
                <form 
                onSubmit={handleSubmit} 
                >

                    <div className="mb-6">
  <label className="block text-sm font-medium text-white/80 mb-1">
    Select Expense to settle
  </label>
  <div className="relative">
    <button
      type="button"
      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-left flex items-center justify-between"
    >
      <span>
        {field.relatedExpenseId 
          ? exps?.find(e => e._id === field.relatedExpenseId)?.description || "Select"
          : "Select"}
      </span>
      <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
    </button>
  </div>
  
  {/* Dropdown menu */}
  {isDropdownOpen && (
    <div className="absolute z-10 w-1/2 mt-1 max-h-60 overflow-auto bg-gray-800/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
      {exps?.map(e => (
        <div 
          key={e._id}
          onClick={() => {
            setField(prev => ({
              ...prev,
              relatedExpenseId: e._id // Store just the ID string
            }));
            setIsDropdownOpen(false);
          }}
          className={`px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center justify-between ${
            field.relatedExpenseId === e._id ? 'bg-white/20' : ''
          }`}
        >
          <p className="text-white">{e.description}</p>
          {field.relatedExpenseId === e._id && (
            <Check className="w-5 h-5 text-green-400" />
          )}
        </div>
      ))}
    </div>
  )}
</div>

                  <div className="mb-6">
                    <label htmlFor="note" className="block text-sm font-medium text-gray-300 mb-2">
                      Note (Optional)
                    </label>
                    <input
                      type="text"
                      id="note"
                      value={field.note}
                      onChange={(e) => setField({...field,note: e.target.value})}
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                      placeholder="e.g. Dinner at Italian restaurant"
                    />
                  </div>
    
                  <div className="mb-8">
                    <label htmlFor="date" className="block text-sm font-medium text-gray-300 mb-2">
                      Settlement Date
                    </label>
                   <input
      type="date"
      id="date"
     value={new Date(field.date).toISOString().split('T')[0]}
      onChange={(e) => setField({
        ...field,
        date: e.target.value ? new Date(e.target.value).getTime() : 0
      })}
      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
      required
    />
                  </div>
    
                  <button
                    type="submit"
                    disabled={currExp?.paidByUserId === user._id || isPaid || balance === undefined}
                    className={`w-full py-4 px-6 rounded-2xl font-bold cursor-pointer text-black transition-all bg-[#0bf903] ${currExp?.paidByUserId === user._id || isPaid || balance === undefined ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Confirm Settlement'
                    )}
                  </button>
    
                  {/* {isSuccess && (
                    <div className="mt-6 p-4 bg-green-500/20 border border-green-400/30 rounded-lg text-green-100 text-center animate-fade-in">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 inline-block mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      Payment successful! Your settlement is complete.
                    </div>
                  )} */}
                </form>
              </motion.div>
            </div>
          </div>
    
          {/* Floating decorative elements */}
          {/* <div className="fixed top-1/4 left-1/4 w-32 h-32 rounded-full bg-purple-600/20 blur-3xl -z-0"></div>
          <div className="fixed bottom-1/3 right-1/4 w-40 h-40 rounded-full bg-blue-600/20 blur-3xl -z-0"></div>
          <div className="fixed top-1/3 right-1/3 w-24 h-24 rounded-full bg-indigo-600/20 blur-3xl -z-0"></div> */}
        </div>
  )
}

export default Page
