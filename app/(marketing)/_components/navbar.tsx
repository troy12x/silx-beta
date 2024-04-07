"use client";

import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import Link from "next/link";
import "@fontsource/outfit"; // Defaults to weight 400
import { useState, useEffect } from 'react';

import { useScrollTop } from "@/hooks/use-scroll-top";
import { ModeToggle } from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { MenuIcon } from 'lucide-react';
import { Spinner } from "@/components/spinner";
import { cn } from "@/lib/utils";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Logo } from "./logo";
import { useRouter } from 'next/router'; // <-- Import useRouter

export const Navbar = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const scrolled = useScrollTop();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };

  


  return (
    <div className={cn(
      "z-50 bg-black top-0 flex justify-between items-center w-full p-8 ",
      scrolled && "shadow-sm"
    )}>
      <Logo />

      <div className="md:hidden">
        {/* Hamburger Menu Button */}
    
        <Sheet>
          <SheetTrigger asChild>
            <button 
            
              className="text-white focus:outline-none focus:bg-gray-700 px-2 py-1 rounded">
              <MenuIcon/>
            </button>
          </SheetTrigger>
          <SheetContent className="z-[1000]">
          <SheetHeader>
    
        </SheetHeader>
            {/* Mobile Menu */}
          
              <div>
              <ul className="py-2">
                  <li className="my-1 px-4">
                    <Link href="/">
                      Home
                    </Link>
                  </li>
                  <li className="my-1 px-4">
                    <Link href="#results">
                    Results
                    </Link>
                  </li>
                  <li className="my-1 px-4">
                    <Link href="#team"  >
                      Team
                    </Link>
                  </li>
                  <li className="my-1 px-4">
                    <Link href="#pricing" className="text-black">
                      Pricing
                    </Link>
                  </li>
                  <li>
           {isAuthenticated && !isLoading && (
        
        <Button variant="ghost" size="sm" asChild className="p-0">
          <Link href="/documents">
            Dashboard
          </Link>
        </Button>
        )}
           </li>
      
                  {!isAuthenticated && !isLoading && (
          <div className="flex flex-wrap gap-x-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">
                Signup
              </Button>
            </SignInButton>
          </div>
        )}
        <div className="hidden md:flex"> 
        <UserButton
          afterSignOutUrl="/"
        />
        </div>
                </ul>
              </div>
   
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden  md:flex px-5 py-2 md:ml-auto md:justify-end w-full md:w-auto flex flex-wrap items-center gap-x-3 md:bg-white rounded-full">
        {isLoading && (
          <Spinner />
        )}

    

        {/* Desktop Menu */}
        {!isLoading && (
          <ul className="hidden md:flex flex-wrap gap-x-4">
            <li className="flex justify-center items-center">
              <Link href="/">
                Home  
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link href="#results">
                Results
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link href="#team"  >
                Team
              </Link>
            </li>
            <li className="flex justify-center items-center">
              <Link href="#pricing" >
                Pricing
              </Link>
            </li>
           
           <li>
           {isAuthenticated && !isLoading && (
        
        <Button variant="ghost" size="sm" asChild className="p-0">
          <Link href="/documents">
            Dashboard
          </Link>
        </Button>
     
   
          )}
           </li>
      
           
          </ul>
        )}

{!isAuthenticated && !isLoading && (
          <div className="flex flex-wrap gap-x-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm">
                Signup
              </Button>
            </SignInButton>
          </div>
        )}
        <div className="hidden md:flex"> 
        <UserButton
          afterSignOutUrl="/"
        />
        </div>
      </div>
    </div>
  );
};
