"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
export const Teams = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <div className="pt-10 p-6 bg-white px-10 pb-10 " >
            <style jsx>{`
        .selectable-text::selection {
          background-color: black;
          color: white;
        }
      `}</style>
      <h1 className="text-black text-3xl text-left selectable-text"  style={navbarStyle}>Our Founding team</h1>
     <div className="flex flex-col md:flex-row justify-center pt-7 items-center md:flex-row sm:flex-row lg:flex-row xl:flex-row">   
        <div className="flex flex-col  w-[100%] md:w-[30%]  pt-7 ">
            <Image 
            src={Space}
            className="rounded-xl h-[350px] w-[350px] object-cover"
            alt=""
            />
          
            <h2 className="text-left text-black text-lg mt-5 font-medium  selectable-text" style={navbarStyle}>Michael A. | CEO & CO-FOUNDER</h2>
            <p className="truncate w-[76%] text-left text-[#3D3D3D] selectable-text" style={navbarStyle}>Rocket Lab aims to return to flight this year after <br />September launch failure. The company is still investigating the Sept. </p>
            <p className="text-left text-[#3D3D3D] selectable-text text-sm pt-3">Space and Universe <span className=" selectable-text">|</span> 3 mins read</p>

        </div>
        <div className="flex flex-col  w-[100%] md:w-[30%]  pt-7">
            <Image 
            src={Space}
            className="rounded-xl h-[350px] w-[350px] object-cover"
            alt=""
            />
          
            <h2 className="text-left text-black text-lg mt-5 font-medium selectable-text" style={navbarStyle}>Eyad Gomaa | CTO & CO-FOUNDER</h2>
            <p className="truncate w-[76%] text-left text-[#3D3D3D] selectable-text" style={navbarStyle}>Rocket Lab aims to return to flight this year after <br />September launch failure. The company is still investigating the Sept. </p>
            <p className="text-left text-[#3D3D3D] selectable-text text-sm pt-3">Space and Universe <span className=" selectable-text">|</span> 3 mins read</p>
        </div>
        <div className="flex flex-col  w-[100%] md:w-[30%] pt-7">
            <Image 
            src={Space}
            className="rounded-xl h-[350px] w-[350px] object-cover"
            alt=""
            />
          
            <h2 className="text-left text-black text-lg mt-5 font-medium  selectable-text" style={navbarStyle}>Our Slave | just a slave</h2>
            <p className="truncate w-[76%] text-left text-[#3D3D3D]  selectable-text" style={navbarStyle}>Rocket Lab aims to return to flight this year after <br />September launch failure. The company is still investigating the Sept. </p>
            <p className="text-left text-[#3D3D3D] selectable-text text-sm pt-3">Space and Universe <span className=" selectable-text">|</span> 3 mins read</p>

        </div>
     </div>
     <div className="border border-black mt-20"></div>
    </div>
  )
}