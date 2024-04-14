"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { redirect, useRouter } from "next/navigation";

import { useConvexAuth } from "convex/react";
import { ArrowLeftRight, ArrowRight, ArrowUp01, ArrowUpLeft, ArrowUpNarrowWide, ArrowUpRight, ArrowUpToLine,  } from "lucide-react";
import Link from "next/link";
import { SignInButton , RedirectToSignUp  } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";



export const Individual = () => {





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
      <h1 className="text-black text-3xl text-center selectable-text"  style={navbarStyle}>Individual Need work? </h1>
     <div className="flex flex-col justify-center pt-7 ">   
     
      <p className="text-center text-base px-40">
      Are you facing job loss or searching for new opportunities? Join the SILX AI platform! Post your resume, showcase your work, and find a job in just 5 minutes. Connect with top employers and streamline your job search effortlessly with SILX AI
      </p>
    
  
        
     <Button variant="ghost" size="sm" asChild className="p-0 mt-4 bg-black text-white">
     <Link href="/pick">
            Start for free
    </Link>
 
     </Button>

     </div>
     <div className="border border-black mt-20"></div>
    </div>
  )
}