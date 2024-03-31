"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './mars.png'
export const Research = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <div className=" px-10 pb-10 bg-white pt-4" >
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
<h1 className="text-black text-3xl text-left selectable-text"  style={navbarStyle}>Innovation</h1>
<div className="flex flex-col md:flex-row justify-between gap-[2rem] pt-6">   
<div className="w-[100%] md:w-[50%]">
<h1 className="text-black text-left text-3xl md:text-6xl  selectable-text" style={navbarStyle}>
 “ Change is constant. <br /> Make things better, <br /> not worse. „ <br /> - Michael A. © 2024 
 </h1>
 <div>

<div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 Artifical Intelligence has always been a captivating endeavor, pushing the boundaries of human knowledge and technological innovation. In recent years, </p>
</div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 the integration of Artificial Intelligence (AI) has revolutionized how we hire new employees. At SILX AI, we reinvent the recruiting, hiring and training process.
  We ask ourselves questions like &quot;What would make our customer happy?&quot;, and &quotHow can we make this easier?&quot;. </p>
</div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 The amount of unqualified employees and overqualified employers has intrigued us for decades, driving us to start SILX AI, to make the recruiting process cheap, fast, time-efficient and effortless.
 </p>
</div>
<div className="flex flex-col w-auto">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 AI has already made significant contributions to various aspects of the world, from autonomous agents to solving mathematical problems. Why do people and companies still struggle to hire? We are here to change that.
 </p>
</div>
</div>
</div>







</div>

<div className="h-[45vh] w-[45vh] md:h-[100vh] md:w-[100vh]">
<Image
src={Space}
className="h-[100%] w-[100%] object-fill mt-5 selectable-text"
alt="Space"
/>
</div>

</div>
<div className="border border-[#808080] mt-20">

</div>

</div>
  )
}