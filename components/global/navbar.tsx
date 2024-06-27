"use client";

import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { MenuIcon } from 'lucide-react'
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';


type Props = {}

const Navbar =  (props: Props) => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const router = useRouter();
  const [updatedDocumentId, setUpdatedDocumentId] = useState<string | null>(null);


  const handleOnProfile = async () => {
    router.push(`/individuals/${updatedDocumentId}/profile`);
   
   };


  return (
    <header className="fixed right-0 left-0 top-0 py-4 px-6 bg-black/40 backdrop-blur-lg z-[100] flex items-center border-b-[1px] border-neutral-900 justify-between">
      <aside className="flex items-center gap-[2px]">
        <p className="text-2xl font-bold text-white">SILX</p>
      
      </aside>
      <nav className="absolute left-[50%] top-[50%] transform translate-x-[-50%] translate-y-[-50%] hidden md:block">
        <ul className="flex items-center gap-4 list-none">
          <li className='text-white'>
            <Link href="#">Home</Link>
          </li>
          <li className='text-white'>
            <Link href="#">Results</Link>
          </li>
          <li className='text-white'>
            <Link href="#">Team</Link>
          </li>
          <li className='text-white'>
            <Link href="#">Pricing</Link>
          </li>
         
        </ul>
      </nav>
     
      <aside className="flex items-center gap-4">
      {isAuthenticated && !isLoading && (
        <Button
         
         onClick={handleOnProfile}
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
         Get Started
          </span>
        </Button>
    )}
         <UserButton afterSignOutUrl="/" /> 
        <MenuIcon className="md:hidden text-white" />
        {!isAuthenticated && !isLoading && (
          <div className="flex flex-wrap gap-x-2">
            <SignInButton mode="modal">
              <Button variant="ghost" size="sm" className='text-white rounded-full px-3 py-1 hover:text-white hover:bg-transparent '>
                Log in
              </Button>
            </SignInButton>
            <SignInButton mode="modal">
              <Button size="sm" className='text-black bg-white rounded-full px-3 py-1 hover:text-white'>
                Signup
              </Button>
            </SignInButton>
          </div>
        )}
    
      </aside>
      
             
       
    </header>
  )
}

export default Navbar
