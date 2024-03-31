"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
export const Heroes = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <div className=" px-10 pb-10 " id="results" >
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
      <h1 className="text-white text-3xl text-left selectable-text"  style={navbarStyle}>Our Values</h1>
     <div className="flex flex-col justify-between gap-[7rem] pt-3 md:flex-row">   
   <div className=""> 
   <Image
    src={Space}
    className="h-[510px] w-[510px] object-cover mt-5 selectable-text"
    alt="Space"
   />
   </div>
 <div>
    <div className="flex flex-col pt-5">
        <h2 className="text-white text-left text-6xl selectable-text" style={navbarStyle}>100%</h2>
        <p className="text-[#B3B3B3] text-left text-base w-[100%] md:w-[80%] pt-4 selectable-text" style={navbarStyle}>
            Honesty, Integrity, Loyalty
        </p>
    </div>

    <div className="flex flex-col pt-4">
        <h2 className="text-white text-left text-6xl selectable-text" style={navbarStyle}>100%</h2>
        <p className="text-[#B3B3B3] text-left text-base w-[100%] md:w-[80%] pt-4 selectable-text" style={navbarStyle}>
            Customer-Focused, High-Quality, High-Quantity
        </p>
    </div>

    <div className="flex flex-col pt-4">
        <h2 className="text-white text-left text-6xl selectable-text" style={navbarStyle}>100%</h2>
        <p className="text-[#B3B3B3] text-left text-base w-[100%] md:w-[80%] pt-4 selectable-text" style={navbarStyle}>
            Dedicated to Inspire  <br />Future Generations.
        </p>
    </div>
</div>

     </div>
    </div>
  )
}