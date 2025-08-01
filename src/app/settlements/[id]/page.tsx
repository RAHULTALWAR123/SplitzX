"use client"
import { NavbarDemo } from '@/app/nav'
import React, { useState } from 'react'
import { api } from '../../../../convex/_generated/api';
import { useMutation, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { Id } from '../../../../convex/_generated/dataModel';
import toast from 'react-hot-toast';
import AllSettled from '../_components/AllSettled';
import { motion } from 'framer-motion';
import "../../(root)/_components/Testimonials.css"
// import { useRouter } from 'next/navigation';

function Page() {
  // const router = useRouter();
    const userId = useParams().id as Id<"users">;
    const user = useQuery(api.users.getCurrUser);

    const otherUser = useQuery(api.users.getUserById, { _id: userId });

    const balance = useQuery(api.expanses.getUserExp, { _id: userId });

    

    const settle = useMutation(api.settlements.createSettlement);


       



    // const Fixedamount = 150;

    const [field,setField] = useState({
        note: "",
        date: Date.now(),
        amount: balance || 0,
        paidByUserId: user?._id as Id<"users">,
        receivedByUserId: userId 
    })

    const [loading, setLoading] = useState(false);

    
    
    const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
        await settle(field);
        console.log("Form submitted:", field);
        toast.success("Settlement created successfully");
        // router.push("/Dashboard");
    
      } catch (error) {
    console.error("Error submitting form:", error);
    toast.error("Error submitting form");
    setLoading(false);
  }
  finally {
    setLoading(false);
  }
};

if(balance === 0){
  return (
    <>
    <NavbarDemo/>
    <AllSettled/>
    </>
  )
}
  return (
    <div className="">
      <NavbarDemo/>

      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-16 mt-20">
          <h1 className="testimonials-title">Settle Up</h1>
          <p className="testimonials-subtitle">settle all your past debts with {otherUser?.name}</p>
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
              <div className="text-2xl font-bold text-center text-[#4bfb24] py-4 px-6 bg-white/10 rounded-lg backdrop-blur-sm border border-white/10">
              {balance !== undefined ? (balance > 0 ? "AllSettled" : `$${Math.abs(balance)}`) : 'Loading...'}
              </div>
            </div>

            <form onSubmit={handleSubmit}>
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
                disabled={balance === undefined || (balance !== undefined && balance > 0)}
                className={`w-full py-4 px-6 rounded-2xl font-bold text-black transition-all bg-[#0bf903] cursor-pointer ${balance === undefined || (balance !== undefined && balance > 0) ? 'opacity-50 cursor-not-allowed' : ''}`}
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

    </div>
  )
}

export default Page
