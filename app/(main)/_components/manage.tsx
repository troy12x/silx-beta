"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useConvexAuth } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { DragItem } from "@/components/drag";
import React, { useState } from "react";
import { toast } from "sonner";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui/dialog';

import axios from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from '../../../components/firebase-config';
import { Input } from "@/components/ui/input";
import { Doc } from "@/convex/_generated/dataModel";
import DocumentIdPage from "@/app/(public)/(routes)/preview/[documentId]/page";

interface User {
  name: string;
  email: string;
  summary: string;
  age: number;
  university: string;
  userId:string;
  documentId: string; // Added documentId field
}


interface ManageProps {

    parentDocumentId?: Id<"documents">;
    level?: number;
    data?: Doc<"documents">[];
  };


  interface Edit {
    documentId: string;
    editText: string;
    timestamp: string;
  }


export const Manage = ({

    parentDocumentId,
  level = 0
}: ManageProps) => {

  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [aiResponse, setAiResponse] = useState('');

  const { isAuthenticated, isLoading } = useConvexAuth();

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit',  });
    return `${formattedDate} ${formattedTime}`;
  };

    const documents = useQuery(api.documents.getSidebar, {
       
    });
  
    if (documents === undefined) {
      return (
        <div>Loading...</div>
      );
    }

    const OPENAI_API_KEY = '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';

    const openDialog = async (documentId: string) => {
      setLoading(true);
      try {
        const usersCollection = collection(db, 'users');
        const usersQuery = query(usersCollection, where('documentId', '==', documentId));
        const usersSnapshot = await getDocs(usersQuery);
        const usersData = usersSnapshot.docs.map((doc) => doc.data() as User);
    
        if (usersData.length === 0) {
          setError("There are no applications for the provided documentId.");
          setShowDialog(true);
          setLoading(false);
          return;
        }
    
        const prompts: string[] = usersData.map(user => generatePrompt(user)); // Collect prompts for all applications
        const scores = await generateScores(prompts); // Batch process prompts to get scores for all applications
    
        const bestApplicationIndex = scores.indexOf(Math.max(...scores)); // Find the index of the best application based on scores
        const bestApplication = usersData[bestApplicationIndex]; // Get the best application
    
        const response = await generateResponse(bestApplication); // Generate response for the best application
    
        setAiResponse(response);
        setShowDialog(true);
      } catch (error) {
        console.error('Error querying Firestore or OpenAI:', error);
        setError('Failed to fetch AI response. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    
    const generatePrompt = (user: User): string => {
      // Construct a prompt based on user's summary and additional information
      let prompt = `Here is the best application for ${user.name}:\n`;
      prompt += `${user.summary}\n`; // User's summary
      prompt += `Age: ${user.age}\n`; // Additional information from the user's summary
      prompt += `University: ${user.university}\n`; // Additional information from the user's summary
      // Add other relevant information as needed
      return prompt;
    };
    
    const generateScores = async (prompts: string[]): Promise<number[]> => {
      const scores: number[] = [];
      for (const prompt of prompts) {
        try {
          const response = await axios.post(
            'https://api.openai.com/v1/completions',
            {
              model: 'gpt-3.5-turbo-instruct',
              prompt,
              max_tokens: 150
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${OPENAI_API_KEY}`,
              }
            }
          );
          const answer = response.data.choices[0].text.trim();
          // Calculate score based on AI response (for demonstration, let's assume a random score between 0 and 100)
          const score = Math.floor(Math.random() * 101);
          console.log(score);
          scores.push(score);
          await delay(5000); // Add a delay of 1 second between each request to avoid hitting the rate limit
        } catch (error) {
          console.error('Error generating AI score:', error);
          throw error;
        }
      }
      return scores;
    };
    
    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
    
    const generateResponse = async (user: User): Promise<string> => {
      // Generate a response based on the best application and additional information
      const response = `Here is the best application for ${user.name}:\n${user.summary}\nAge: ${user.age}\nUniversity: ${user.university}\n`;
    
      return response;
    };

    const onClose = () => {
      setShowDialog(false);
      setAiResponse('');
      setError('');
  };

    return (
        <div className="pb-40">
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
  
          {documents.map((document,index) => (
          
            <Card className="w-[350px] mt-5" key={`${document._id}-${index}`}>
              <CardHeader className="w-full">
                <CardTitle>{document.title}</CardTitle>
                {document._id}
                <br />
                <div className="font-bold">
                {formatTimestamp(document._creationTime)}
                </div>
               
              </CardHeader>
  
              <CardContent>
                <form>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                      {/* Add any input fields or other elements as needed */}
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      {/* Add any input fields or other elements as needed */}
                    </div>
                  </div>
                </form>
              </CardContent>
  
              <CardFooter className="flex gap-5">
                <Button onClick={() => openDialog(document._id)}  key={`${document._id}-chat`}>
                  Show Data
                  
                </Button>
          
              </CardFooter>
            </Card>
          ))}
  
          {/* Dialog for adding edits */}
          <Dialog open={showDialog}  onOpenChange={onClose} >
        
          <DialogContent>
          <DialogHeader className="border-b pb-3 font-bold">Applications Reviewed by AI</DialogHeader>
          {isLoading && (
        <div className="w-full flex items-center justify-center">
          <Spinner size="lg" />
        </div>
          )}
      <div>{aiResponse}</div>

       
          </DialogContent>
        </Dialog>
  
        </div>
      </div>
  
    )
}

