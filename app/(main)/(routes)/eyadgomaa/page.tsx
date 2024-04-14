"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Navbar from "@/components/global/navbar";
//just a blog test
//dfd
import Eyad from '../../../(marketing)/_components/eyad.jpg'
 const Blog = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
  <div>
    <Navbar/>
     <div className=" px-10 pb-10 bg-white pt-[15vh]" >
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
<h1 className="text-black text-3xl text-left selectable-text"  style={navbarStyle}>Blog</h1>
<div className="flex flex-col md:flex-row justify-between gap-[2rem] pt-6">   
<div className="w-[100%] md:w-[50%]">
<h1 className="text-black text-left text-3xl md:text-6xl  selectable-text" style={navbarStyle}>
&quot;Eyad Gomaa: <br />Pioneering AI Innovator, <br /> and Entrepreneur&quot; 

 </h1>
 <h1 className="text-black text-left text-3xl md:text-6xl  selectable-text mt-5">  - SILX AI. ©2024 
</h1>
 <div>

<div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 In the fast-paced world of technology and entrepreneurship, certain individuals stand out for their visionary leadership and groundbreaking innovations. Eyad Gomaa is one such figure, whose journey from humble beginnings to the forefront of artificial intelligence (AI) has captured the imagination of many. </p>
</div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
<b>The Early Years</b>:   Eyad Gomaa&apos;s story begins in Minya University, where his fascination with computers and technology first took root. Even at a young age, Gomaa demonstrated an exceptional aptitude for coding and programming, setting the stage for his future endeavors. </p>

</div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 <b>A Bold Leap into Entrepreneurship</b>: At just 17 years old, Gomaa made the daring decision to drop out of university and pursue his entrepreneurial dreams. Undeterred by the challenges ahead, he embarked on a journey that would ultimately reshape the landscape of AI technology.
 </p>
</div>
<div className="flex flex-col w-auto">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 <b>Revolutionizing Driver Education with Triv AI</b>: One of Gomaa&apos;s early ventures, Triv AI (also known as Driv AI), made waves in the industry by introducing the world&apos;s first AI-powered driving school. Leveraging cutting-edge AI algorithms, Triv AI transformed the way individuals learn to drive, making education more accessible, interactive, and effective.
 </p>
</div>
<div className="flex flex-col w-auto">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 <b>SILX AI: Pushing the Boundaries of Innovation</b>: Building on the success of Triv AI, Gomaa shifted his focus to SILX AI, a subsidiary of SILX INC. Here, he leads a team of talented engineers and data scientists in the development of AI models that are redefining the possibilities of artificial intelligence. With a relentless commitment to innovation, Gomaa aims to create the smartest AI models in the world, capable of tackling the most complex challenges across various industries.
 </p>
</div>
<div className="flex flex-col w-auto">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 <b>A Visionary Leader and Role Model</b>: Beyond his technological achievements, Eyad Gomaa is admired for his visionary leadership and entrepreneurial spirit. His journey serves as an inspiration to aspiring innovators and entrepreneurs worldwide, proving that with passion, perseverance, and a willingness to take risks, anything is possible.
 </p>
</div>
<div className="flex flex-col w-auto">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 <b>Conclusion</b>: In the ever-evolving landscape of technology, Eyad Gomaa stands as a beacon of innovation and ingenuity. From his early days as a computer enthusiast to his current role as a pioneering AI entrepreneur, Gomaa&apos;s journey exemplifies the transformative power of technology to shape the future. As he continues to push the boundaries of what&apos;s possible, one thing is certain: Eyad Gomaa&apos;s impact on the world of AI and entrepreneurship will be felt for years to come.
 </p>
</div>
</div>
</div>







</div>

<div className="h-[45vh] w-[45vh] md:h-[100vh] md:w-[100vh]">
<Image
src={Eyad}
className="h-[100%] w-[100%] object-fill mt-5 selectable-text"
alt="Space"
/>
</div>

</div>
<div className="border border-[#808080] mt-20">

</div>

</div>
  </div>
 
  )
}

export default Blog;