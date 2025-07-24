// import SpotlightCard from "@/components/SpotlightCard";
// import { FaChartPie, FaHandHoldingDollar, FaUserGroup } from "react-icons/fa6";
// import { HiWallet, HiCurrencyDollar } from "react-icons/hi2";
// import { IoMdNotifications } from "react-icons/io";
import Squares from "@/components/Squares";
import "./Hero.css";
import { FaPercentage } from "react-icons/fa";
import { ChevronRight } from "lucide-react";
import { MdCurrencyExchange, MdGroups } from "react-icons/md";
import { TbArrowsExchange2 } from "react-icons/tb";
import { SiGoogleanalytics } from "react-icons/si";
import { AiFillThunderbolt } from "react-icons/ai";

function Features() {
  return (
    <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* <div className="text-center mb-16">
        <h2 className="features-title">
          Powerful Features
        </h2>
        <p className="features-subtitle">
          Everything you need to split expenses effortlessly with friends and family
        </p>
      </div> */}

  
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-6">
  {/* Box 1 - Add New Trainee */}
  <div className="group relative h-64 rounded-2xl overflow-hidden border border-white bg-white/10 backdrop-blur-2xl hover:border-[#4bfb24] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4bfb24]/10">
    <Squares 
      speed={0.5} 
      squareSize={80}
      direction="diagonal"
      borderColor="rgba(255, 255, 255)"
      hoverFillColor="rgba(9, 241, 13)"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 p-4 rounded-full bg-[#4bfb24]/10 group-hover:bg-[#4bfb24]/20 transition-all">
        <MdGroups className="text-[#4bfb24]" size={36} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">Group Expenses</h3>
      <p className="text-[#4bfb24] text-sm">Create groups for roommates, trips, or events to keep all shared expenses organized in one place.</p>
      <ChevronRight className="mt-4 text-[#4bfb24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>

  {/* Box 2 - View Trainees */}
  <div className="group relative h-64 rounded-2xl overflow-hidden border border-white bg-white/10 backdrop-blur-2xl hover:border-[#4bfb24] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4bfb24]/10">
    <Squares 
      speed={0.5} 
      squareSize={80}
      direction="diagonal"
      borderColor="rgba(255, 255, 255)"
      hoverFillColor="rgba(9, 241, 13)"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 p-4 rounded-full bg-[#4bfb24]/10 group-hover:bg-[#4bfb24]/20 transition-all">
        <TbArrowsExchange2 className="text-[#4bfb24]" size={36} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">Smart Settlements</h3>
      <p className="text-[#4bfb24] text-sm">Automatically calculates who owes whom and suggests the most efficient way to settle up.</p>
      <ChevronRight className="mt-4 text-[#4bfb24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>

  {/* Box 3 - Progress Tracking */}
  <div className="group relative h-64 rounded-2xl overflow-hidden border border-white bg-white/10 backdrop-blur-2xl hover:border-[#4bfb24] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4bfb24]/10">
    <Squares 
      speed={0.5} 
      squareSize={80}
      direction="diagonal"
      borderColor="rgba(255, 255, 255)"
      hoverFillColor="rgba(9, 241, 13)"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 p-4 rounded-full bg-[#4bfb24]/10 group-hover:bg-[#4bfb24]/20 transition-all">
        <SiGoogleanalytics className="text-[#4bfb24]" size={36} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">Expense Analysis</h3>
      <p className="text-[#4bfb24] text-sm">Visual breakdowns of your spending patterns with customizable categories and reports.</p>
      <ChevronRight className="mt-4 text-[#4bfb24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>

  {/* Box 4 - Schedule */}
   <div className="group relative h-64 rounded-2xl overflow-hidden border border-white bg-white/10 backdrop-blur-2xl hover:border-[#4bfb24] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4bfb24]/10">
    <Squares 
      speed={0.5} 
      squareSize={80}
      direction="diagonal"
      borderColor="rgba(255, 255, 255)"
      hoverFillColor="rgba(9, 241, 13)"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 p-4 rounded-full bg-[#4bfb24]/10 group-hover:bg-[#4bfb24]/20 transition-all">
        <FaPercentage className="text-[#4bfb24]" size={36} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">Multiple Split Types</h3>
      <p className="text-[#4bfb24] text-sm">Choose from equal splits or exact amounts for each expense.</p>
      <ChevronRight className="mt-4 text-[#4bfb24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>

  {/* Box 5 - Reports */}
  <div className="group relative h-64 rounded-2xl overflow-hidden border border-white bg-white/10 backdrop-blur-2xl hover:border-[#4bfb24] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4bfb24]/10">
    <Squares 
      speed={0.5} 
      squareSize={80}
      direction="diagonal"
      borderColor="rgba(255, 255, 255)"
      hoverFillColor="rgba(9, 241, 13)"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 p-4 rounded-full bg-[#4bfb24]/10 group-hover:bg-[#4bfb24]/20 transition-all">
        <AiFillThunderbolt className="text-[#4bfb24]" size={36} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">Real-time Updates</h3>
      <p className="text-[#4bfb24] text-sm">Instant notifications when expenses are added or modified, keeping everyone in sync.</p>
      <ChevronRight className="mt-4 text-[#4bfb24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>

  {/* Box 6 - Settings */}
   <div className="group relative h-64 rounded-2xl overflow-hidden border border-white bg-white/10 backdrop-blur-2xl hover:border-[#4bfb24] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-[#4bfb24]/10">
    <Squares 
      speed={0.5} 
      squareSize={80}
      direction="diagonal"
      borderColor="rgba(255, 255, 255)"
      hoverFillColor="rgba(9, 241, 13)"
    />
    <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
      <div className="mb-4 p-4 rounded-full bg-[#4bfb24]/10 group-hover:bg-[#4bfb24]/20 transition-all">
      <MdCurrencyExchange className="text-[#4bfb24]" size={36} />
      </div>
      <h3 className="text-2xl font-semibold text-gray-100 mb-2">Multi-Currency</h3>
      <p className="text-[#4bfb24] text-sm">Supports multiple currencies with automatic conversion for international groups.</p>
      <ChevronRight className="mt-4 text-[#4bfb24]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  </div>
  </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
       
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <FaUserGroup size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Group Expenses</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Create groups for roommates, trips, or events to keep all shared expenses organized in one place.
            </p>
          </div>
        </SpotlightCard>

        
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <HiWallet size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Smart Settlements</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Automatically calculates who owes whom and suggests the most efficient way to settle up.
            </p>
          </div>
        </SpotlightCard>

        
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <FaChartPie size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Expense Analysis</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Visual breakdowns of your spending patterns with customizable categories and reports.
            </p>
          </div>
        </SpotlightCard>

      
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <FaHandHoldingDollar size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Multiple Split Types</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Choose from equal splits, percentages, exact amounts, or custom ratios for each expense.
            </p>
          </div>
        </SpotlightCard>

      
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <IoMdNotifications size={24} className="text-[#10ff04] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Real-time Updates</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Instant notifications when expenses are added or modified, keeping everyone in sync.
            </p>
          </div>
        </SpotlightCard>

        
        <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(16, 255, 4, 0.35)">
          <div className="flex flex-col gap-5 p-6 h-full">
            <div className="w-14 h-14 rounded-xl flex items-center justify-center">
              <HiCurrencyDollar size={24} className="text-[rgb(16,255,4)] dark:text-[#10ff04]" />
            </div>
            <h3 className="text-2xl font-medium">Multi-Currency</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Supports multiple currencies with automatic conversion for international groups.
            </p>
          </div>
        </SpotlightCard>
      </div> */}
    </section>
  );
}

export default Features;
