"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
export const Heroes = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <section className=" px-10 h-[70vh] bg-black" id="results" >
            <style jsx>{`
        @layer utilities {
          .selectable-text::selection {
            background-color: white;
            color: black;
            height: max-content;
            width: max-content;
          }
        }
      `}</style>
     <div className="flex flex-col justify-between gap-[7rem] pt-3 md:flex-row ">   
    
     </div>
    </section>
  )
}