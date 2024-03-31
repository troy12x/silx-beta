"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
import { useConvexAuth } from "convex/react";
import { ArrowLeftRight, ArrowRight, ArrowUp01, ArrowUpLeft, ArrowUpNarrowWide, ArrowUpRight, ArrowUpToLine,  } from "lucide-react";
import Link from "next/link";
import { SignInButton , RedirectToSignUp  } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
export const Individual = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();

  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <div className=" p-6 bg-white px-10 pb-10 " id="team" >
       <style jsx>{`
  @layer utilities {
    .selectable-text::selection {
      background-color: black;
      color: white;
      height: max-content;
      width: max-content;
    }
  }
`}</style>
      <h1 className="text-black text-3xl text-center selectable-text"  style={navbarStyle}>Excited to work? </h1>
     <div className="flex flex-col justify-center pt-7 ">   
     
      <p className="text-center text-base px-40">
      Left a terrible company? Forget that awful overlord. <br /> Join now and find a job in 5 minutes!
      </p>
    
  
        
     <Button variant="ghost" size="sm" asChild className="p-0 mt-4 bg-black text-white px-50">
     <Link href="/individual">
            Have an Impact!
    </Link>
 
     </Button>

     </div>
     <div className="border border-black mt-20"></div>
    </div>
  )
}