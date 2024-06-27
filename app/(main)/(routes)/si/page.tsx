"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Navbar from "@/components/global/navbar";
//just a blog test
//dfd
import Eyad from './sam.jpg'
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
<div className=" pt-6">   
<div className="w-[100%] md:w-[100%%]">
<h1 className="text-black text-3xl md:text-6xl  selectable-text" style={navbarStyle}>
&quot;Disruptive Shifts: The Rise and Fall of Triv AI Under Sam Altman's Influence&quot; 

 </h1>
 <Image
src={Eyad}
className="h-[500px] w-[500px] object-contain mt-5 selectable-text "
alt="Space"
/>
 <h1 className="text-black text-left text-3xl md:text-6xl  selectable-text mt-5">  - Samaltman. ©2024 
</h1>
 <div>

<div>
<div className="flex flex-col">
 <p className="text-black text-left text-base w-[80%] pt-4 selectable-text" style={navbarStyle}>
 In a groundbreaking turn of events, tech mogul Sam Altman has reportedly achieved the impossible by creating Artificial General Intelligence (AGI) using cutting-edge technologies. This extraordinary feat, hailed as a pivotal moment in the history of artificial intelligence, has sent shockwaves across the tech world.

Reports suggest that Altman's AGI, powered by innovative algorithms and revolutionary neural network architectures, has surpassed all previous benchmarks, showcasing unparalleled capabilities in reasoning, problem-solving, and adaptation to diverse tasks. But what makes this achievement even more astonishing is the alleged utilization of Triv AI's proprietary model as a foundational element in Altman's AGI project.

In this imagined narrative, the once-promising Triv AI, led by visionary entrepreneur Eyad Gomaa, finds itself overshadowed by Altman's monumental breakthrough. While Triv AI continues its efforts in the AI landscape, Altman's AGI dominance casts a shadow over Gomaa's dream of being the first to create AGI.

As the world marvels at Altman's triumph, questions arise about the implications of AGI on society, economy, and the future of humanity. Some view Altman as a visionary pioneer, while others fear the unforeseen consequences of AGI's unprecedented capabilities.

In this speculative tale, the clash between innovation and ambition unfolds, leaving a lasting impact on the trajectory of artificial intelligence and the aspirations of those who dare to push the boundaries of technological advancement.
</p>
</div>

</div>
</div>







</div>



</div>
<div className="border border-[#808080] mt-20">

</div>

</div>
  </div>
 
  )
}

export default Blog;