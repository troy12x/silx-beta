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
        .selectable-text::selection {
          background-color: white;
          color: black;
          height: max-content;
          width: max-content;
        }
      `}</style>
<h1 className="text-black text-3xl text-left selectable-text"  style={navbarStyle}>Research</h1>
<div className="flex flex-col md:flex-row justify-between gap-[2rem] pt-6">   
<div className="w-[100%] md:w-[50%]">
<h1 className="text-black text-left text-3xl md:text-6xl  selectable-text" style={navbarStyle}>
 “AI ignites cosmic <br /> exploration, fueling our <br /> quest for understanding <br />and inspiring the next <br />frontier of discovery.”
 </h1>
 <div>

<div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 Space exploration has always been a captivating endeavor, pushing the boundaries of human knowledge and technological innovation. In recent years, </p>
</div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 the integration of artificial intelligence (AI) has revolutionized how we explore the cosmos. This paper delves into the fascinating intersection of AI and space exploration, highlighting its current applications, future potential, and ethical considerations. </p>
</div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 The vastness of space has intrigued humanity for centuries, driving us to reach for the stars in search of answers to profound questions about our universe. With the advent of AI technologies, space agencies and researchers have unlocked new possibilities for unraveling the mysteries of the cosmos. This paper explores the transformative impact of AI on space exploration and the exciting prospects it holds for the future.
 </p>
</div>
<div className="flex flex-col w-auto">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 AI has already made significant contributions to various aspects of space exploration, from autonomous navigation systems on spacecraft to advanced image analysis techniques for identifying celestial objects. For example.
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