"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarLogo,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { SignUpButton, UserButton, useUser } from "@clerk/clerk-react";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { useState } from "react";
// import { BiUser } from "react-icons/bi";

export function NavbarDemo() {
  const {user} = useUser();
  const navItems = [
    {
      name: "Dashboard",
      link: "/Dashboard",
    },
    {
      name: "Groups",
      link: "/groups",
    },
    {
      name: "Contacts",
      link: "/contacts",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="relative w-full">
      <Navbar>
        {/* Desktop Navigation */}
        <NavBody>
          <NavbarLogo />
          <NavItems items={navItems} />
          <div className="flex items-center gap-4">
           <NavbarButton variant="primary">
<SignedIn>
  <div className="flex items-center gap-3 group">
    <div className="relative flex items-center">
      <UserButton 
        appearance={{
          elements: {
            avatarBox: "w-9 h-9 group-hover:ring-2 group-hover:ring-primary-200/50 transition-all duration-200 ease-in-out",
            userButtonPopoverCard: "shadow-xl rounded-lg border border-gray-100",
            userButtonPopoverActionButton: "hover:bg-primary-50",
            userButtonPopoverActionButtonText: "text-gray-700",
            userButtonPopoverActionButtonIcon: "text-primary-500"
          }
        }}
      />
    </div>
    <div className="flex flex-col items-start leading-tight">
      <span className="text-xs font-medium text-gray-500 tracking-wide">
        Welcome back
      </span>
      <span className="text-sm font-semibold text-gray-800 truncate max-w-[140px] group-hover:text-primary-600 transition-colors duration-200">
        {user?.firstName}
      </span>
    </div>
  </div>
</SignedIn>

  <SignedOut>
    <SignUpButton/>
  </SignedOut>
</NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <NavbarLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader> 

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          >
            {navItems.map((item, idx) => (
              <a
                key={`mobile-link-${idx}`}
                href={item.link}
                onClick={() => setIsMobileMenuOpen(false)}
                className="relative text-neutral-600 dark:text-neutral-300"
              >
                <span className="block">{item.name}</span>
              </a>
            ))}
            <div className="flex w-full flex-col gap-4">
             
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="primary"
                className="w-full"
              >
                Book 
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
      {/* <DummyContent />/> */}

      {/* Navbar */}
    </div>
  );
}

