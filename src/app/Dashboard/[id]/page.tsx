"use client"
import AnimatedList from "@/app/groups/_components/AnimatedList"
import { NavbarDemo } from "@/app/nav"
import { SignedIn, SignedOut } from "@clerk/nextjs"
import { CheckCircleIcon } from "lucide-react"
import { FaPerson } from "react-icons/fa6"
import { MdAddToPhotos } from "react-icons/md"


function page() {
    const groups = [
    {
      name: "Rahul",
      description: "Description of Group 1",
      amount : 100,
      paidBy: "John Doe",
      date: "2023-06-01",
      category: "Groceries",
      splits: [{ userId: "john", amount: 50, paid: true }, { userId: "jane", amount: 50, paid: false }],
    },
]; 
  return (
    <>
    {<SignedIn>
    <NavbarDemo/>
    <div className="p-20 text-center m-20">
      <h1 className="testimonials-title">Expanse History</h1>
      <p className="testimonials-subtitle">Add your expanse history here</p>

       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium font-mono text-gray-800 dark:text-gray-100">All Contacts ({groups.length})</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors">
            <MdAddToPhotos size={18} />
            Add Expanse
          </button>
        </div>

      <div className="flex justify-center mt-10">
        <AnimatedList
  items={groups}
  onItemSelect={(item, index) => console.log(item, index)}
  showGradients={false}
  enableArrowNavigation={true}
  displayScrollbar={false}
  className="text-left"
   renderItem={(item) => (
<div className="w-full rounded-3xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">

{/* Modern Transaction Card */}
<div className="group relative flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:border-gray-200 dark:hover:border-gray-700 transition-all hover:shadow-sm">
  {/* Icon with subtle background */}
  <div className="flex-shrink-0 flex items-center justify-center h-10 w-10 rounded-lg bg-green-50 dark:bg-green-900/30 group-hover:bg-green-100 dark:group-hover:bg-green-900/40 transition-colors">
    <FaPerson className="h-5 w-5 text-green-600 dark:text-green-400" />
  </div>

  {/* Main content - grows to fill space */}
  <div className="flex-1 min-w-0 space-y-1">
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
      {/* Title and description */}
      <div className="min-w-0">
        <h3 className="text-base font-medium text-gray-900 dark:text-white truncate">
          {item.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
          {item.description}
        </p>
      </div>

      {/* Amount - positioned differently on mobile */}
      <div className={`text-lg font-semibold sm:text-right ${
        item.splits.some(s => !s.paid) ? 'text-orange-500' : 'text-green-500'
      }`}>
        ₹{item.amount}
      </div>
    </div>

    {/* Meta information */}
    <div className="flex flex-wrap items-center gap-2 text-sm">
     
      <span className="text-gray-500 dark:text-gray-400 text-xs">
        {item.date}
      </span>
      <span className="text-gray-500 dark:text-gray-400 text-sm">
        Paid by <span className="font-medium text-gray-700 dark:text-gray-200">{item.paidBy}</span>
      </span>
    </div>
  </div>

  {/* Action button - right-aligned on desktop */}
  <div className="sm:self-start">
    {item.splits.some(s => !s.paid) ? (
      <button className="inline-flex items-center px-6 py-2 text-xs font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors shadow-xs hover:shadow-sm">
        Settle Up
      </button>
    ) : (
      <span className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-lg">
        <CheckCircleIcon className="h-4 w-4 mr-1 text-green-500" />
        Settled
      </span>
    )}
  </div>
</div>

  {/* Divider */}
  <div className="h-px w-full bg-[#0bf903]" />

  {/* Split Details (unchanged) */}
  <div className="p-5 backdrop-blur-2xl">
    <div className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">Split Details</div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {item.splits.map((split, i) => (
        <div key={i} className="flex justify-between items-center backdrop-blur-2xl bg-white/10 p-3 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700">
          <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {split.userId}
          </span>
          <span className={`text-sm font-semibold ${
            split.paid ? 'text-green-500' : 'text-red-500'
          }`}>
            ₹{split.amount} 
          </span>
        </div>
      ))}
    </div>
  </div>
</div>


  )}
/>
      </div>
    </div>
    </SignedIn>}

    <SignedOut>
      <NavbarDemo/>
      <p>Please sign in to view your contacts</p>
    </SignedOut>
    </>
  )
}

export default page
