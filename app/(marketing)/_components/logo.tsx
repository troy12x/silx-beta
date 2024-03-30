import Image from "next/image";
import { Poppins } from "next/font/google";
import "@fontsource/outfit"; // Defaults to weight 400

import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: ["400", "600"]
});

export const Logo = () => {
  const navbarStyle = {
    fontFamily: "Outfit",  // Apply the Outlift font here
   
  };
  return (
    <div className="flex items-center justify-center border rounded-full bg-white px-5 py-2  text-black  text-center">

    <h1 className="text-xl whitespace-nowrap text"  style={navbarStyle}>SILX AI.</h1>
</div>


  )
}