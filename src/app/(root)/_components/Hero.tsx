// import Image from 'next/image'
import React from 'react'
import "./Hero.css"
import { BsDatabaseFillAdd } from 'react-icons/bs'
import {FaHome} from 'react-icons/fa'
// import Link from 'next/link'

function Hero() {
  return (
    <section className="py-20 mt-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Heading */}
        <h1 className="features-title mb-6">
          The Smartest way to split{" "}
 <span className="block leading-tight">expenses with friends</span>
        </h1>
        
        {/* Subheading */}
        <p className="features-subtitle mb-10">
          Track shared expanses,split bills effortlessly and settle up quickly. <br/> Never worry about who owes who again.
        </p>
        
        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <button className=" flex px-16 py-4 rounded-2xl text-md font-medium transition-all duration-300 bg-[#0bf903]/90 text-black shadow-2xl shadow-[#0bf903]/30">
            <BsDatabaseFillAdd size={20} className="mr-2" />
            Create an Expanse 
          </button>
          <button className="flex px-16 py-4 rounded-2xl text-md font-medium transition-all duration-300 bg-white/10 backdrop-blur-lg shadow-2xl shadow-[#0bf903]/30 text-[#0bf903]/70 hover:bg-[#0bf903]/20">
          <FaHome size={20} className="mr-2" />
            Go to Dashboard
          </button>
        </div>
      </div>
    </section>
  )
}

export default Hero
