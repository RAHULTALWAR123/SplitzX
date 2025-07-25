// import React from 'react'

import { NavbarDemo } from "@/app/nav"

function NoUser() {
  return (
<div className="min-h-screen flex flex-col">
      <NavbarDemo />
      <div className="flex-1 grid place-items-center bg-transparent px-4">
        <div className="text-center max-w-md mx-auto">
          {/* Glowing SplitzX Logo */}
          <div className="mx-auto w-32 h-32 mb-4 grid place-items-center relative">
  {/* Glow background element */}
  <div className="absolute inset-0 rounded-full bg-[#4bfb24]/30 blur-2xl animate-pulse scale-110" />
  
  {/* Your original logo - unchanged */}
  <svg viewBox="0 0 200 200" className="relative z-10 animate-pulse">
    <path 
      d="M40,40 L80,80 L40,120 L80,160 L120,120 L160,160 L120,80 L160,40 L120,40 L80,80 L120,120 L80,160" 
      fill="none" 
      stroke="url(#pureGreenGradient)" 
      strokeWidth="12"
      strokeLinejoin="round"
    />
    <defs>
      <linearGradient id="pureGreenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#4bfb24"/> 
        <stop offset="100%" stopColor="#000000"/>
      </linearGradient>
    </defs>
  </svg>
</div>
          
          {/* Auth Message */}
          <h2 className="text-3xl font-bold text-gray-100 mb-2 font-sans">
            Welcome to SplitzX
          </h2>
          <p className="text-[#4bfb24] mb-6 font-sans">
            Please log in to view the content 
          </p>
          
        </div>
      </div>
    </div>
  )
}

export default NoUser
