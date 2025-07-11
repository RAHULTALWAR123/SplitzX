// import React from 'react'
"use client"
import { GrGroup } from "react-icons/gr";
import { NavbarDemo } from "../nav"
import AnimatedList from "./_components/AnimatedList";
import "../(root)/_components/Testimonials.css"
import { FiPlus } from "react-icons/fi";
import { MdAddToPhotos } from "react-icons/md";

function page() {
    
const groups = [
    {
      name: "Group 1",
      description: "Description of Group 1",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
    {
      name: "Group 2",
      description: "Description of Group 2",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
    {
      name: "Group 3",
      description: "Description of Group 3",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
     {
      name: "Group 1",
      description: "Description of Group 1",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
    {
      name: "Group 2",
      description: "Description of Group 2",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
    {
      name: "Group 3",
      description: "Description of Group 3",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
     {
      name: "Group 1",
      description: "Description of Group 1",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
    {
      name: "Group 2",
      description: "Description of Group 2",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
    {
      name: "Group 3",
      description: "Description of Group 3",
      members: ["John Doe", "Jane Doe"],
      owner: "John Doe",
    },
]; 

  return (
    <>
    <NavbarDemo/>
    <div className="p-20 text-center m-20">
      <h1 className="testimonials-title">Your Groups</h1>
      <p className="testimonials-subtitle">Join groups to split expenses with friends and family</p>

       <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-medium font-mono text-gray-800 dark:text-gray-100">All Groups ({groups.length})</h2>
          <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#000000]  text-white rounded-xl transition-colors">
            <MdAddToPhotos size={18} />
            Add an Expense
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors">
            <FiPlus size={18} />
            Create Group
          </button>
          </div>
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
  <div className="group p-2 rounded-lg transition-colors cursor-pointer">
  <div className="flex items-start gap-4">
    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
      <GrGroup size={20} className="text-green-600 dark:text-green-400" />
    </div>
    
    <div className="flex-1 space-y-2">
      <div className="flex justify-between items-start gap-2">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100  transition-colors">
          {item.name}
        </h3>
        <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full text-[#10ff04]">
          {item.members.length} {item.members.length === 1 ? 'member' : 'members'}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2">
        {item.description}
      </p>
      
      <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
        <span>Owner:</span>
        <span className="font-medium text-[#10ff04] ">{item.owner}</span>
      </div>
    </div>
  </div>
</div>
  )}
/>
      </div>
    </div>
    </>
  )
}

export default page
