// import React from 'react'
"use client";
import { GrGroup } from "react-icons/gr";
import { NavbarDemo } from "../nav";
import AnimatedList from "./_components/AnimatedList";
import "../(root)/_components/Testimonials.css";
import { FiPlus } from "react-icons/fi";
import { MdAddToPhotos } from "react-icons/md";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";
import GroupModal from "./_components/GroupModal";
import Link from "next/link";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import NoUser from "../Dashboard/_components/NoUser";
import DashboardSkeleton from "../Dashboard/_components/DashboardSkeleton";
// import NoUser from "../Dashboard/_components/NoUser";

function Page() {
  const SignedInContent = () => {
    const [open, setOpen] = useState(false);

    const groups = useQuery(api.group.getUserGroups);

    if(groups == undefined){
      return (
        <DashboardSkeleton/>
      )
    }

    return (
      <>
        <NavbarDemo />
        {open && <GroupModal setOpen={setOpen} />}
        <div className="p-20 text-center m-20">
          <h1 className="testimonials-title">Your Groups</h1>
          <p className="testimonials-subtitle">
            Join groups to split expenses with friends and family
          </p>

          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium font-mono text-gray-800 dark:text-gray-100">
              All Groups ({groups?.length})
            </h2>
            <div className="flex gap-2">
              <Link
                href={"/Expanse"}
                className="flex items-center gap-2 px-4 py-2 bg-[#000000]  text-white rounded-xl transition-colors cursor-pointer"
              >
                <MdAddToPhotos size={18} />
                Add an Expense
              </Link>
              <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-[#0bf903]  text-black rounded-xl transition-colors cursor-pointer"
              >
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
                <div className="group px-5 py-5 rounded-lg transition-colors cursor-pointer">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-xl group-hover:bg-green-200 dark:group-hover:bg-green-900/30 transition-colors">
                      <GrGroup
                        size={20}
                        className="text-green-600 dark:text-green-400"
                      />
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xl font-semibold text-gray-100  transition-colors">
                          {item?.name}
                        </h3>
                        <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full text-[#10ff04]">
                          {item?.members?.length}{" "}
                          {item?.members?.length === 1 ? "member" : "members"}
                        </span>
                      </div>

                      <p className="text-sm text-gray-500 line-clamp-2">
                        {item?.description}
                      </p>

                    </div>
                  </div>
                </div>
              )}
            />
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <NavbarDemo />
      <SignedIn>
        <SignedInContent />
      </SignedIn>
      <SignedOut>
        <NoUser />
      </SignedOut>
    </>
  );
}

export default Page;
