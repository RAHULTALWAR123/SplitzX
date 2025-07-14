"use client"
import { useState } from "react";

import { NavbarDemo } from "../nav"
import Indivisual from "./_components/Indivisual";
import Group from "./_components/Group";

function Page() {
    const [activeTab, setActiveTab] = useState("Group");

  return (
    <div className="min-h-screen">
      <NavbarDemo/>

      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center mt-20 mb-10">
          <h1 className="text-3xl font-bold text-white">Expanse</h1>
          <p className="text-gray-400 mt-2">Add an expense</p>
        </div>

        <div className="rounded-xl p-6 backdrop-blur-sm bg-black/30">
          {/* Toggle buttons */}
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setActiveTab("Group")}
              className={`flex-1 py-3 px-4 rounded-lg ${activeTab === "Group" ? 'bg-[#00ff26] text-black' : 'bg-black text-gray-400'} font-medium transition-all`}
            >
              Group
            </button>
            <button 
              onClick={() => setActiveTab("Individual")}
              className={`flex-1 py-3 px-4 rounded-lg ${activeTab === "Individual" ? 'bg-[#00ff26] text-black' : 'bg-black text-gray-400'} font-medium transition-all`}
            >
              Individual
            </button>
          </div>

          {/* Form */}
          {activeTab === "Group" ? (
            <Group/>
    ) : (
        <Indivisual/>
    )}
        </div>
        </div>
    </div>
  )
}

export default Page