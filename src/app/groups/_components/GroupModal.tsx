import { useMutation, useQuery } from "convex/react";
import { X, ChevronDown } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import toast from "react-hot-toast";
import {motion} from 'framer-motion'

function GroupModal({ setOpen }:{setOpen:(value:boolean) => void}) {
  // Dummy user data

  const users = useQuery(api.users.getAllUsers);
  const creategrp = useMutation(api.group.createGroup);

  const [field, setField] = useState({
    name: "",
    description: "",
  });
  const [selectedMembers, setSelectedMembers] = useState<Array<{id: Id<"users">; name: string}>>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAddMember = (user : { id: Id<"users">; name: string }) => {
    if (!selectedMembers.some(member => member.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
    setIsDropdownOpen(false);
  };

  const handleRemoveMember = (userId : Id<"users">) => {
    setSelectedMembers(selectedMembers.filter(member => member.id !== userId));
  };

  const handleSubmit = async(e: React.FormEvent) => {
      e.preventDefault();

      try{
          await creategrp({
              name: field.name,
              description: field.description,
              members: selectedMembers.map(member => member.id)
            });
            toast.success("Group created successfully");
            setOpen(false);
        }
        catch(e){
            toast.error("Error creating group");
            console.log(e);
        }


  }

  return (
    <motion.div 
    initial={{ opacity: 0, y: -50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.9 }}
    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative w-full max-w-md p-6 rounded-2xl glass-card">
        <button 
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Create New Group</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Group Name
            </label>
            <input
              type="text"
              value={field.name}
              onChange={(e) => setField({ ...field, name: e.target.value })}
              placeholder="Enter group name"
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white/80 mb-1">
              Description
            </label>
            <textarea
              value={field.description}
              onChange={(e) => setField({ ...field, description: e.target.value })}
              placeholder="What's this group about?"
              rows={3}
              className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-green-500/50"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-white/80 mb-1">
              Add Members
            </label>
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white text-left flex items-center justify-between"
              >
                <span>Select members</span>
                <ChevronDown className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            
            {/* Dropdown menu */}
            {isDropdownOpen && (
              <div className="absolute z-10 w-full mt-1 max-h-60 overflow-auto bg-gray-800/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-lg">
                {users?.map(user => (
                  <div 
                    key={user._id}
                    onClick={() => handleAddMember({ id: user._id, name: user.name })}
                    className={`px-4 py-2 hover:bg-white/10 cursor-pointer flex items-center justify-between ${
                      selectedMembers.some(m => m.id === user._id) ? 'bg-white/10' : ''
                    }`}
                  >
                    <p className="text-white">{user.name}</p>
                    {selectedMembers.some(m => m.id === user._id) && (
                      <span className="text-xs text-green-400">Added</span>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Selected members preview */}
            <div className="mt-2 flex flex-wrap gap-2">
              {selectedMembers.map(member => (
                <div 
                  key={member.id} 
                  className="flex items-center bg-white/10 px-3 py-1 rounded-full text-sm text-white"
                >
                  <span>{member.name}</span>
                  <button 
                    onClick={() => handleRemoveMember(member.id)}
                    className="ml-2 text-white/70 hover:text-white"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button 
            onClick={handleSubmit}
            className="w-full py-2.5 bg-[#22fa05] hover:bg-[#00ff26] text-white font-medium rounded-lg transition-colors">
              Create Group
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default GroupModal;