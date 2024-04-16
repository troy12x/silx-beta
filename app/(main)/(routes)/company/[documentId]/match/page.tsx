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
import { SendIcon } from 'lucide-react';
import { toast } from 'sonner';

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
    documentId: Id<"company">;
  };
}

const Match = ({ params }: MatchPageProps) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const [yourFilter, setYourFilter] = useState("");
  
  const individuals = useQuery(api.individuals.getAll);
  const document = useQuery(api.company.getById, {
    id: params?.documentId // use optional chaining to safely access properties
  });


//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
const OPENAI_API_KEY = "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"

const insert = useMutation(api.company.insert);
 
const handleInert = () => {
  try {
    const promise = insert({
      id: params.documentId,
      filters: yourFilter
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
   <div>
        <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="flex items-center space-x-4 bg-black p-4 rounded-3xl">
        <span className='text-white'>
          Hello <span >{document.companyName}</span>
        </span>
      </h2>
 
    </div>
   <div className='h-full flex items-center justify-center mt-3'> 
   <div className='max-w-lg w-full flex items-center space-x-4 border border-gray-200 rounded-full px-4 py-2 '>
 
     <Input
        type="text"
        required
        name="name"
        onChange={(e) => setYourFilter(e.target.value)}
        value={yourFilter}
        placeholder="Enter your needs to silx ai"
        id="name"
        className="mt-1 block w-full  border-none rounded-full focus:outline-none"
      />
        <Button
          onClick={() => handleInert()} 
        className="text-white px-4 py-2 rounded-full ">
           <SendIcon className='w-6 h-5'/>
        </Button>

    </div>
   </div>
   <div className='flex items-center justify-center'>
   <p className="mt-4 text-gray-600">This is what we matched you with</p>
      {aiResponse && <div className="mt-4">{aiResponse}</div>}
    
    
   </div>
   </div>
    
  );
};

export default Match;
