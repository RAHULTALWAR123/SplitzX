"use client"
import { useState } from "react";

import { NavbarDemo } from "../nav"
import Indivisual from "./_components/Indivisual";
import Group from "./_components/Group";
import { motion } from "framer-motion";
import "../(root)/_components/Testimonials.css"

function Page() {
  const [activeTab, setActiveTab] = useState("Group");

  return (
    <div className="min-h-screen">
      <NavbarDemo />

      <div className="max-w-3xl mx-auto p-6">
        <div className="text-center sm:mt-20 mt-10 mb-10">
          <h1 className="testimonials-title">Expanse</h1>
          <p className="testimonials-subtitle">Add an expense</p>
        </div>

        <motion.div 
        initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9 }}
        className="rounded-2xl p-8 glass-card">
          {/* Toggle buttons */}
          <div className="flex gap-4 mb-8">
            <button
              onClick={() => setActiveTab("Group")}
              className={`flex-1 py-3 px-4 rounded-xl ${
                activeTab === "Group"
                  ? "bg-[#00ff26] text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              } font-medium transition-all`}
            >
              Group
            </button>
            <button
              onClick={() => setActiveTab("Individual")}
              className={`flex-1 py-3 px-4 rounded-xl ${
                activeTab === "Individual"
                  ? "bg-[#00ff26] text-black"
                  : "bg-white/5 text-white/70 hover:bg-white/10"
              } font-medium transition-all`}
            >
              Individual
            </button>
          </div>

          {/* Form */}
          {activeTab === "Group" ? <Group /> : <Indivisual />}
        </motion.div>
      </div>
    </div>
  );
}

export default Page