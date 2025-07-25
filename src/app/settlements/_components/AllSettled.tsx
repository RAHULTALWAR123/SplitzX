import React from 'react';
import { CheckCircle } from 'lucide-react';
import Link from 'next/link';

function AllSettled() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      {/* Glowing animated check circle */}
      <div className="relative mb-6">
        <CheckCircle 
          className="w-24 h-24 text-[#4bfb24] animate-pulse drop-shadow-lg" 
          strokeWidth={1.5}
        />
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-green-500/20 animate-pulse blur-3xl -z-10"></div>
      </div>

      {/* Text content */}
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2 text-center">
        All Settled!
      </h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 text-center max-w-md">
        You have successfully settled all your expenses.
      </p>
      <Link href="/Dashboard" className="mt-6 px-6 py-2 rounded-2xl bg-[#4bfb24] text-black ">Go to Dashboard</Link>
    </div>
  );
}

export default AllSettled;
