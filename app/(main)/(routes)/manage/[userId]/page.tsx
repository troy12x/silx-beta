"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "convex/react";
import { Id } from "@/convex/_generated/dataModel";
import { Doc } from "@/convex/_generated/dataModel";
import { api } from "@/convex/_generated/api";
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, documentId } from 'firebase/firestore';
import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui/dialog';

import axios from 'axios';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button";
import { db } from '../../../../../components/firebase-config';
import { Input } from "@/components/ui/input";
interface ManageAppProps {
  initialData: Doc<"documents">;
  parentDocumentId?: Id<"documents">;
}

interface User {
  name: string;
  email: string;
  summary: string;
  age: number;
  university: string;
  documentsId: string; // Added documentId field
  
}

const ManageApp = ({
  initialData,
  parentDocumentId,
}: ManageAppProps) => {
  const params = useParams();
  const router = useRouter();

  const documents = useQuery(api.documents.getSidebar, {
    parentDocument: parentDocumentId
  });
  const [chatInput, setChatInput] = useState('');
  const [aiResponse, setAiResponse] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [editInput, setEditInput] = useState('');
  

  const [matches, setMatches] = useState<User[]>([]);



  // Function to format timestamp to YY/MM/DD HH:MM:SS
  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp);
    const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;
    const formattedTime = date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit',  });
    return `${formattedDate} ${formattedTime}`;
  };
  
  const onClose = () => {
    setShowDialog(false);
    setAiResponse('');
    setError('');
  };

  const handleRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };
  

  const onRedirect = (documentId: string) => {
    router.push(`/documents/${documentId}`);
  };

  if (documents === undefined) {
    return (
      <div>Loading...</div>
    );
  }
  const fetchDataFromFirestore = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = usersSnapshot.docs.map((doc) => doc.data() as User);
    return usersData;
  };

  const OPENAI_API_KEY = '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';
  const handleChatInput = async () => {
    setLoading(true);
    try {
      const usersData = await fetchDataFromFirestore();
      const userDataText = usersData.map(user => `${user.name} ${user.age} ${user.email} ${user.summary} ${user.university}`).join(' ');
      const prompt = `${chatInput} ${userDataText}`;
    
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
  
      if (answer) {
        setAiResponse(answer);
        setShowDialog(true);
      } else {
        setAiResponse("We were unable to find a suitable answer. Please try again later.");
      }
    } catch (error) {
      console.error('Error querying OpenAI:', error);
      setError('Failed to fetch AI response. Please try again.');
    } finally {
      setLoading(false);
    }

  };

  
  const handleEditInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditInput(e.target.value);
  };

  const handleEditSubmission = async (documentId: string) => {
    try {
      setLoading(true);
  
      const editData = {
        documentId: documentId,
        editText: editInput,
        timestamp: new Date().toISOString(),
      };
  
      const docRef = await addDoc(collection(db, 'edits'), editData);
      console.log('Edit submitted successfully:', docRef.id);
  
      // Toggle the showDialog state to true
      setShowDialog(true);
  
      // Clear the edit input field
      setEditInput('');
      setError(''); // Clear any previous errors
  
    } catch (error) {
      console.error('Error submitting edit:', error);
      setError('Failed to submit edit. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  
  
   

  return (
    <div className="pb-40">
   
    </div>
  );
}


export default ManageApp;
