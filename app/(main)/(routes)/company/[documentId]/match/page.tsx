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
import Dashboard from '@/components/component/dash';

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
  const [showContent, setShowContent] = useState(false);

  const individuals = useQuery(api.individuals.getAll);
  const document = useQuery(api.company.getById, {
    id: params?.documentId // use optional chaining to safely access properties
  });

  
  const handleButtonClick = () => {
    
  };



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
     
  <Dashboard/>
  

   </div>
    
  );
};

export default Match;
