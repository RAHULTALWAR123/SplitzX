// import { FaUserSlash } from "react-icons/fa";
import { MdGroupOff } from "react-icons/md";

function NoGrps() {
  return (
    <div className="flex flex-col items-center justify-center gap-3 p-8 text-center">
      {/* Glowing icon container */}
      <div className="relative">
        {/* Main icon */}
        <MdGroupOff  className="text-6xl text-[#2fff00] relative z-10" />
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-[#2fff00]/30 blur-md animate-pulse -z-0" />
      </div>
      
      {/* Text */}
      <p className="text-gray-500 font-medium">No groups found</p>
    </div>
  );
}

export default NoGrps;