import React from 'react'; // We'll create this CSS file next
import { motion } from "framer-motion";

const DashboardSkeleton = () => {
  return (
 <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="flex flex-col items-center justify-center min-h-[300px] space-y-4 mt-28"
      >
        {/* Animated spinner */}
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{
            rotate: {
              repeat: Infinity,
              duration: 1.5,
              ease: "linear"
            },
            scale: {
              repeat: Infinity,
              duration: 1.2,
              repeatType: "reverse"
            }
          }}
          className="w-32 h-32 rounded-full border-8 border-[#4bfb24]/20 border-t-[#4bfb24] border-r-[#4bfb24]"
        />
        
        {/* Loading text with fading animation */}
        <motion.p
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity 
          }}
          className="text-lg font-medium font-mono text-[#4bfb24]/80"
        >
          Loading content...
        </motion.p>
        
        {/* Optional progress indicator */}
        <div className="w-72 h-2.5 bg-white/5 backdrop-blur-2xl rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
            className="h-full bg-gradient-to-r from-[#4bfb24] to-[#4bfb24]/80"
          />
        </div>
      </motion.div>
  );
};

export default DashboardSkeleton;