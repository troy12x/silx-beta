"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
export const Teams = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <div className="pt-10 p-6 bg-white px-10 pb-10 " id="team" >
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
      <h1 className="text-black text-3xl text-left selectable-text"  style={navbarStyle}>Founders</h1>
     <div className="flex flex-col md:flex-row justify-center pt-7 items-center md:flex-row sm:flex-row lg:flex-row xl:flex-row">   
        <div className="flex flex-col  w-[100%] md:w-[30%]  pt-7 ">
            <Image 
            src={Space}
            className="rounded-xl h-[350px] w-[350px] object-cover"
            alt=""
            />
          
            <h2 className="text-left text-black text-lg mt-5 font-medium  selectable-text" style={navbarStyle}>Michael A.</h2>
            <p className="truncate w-[76%] text-left text-[#3D3D3D] selectable-text" style={navbarStyle}>18 Years Old<br />Thinker</p>
            <p className="text-left text-[#3D3D3D] selectable-text text-sm pt-3">CEO <span className=" selectable-text">|</span> Co-Founder</p>

        </div>
        <div className="flex flex-col  w-[100%] md:w-[30%]  pt-7">
            <Image 
            src={Space}
            className="rounded-xl h-[350px] w-[350px] object-cover"
            alt=""
            />
          
            <h2 className="text-left text-black text-lg mt-5 font-medium selectable-text" style={navbarStyle}>Eyad Gomaa</h2>
            <p className="truncate w-[76%] text-left text-[#3D3D3D] selectable-text" style={navbarStyle}>17 Years Old<br />Developer</p>
            <p className="text-left text-[#3D3D3D] selectable-text text-sm pt-3">CTO <span className=" selectable-text">|</span> Co-Founder</p>
        </div>

        <div className="flex flex-col  w-[100%] md:w-[30%] pt-7">
            <Image 
            src={Space}
            className="rounded-xl h-[350px] w-[350px] object-cover"
            alt=""
            />
          
            <h2 className="text-left text-black text-lg mt-5 font-medium  selectable-text" style={navbarStyle}>This could be you!</h2>
            <p className="truncate w-[76%] text-left text-[#3D3D3D]  selectable-text" style={navbarStyle}>Ambitious<br />Student</p>
            <p className="text-left text-[#3D3D3D] selectable-text text-sm pt-3">CFO <span className=" selectable-text">|</span> 10% equity</p>

        </div>

     </div>
     <div className="border border-black mt-20"></div>
    </div>
  )
}