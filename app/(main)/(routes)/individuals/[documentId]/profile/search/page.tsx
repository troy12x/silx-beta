"use client";

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import axios from 'axios';
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SendIcon , LucideGithub} from 'lucide-react';
import { toast } from 'sonner';
import { FaGithubAlt, FaBookmark ,} from "react-icons/fa";
import { MdOutlineCollectionsBookmark } from "react-icons/md";

import Eyad from './../../../../../../(marketing)/_components/eyad.jpg'
import Icon from './gold.png'
type Individual = {
  _id: Id<"individual">;
  _creationTime: number;
  userId: string;
  individualTitle: string;
  skill: string;
  name: string;
  email: string;
  experience: string;
  description: string;
  programmingLanguages: string[];  // Updated property name
};

interface MatchPageProps {
  params: {
    documentId: Id<"individual">;
  };
}

const Match = ({ params }: MatchPageProps) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [yourFilter, setYourFilter] = useState("");
  const [showContent, setShowContent] = useState(false);


  const [buttonTexts, setButtonTexts] = useState({
    button1: 'Compete',
    button2: 'Compete',
    button3: 'Compete',
    button4: 'Compete',
    button5: 'Compete',
  });

  const individuals = useQuery(api.individuals.getAll);
 
  const handleClick = (button: string) => {
    setButtonTexts((prevButtonTexts) => ({
      ...prevButtonTexts,
      [button]: 'Competing',
    }));
  };

//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
const OPENAI_API_KEY = "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"

const insert = useMutation(api.individuals.insert);
 
const handleInert = () => {
  try {
    const promise = insert({
      id: params.documentId,
      
    })

    

    toast.promise(promise, {
      loading: "Loading...",
      success:"It has been sent successfully. Searching for match"
    });


  }catch (error) {
    console.error("error sending your filters:", error);
    toast.error("Error sending your filters");
  }
}

  

  if (!params || !document || !individuals) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
   <div className='p-[3rem]'>
    
    <div className='flex justify-between '>
    <h2 className='font-bold text-lg'>SILX-4</h2>
    <Button
   
          className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
         Get Started
          </span>
        </Button>
   </div>
   <div className='h-full mt-[5rem]'> 

    <h2 className='text-5xl font-bold'>
      Hello Eyad<br />Let's find you a job!
    </h2>
 
 <div className='flex items-center gap-3'>
 <div className='max-w-lg w-full flex items-center space-x-4 border border-gray-200 rounded-full px-4 py-2 mt-4 '>
 
 <Input
    type="text"
    required
    name="name"
    onChange={(e) => setYourFilter(e.target.value)}
    value={yourFilter}
    placeholder="Enter your needs to silx ai"
    id="name"
    className="block w-full  border-none rounded-full focus:outline-none"
  />
    <Button
      onClick={() => handleInert()} 
    className="text-white px-4 py-2 rounded-full ">
       <SendIcon className='w-6 h-5'/>
    </Button>


</div>
   <div className='flex bg-black text-white justify-center items-center rounded-full px-5 py-3 mt-4 gap-2'> 
   <FaGithubAlt className='w-6 h-5' />

     <h3>Copilot</h3>
    </div>
 </div>

   <div className='flex gap-3 mt-[3rem] items-center'>
    <div className='py-3  rounded-lg border p-3 border-[#F2F2F2] '>
    <FaGithubAlt className='w-7 h-7' />
      
    </div>
    <h2 className='font-bold text-xl'>You Match by 94.8% with these <br /> companies:</h2>
   </div>

 <div className='grid grid-cols-3  w-[100%] p-5'>
 <div className='border-2 border-[#F2F2F2] rounded-lg w-[420px] h-[300px]  mt-5'>
    <div className='p-5 '>
      <div>
         <div className='flex justify-between '>
            <div className='flex gap-3'>
            <Image src={"https://applicantai.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBdk5MIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--6f38e8d7589ae39dbd001f0d17ba6ba9c82588bb/massa-twitter-logo.jpg"}   height="50" width="50" className='rounded-lg object-contain' alt='' />
              <div>
                <div className='flex gap-2'>
                <h2 className='font-bold'>Massa</h2>
                <Image src={Icon} height="20" width="20" className='rounded-lg object-contain' alt='' />

                </div>
                <p>$12M , USA CA</p>
              </div>
            </div>
            <div className='py-3  rounded-lg border-2 p-3  border-[#F2F2F2] '>
          <MdOutlineCollectionsBookmark className='w-7 h-7' />
          </div>
         </div>
         <div className='mt-3'>
          <h2 className='font-bold text-lg'>Crypto-Native Content Creator (Remote)</h2>
          <p className='text-md'>
          Massa is a Layer 1 blockchain platform offering Autonomous Smart Contracts and on-chain web capabilities.We are seeking a Crypto-Native Content Creator to be the voice of our brand
          </p>
          <div className='flex mt-2'>
         <p className='text-sm text-[#3D4144]'> Full-time | Remote | Developer</p>
          </div>
        <div className='flex justify-between '>
        <div className='flex items-center gap-2'>
            <div className='mt-2'>
            <Button
            onClick={() => handleClick('button1')}
             className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] ">
             <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
             {buttonTexts.button1}
             </span>
            </Button>
            </div>
            <h3 className='font-bold text-sm' >With 12 Applications</h3>
            
          </div>
          <div>
        
          </div>
        </div>
          
         
         </div>
      </div>
    </div>
   </div> 
   <div className='border-2 border-[#F2F2F2] rounded-lg w-[420px] h-[300px]  mt-5'>
    <div className='p-5 '>
      <div>
         <div className='flex justify-between '>
            <div className='flex gap-3'>
            <Image src={"https://applicantai.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBaVlHIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--5a52b9322afd8b05691ad14d7d12b2d0c6e75774/Frame%20200.png"}   height="50" width="50" className='rounded-lg object-contain' alt='' />
              <div>
                <div className='flex gap-2'>
                <h2 className='font-bold'>Zircuit</h2>
                <Image src={Icon} height="20" width="20" className='rounded-lg object-contain' alt='' />

                </div>
                <p>$2.5M, USA CA</p>
              </div>
            </div>
            <div className='py-3  rounded-lg border-2 p-3  border-[#F2F2F2] '>
          <MdOutlineCollectionsBookmark className='w-7 h-7' />
          </div>
         </div>
         <div className='mt-3'>
          <h2 className='font-bold text-lg'>Full-stack Developer (Remote)</h2>
          <p className='text-md'>
          At Zircuit, we're building a new kind of operating system and device for running a personal home server. We believe that everyone should be able to enjoy.
          </p>
          <div className='flex mt-2'>
         <p className='text-sm text-[#3D4144]'> Full-time | Remote | Developer</p>
          </div>
        <div className='flex justify-between '>
        <div className='flex items-center gap-2'>
            <div className='mt-2'>
            <Button
            onClick={() => handleClick('button2')}
             className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] ">
             <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
             {buttonTexts.button2}
             </span>
            </Button>
            </div>
            <h3 className='font-bold text-sm' >With 10 Applications</h3>
            
          </div>
          <div>
        
          </div>
        </div>
          
         
         </div>
      </div>
    </div>
   </div> 
   <div className='border-2 border-[#F2F2F2] rounded-lg w-[420px] h-[300px]  mt-5'>
    <div className='p-5 '>
      <div>
         <div className='flex justify-between '>
            <div className='flex gap-3'>
            <Image src={Eyad}   height="50" width="50" className='rounded-lg object-contain' alt='' />
              <div>
                <div className='flex gap-2'>
                <h2 className='font-bold'>Vali Ventures</h2>
                <Image src={Icon} height="20" width="20" className='rounded-lg object-contain' alt='' />

                </div>
                <p>$120M Company</p>
              </div>
            </div>
            <div className='py-3  rounded-lg border-2 p-3  border-[#F2F2F2] '>
          <MdOutlineCollectionsBookmark className='w-7 h-7' />
          </div>
         </div>
         <div className='mt-3'>
          <h2 className='font-bold text-lg'>Software Engineer Front end (Remote)</h2>
          <p className='text-md'>
          Vali Ventures is a tight-knit, ambitious software development firm based in the US. As a bootstrapped company, we pride ourselves on being nimble, innovative
          </p>
          <div className='flex mt-2'>
         <p className='text-sm text-[#3D4144]'> Full-time | Remote | Developer</p>
          </div>
        <div className='flex justify-between '>
        <div className='flex items-center gap-2'>
            <div className='mt-2'>
            <Button
            onClick={() => handleClick('button3')}
             className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] ">
             <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
             {buttonTexts.button3}
             </span>
            </Button>
            </div>
            <h3 className='font-bold text-sm' >With 6 Applications</h3>
            
          </div>
          <div>
        
          </div>
        </div>
          
         
         </div>
      </div>
    </div>
   </div> 
   <div className='border-2 border-[#F2F2F2] rounded-lg w-[420px] h-[300px]  mt-5'>
    <div className='p-5 '>
      <div>
         <div className='flex justify-between '>
            <div className='flex gap-3'>
            <Image src={"https://applicantai.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBZ2tPIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7376c6717df22cce54368a7066fd53d74aff1e5b/GUHplIr7_400x400.jpg"}   height="50" width="50" className='rounded-lg object-contain' alt='' />
              <div>
                <div className='flex gap-2'>
                <h2 className='font-bold'>Recruit</h2>
                <Image src={Icon} height="20" width="20" className='rounded-lg object-contain' alt='' />

                </div>
                <p>$1M Company</p>
              </div>
            </div>
            <div className='py-3  rounded-lg border-2 p-3  border-[#F2F2F2] '>
          <MdOutlineCollectionsBookmark className='w-7 h-7' />
          </div>
         </div>
         <div className='mt-3'>
          <h2 className='font-bold text-lg'>Intern Swift Developer (Remote)</h2>
          <p className='text-md'>
          Join us as our Engineering Lead, where you will embark on a journey from a proactive coder to a strategic leader. Your mission begins with spearheading our product's technical execution
          </p>
          <div className='flex mt-2'>
         <p className='text-sm text-[#3D4144]'> Full-time | Remote | Developer</p>
          </div>
        <div className='flex justify-between '>
        <div className='flex items-center gap-2'>
            <div className='mt-2'>
            <Button
            onClick={() => handleClick('button4')}
             className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] ">
             <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
             {buttonTexts.button4}
             </span>
            </Button>
            </div>
            <h3 className='font-bold text-sm' >With 22 Applications</h3>
            
          </div>
          <div>
        
          </div>
        </div>
          
         
         </div>
      </div>
    </div>
   </div> 
   <div className='border-2 border-[#F2F2F2] rounded-lg w-[420px] h-[300px]  mt-5'>
    <div className='p-5 '>
      <div>
         <div className='flex justify-between '>
            <div className='flex gap-3'>
            <Image src={"https://applicantai.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBcUZLIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--d21d5576fb85f5e144f55e5111a975b0f27041dc/lastic-twitter-logo.jpg"}   height="50" width="50" className='rounded-lg object-contain' alt='' />
              <div>
                <div className='flex gap-2'>
                <h2 className='font-bold'>Lastic</h2>
                <Image src={Icon} height="20" width="20" className='rounded-lg object-contain' alt='' />

                </div>
                <p>$3M Company</p>
              </div>
            </div>
            <div className='py-3  rounded-lg border-2 p-3  border-[#F2F2F2] '>
          <MdOutlineCollectionsBookmark className='w-7 h-7' />
          </div>
         </div>
         <div className='mt-3'>
          <h2 className='font-bold text-lg'>Full-stack Developer</h2>
          <p className='text-md'>
          we're seeking innovative and skilled individuals to join our team. Whether you're located on Earth or hail from the distant ZetaXm002 galaxy as long as you demonstrate exceptional coding abilities          </p>
          <div className='flex mt-2'>
         <p className='text-sm text-[#3D4144]'> Full-time | Remote | Developer</p>
          </div>
        <div className='flex justify-between '>
        <div className='flex items-center gap-2'>
            <div className='mt-2'>
            <Button
             className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] ">
             <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
               Compete
             </span>
            </Button>
            </div>
            <h3 className='font-bold text-sm' >With 40 Application</h3>
            
          </div>
          <div>
        
          </div>
        </div>
          
         
         </div>
      </div>
    </div>
   </div> 
      <div className='border-2 border-[#F2F2F2] rounded-lg w-[420px] h-[300px]  mt-5'>
    <div className='p-5 '>
      <div>
         <div className='flex justify-between '>
            <div className='flex gap-3'>
            <Image src={"https://applicantai.com/rails/active_storage/blobs/proxy/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBa0VjIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--fbf96d6e165c5410e58b4dcca59a66e7e3530600/number-group-1-twitter-logo.jpg"}   height="50" width="50" className='rounded-lg object-contain' alt='' />
              <div>
                <div className='flex gap-2'>
                <h2 className='font-bold'>Number Group</h2>
                <Image src={Icon} height="20" width="20" className='rounded-lg object-contain' alt='' />

                </div>
                <p>$31M Company</p>
              </div>
            </div>
            <div className='py-3  rounded-lg border-2 p-3  border-[#F2F2F2] '>
          <MdOutlineCollectionsBookmark className='w-7 h-7' />
          </div>
         </div>
         <div className='mt-3'>
          <h2 className='font-bold text-lg'>Junior Front-End Developer (Remote)</h2>
          <p className='text-md'>
          Company: At Number Group, we're at the forefront of the crypto and decentralized finance. Our mission is to develop cutting-edge platforms nd applications that empower our partners 
          </p>
          <div className='flex mt-2'>
         <p className='text-sm text-[#3D4144]'> Full-time | Remote | Developer</p>
          </div>
        <div className='flex justify-between '>
        <div className='flex items-center gap-2'>
            <div className='mt-2'>
            <Button
             className="relative inline-flex h-10 overflow-hidden rounded-full p-[2px] ">
             <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
               Compete
             </span>
            </Button>
            </div>
            <h3 className='font-bold text-sm' >With 54 Application</h3>
            
          </div>
          <div>
        
          </div>
        </div>
          
         
         </div>
      </div>
    </div>
   </div> 
 </div>
   </div>

   </div>
    
  );
};

export default Match;
