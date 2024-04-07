"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
export const Results = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <section className=" px-10 pt-6 px-10 pb-10 bg-black " id="results" >
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
       <h1 className="text-5xl md:text-8xl  bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500 font-sans font-bold selectable-text" >
                 Our Values
                </h1>
     <div className="flex flex-col justify-between  pt-3 md:flex-row">   
   <div className=""> 
   <Image
    src={Space}
    className="h-[540px] w-[600px] object-cover mt-5 selectable-text"
    alt="Space"
   />
   </div>
 <div className="w-[50%]"> 
    <div className="flex flex-col justify-center pt-5">
        <h2 className="text-white text-left text-6xl selectable-text" style={navbarStyle}>99%</h2>
        <p className="text-[#B3B3B3] text-left text-base w-[100%] md:w-[80%] pt-4 selectable-text" style={navbarStyle}>
        We&apos;re proud to offer a 99% exact matching success rate for companies seeking to hire across a diverse range of categories. Whether you&apos;re in need of skilled software engineers, meticulous data analysts, or experienced lawyers.
        </p>
    </div>

    <div className="flex flex-col pt-4">
        <h2 className="text-white text-left text-6xl selectable-text" style={navbarStyle}>54%</h2>
        <p className="text-[#B3B3B3] text-left text-base w-[100%] md:w-[80%] pt-4 selectable-text" style={navbarStyle}>
        We pride ourselves on efficiency. Our platform is a staggering 54% faster than the latest ChatGPT-4 Turbo model. Don&apos;t compromise on speed when seeking the perfect match for your company. With us, you&apos;ll experience swift and accurate results.
        </p>
    </div>

    <div className="flex flex-col pt-4">
        <h2 className="text-white text-left text-6xl selectable-text" style={navbarStyle}>120</h2>
        <p className="text-[#B3B3B3] text-left text-base w-[100%] md:w-[80%] pt-4 selectable-text" style={navbarStyle}>
        Exciting news from SILXAI ! We&apos;re thrilled to announce that our platform has facilitated over 120 successful connections, spanning a wide range of salary brackets from $40,000 to an impressive $340,000 USD, These connections represent valuable partnerships between companies and talented professionals
        </p>
    </div>
</div>

     </div>
     
    </section>
     
  )
}