"use client";

import { useConvexAuth } from "convex/react";
import { ArrowLeftRight, ArrowRight, ArrowUp01, ArrowUpLeft, ArrowUpNarrowWide, ArrowUpRight, ArrowUpToLine } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import Link from "next/link";
import CircleImage from './eplise.png';
import "@fontsource/outfit"; // Defaults to weight 400

import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Image from "next/image";


export const Heading = () => {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
    
  };
  

  return (

    
       <div className="px-10 pb-10 ">
         <style jsx>{`
        .selectable-text::selection {
          background-color: white;
          color: black;
          height: max-content;
          width: max-content;
        }
      `}</style>
      <h2 className=" text-left text-6xl font-normal text-white selectable-text "   style={navbarStyle}> 
      Introudcing
      </h2>
      <p className="text-base text-left font-normal	text-[#B3B3B3] pt-4 text-wrap selectable-text"     style={navbarStyle}>
      Today, SILX INC Lunches SILX AI modules embarked on the LLM Product from the <br /> Cairo , Egypt near Manama Bahrain,  to get into the Kickstart accelator program ,<br /> Lorem ipsum is amazing ,  six-month mission.
      </p>
      {!isAuthenticated && !isLoading && (
        <div className="flex items-center pt-4 z-50">
          <SignInButton mode="modal">
            <Button className="bg-white text-black hover:text-white z-[999]">
              Start for free
              <ArrowUpRight className="h-6 w-6 ml-2" />
            </Button>
          </SignInButton>
        </div>
      )}




        <h1 className="text-white  text-[15vh] md:text-[60vh]/[1] whitespace-nowrap pt-1 selectable-text relative z-1  " style={navbarStyle}> 
          SILX <span className="text-transparent bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text selectable-text relative">AI</span>
        </h1>

        <div className="flex flex-col justify-between gap-5 p-4 pt-8 md:flex-row">
    <p className="text-left text-white max-w-[100%] md:max-w-[60%]  text-xl selectable-text" style={navbarStyle}>
        Revolutionizing Space Exploration: <br />
        AI's Cosmic Odyssey.
    </p>
    <p className="text-sm text-[#B3B3B3]  max-w-[100%] md:max-w-[60%] text-left selectable-text" style={navbarStyle}>
        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. 
    </p>
</div>


      <div className="border border-[#808080] mt-20">
  {/* Your content here */}
</div>


   
  

    </div>
 
  )
}