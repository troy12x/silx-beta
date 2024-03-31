"use client";

import Image from "next/image";
import "@fontsource/outfit"; // Defaults to weight 400
import Space from './space.png'
import { LucideVerified, Verified, VerifiedIcon} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Pricing = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <div className=" p-6 bg-white px-10 pb-10 " id="pricing" >
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

      <h1 className="text-black text-3xl text-left selectable-text"  style={navbarStyle}>Benefits</h1>
     <div className="flex flex-col md:flex-row  justify-center pt-7 items-center px-4">   
    
      <div className="h-[510px] w-[400px] bg-white rounded-3xl overflow-hidden border-2 border-black  border-opacity-10 p-[30px]">
     
            <h3 className="font-bold text-left text-1xl"> Individual</h3>
            <div className="flex items-center justify-start gap-2">
                <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-blue-400 bg-opacity-40 bg-clip-text text-transparent" >
                  <h2 className="text-[60px] font-bold" >$2</h2>
                </div>
                <div className="text-left text-[#434343]">
                per
                <br />
                Application
                </div>
            </div>
   
          <p className="text-[#9f9f9f] text-left" style={navbarStyle}>
Designed to find your first employee.

          </p>
          <ul className="p-1 pt-3">
            <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
            <svg
      className="with-icon_icon__MHUeb"
      data-testid="geist-icon"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      style={{
        color: 'currentColor',
       
       
        width: '20px',
        height: '20px'
      }}
    >
      <path 
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
        fill="var(--geist-fill)" 
        stroke="var(--geist-fill)"
      />
      <path 
        d="M8 11.8571L10.5 14.3572L15.8572 9" 
        fill="none" 
        stroke="var(--geist-stroke)"
        style={{ color: '#fff' }}
      />
    </svg>
    Provides 1 Job Posting.

            </li>
            <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
            <svg
      className="with-icon_icon__MHUeb"
      data-testid="geist-icon"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      style={{
        color: 'currentColor',
       
       
        width: '20px',
        height: '20px'
      }}
    >
      <path 
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
        fill="var(--geist-fill)" 
        stroke="var(--geist-fill)"
      />
      <path 
        d="M8 11.8571L10.5 14.3572L15.8572 9" 
        fill="none" 
        stroke="var(--geist-stroke)"
        style={{ color: '#fff' }}
      />
    </svg>
             100 Monthly Queries

            </li>
            <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
            <svg
      className="with-icon_icon__MHUeb"
      data-testid="geist-icon"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      style={{
        color: 'currentColor',
       
       
        width: '20px',
        height: '20px'
      }}
    >
      <path 
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
        fill="var(--geist-fill)" 
        stroke="var(--geist-fill)"
      />
      <path 
        d="M8 11.8571L10.5 14.3572L15.8572 9" 
        fill="none" 
        stroke="var(--geist-stroke)"
        style={{ color: '#fff' }}
      />
    </svg>
    100% Processing
            </li>
            <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
            <svg
      className="with-icon_icon__MHUeb"
      data-testid="geist-icon"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      style={{
        color: 'currentColor',
       
       
        width: '20px',
        height: '20px'
      }}
    >
      <path 
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
        fill="var(--geist-fill)" 
        stroke="var(--geist-fill)"
      />
      <path 
        d="M8 11.8571L10.5 14.3572L15.8572 9" 
        fill="none" 
        stroke="var(--geist-stroke)"
        style={{ color: '#fff' }}
      />
    </svg>
    Supports Data from 100 Applications.

            </li>
            <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
            <svg
      className="with-icon_icon__MHUeb"
      data-testid="geist-icon"
      height="24"
      shapeRendering="geometricPrecision"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
      width="24"
      style={{
        color: 'currentColor',
       
       
        width: '20px',
        height: '20px'
      }}
    >
      <path 
        d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
        fill="var(--geist-fill)" 
        stroke="var(--geist-fill)"
      />
      <path 
        d="M8 11.8571L10.5 14.3572L15.8572 9" 
        fill="none" 
        stroke="var(--geist-stroke)"
        style={{ color: '#fff' }}
      />
    </svg>
    API, 24/7 Attention, Guarantee


            </li>
            
          </ul>
          <Button className="rounded-full text-white flex justify-center items-center bg-black font-medium text-center py-6 px-20 relative ">
            Gain
          </Button>
         
      </div>

      <div className="h-[510px] w-[400px] bg-white rounded-3xl overflow-hidden border-2 border-black  p-[30px]">
     
     <h3 className="font-bold text-left text-1xl">Business</h3>
     <div className="flex items-center justify-start gap-2">
         <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-blue-400 bg-opacity-40 bg-clip-text text-transparent" >
           <h2 className="text-[60px] font-bold" >$10</h2>
         </div>
         <div className="text-left text-[#434343]">
         per
         <br />
         Application
         </div>
     </div>

   <p className="text-[#9f9f9f] text-left" style={navbarStyle}>
   Grow your business.
   </p>
   <ul className="p-1 pt-3">
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
Provides 10 Job Postings.


     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
1000 Monthly Queries

     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
150% Processing
     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
Supports Data from 1000 Applications.

     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
API, 24/7 Attention, Guarantee



     </li>
     
   </ul>
   <Button className="rounded-full text-white flex justify-center items-center bg-black font-medium text-center py-6 px-20 relative ">
     Gain
   </Button>
  
</div>
<div className="h-[510px] w-[400px]  bg-white rounded-3xl overflow-hidden border-2 border-black  border-opacity-10 p-[30px]">
     
     <h3 className="font-bold text-left text-1xl">Enterprise</h3>
     <div className="flex items-center justify-start gap-2">
         <div className="bg-gradient-to-r from-purple-300 via-purple-400 to-blue-400 bg-opacity-40 bg-clip-text text-transparent" >
           <h2 className="text-[60px] font-bold" >$25</h2>
         </div>
         <div className="text-left text-[#434343]">
         per
         <br />
         Application
         </div>
     </div>

   <p className="text-[#9f9f9f] text-left" style={navbarStyle}>
   Find the best.
   </p>
   <ul className="p-1 pt-3">
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
Provides 100+ Job Postings.

     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
10000+ Monthly Queries

     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
200% Processing
     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
Supports Data from 10000+ Applications.

     </li>
     <li className="flex gap-[0.4rem] mb-[15px] items-center"> 
     <svg
className="with-icon_icon__MHUeb"
data-testid="geist-icon"
height="24"
shapeRendering="geometricPrecision"
stroke="currentColor"
strokeLinecap="round"
strokeLinejoin="round"
strokeWidth="1.5"
viewBox="0 0 24 24"
width="24"
style={{
 color: 'currentColor',


 width: '20px',
 height: '20px'
}}
>
<path 
 d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z" 
 fill="var(--geist-fill)" 
 stroke="var(--geist-fill)"
/>
<path 
 d="M8 11.8571L10.5 14.3572L15.8572 9" 
 fill="none" 
 stroke="var(--geist-stroke)"
 style={{ color: '#fff' }}
/>
</svg>
API, 24/7 Attention, Guarantee



     </li>
     
   </ul>
   <Button className="rounded-full text-white flex justify-center items-center bg-black font-medium text-center py-6 px-20 relative ">
     Gain
   </Button>
  
</div>

     </div>
     <div className="border border-black mt-20"></div>
    </div>
  )
}