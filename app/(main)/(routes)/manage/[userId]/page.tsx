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




interface User {
  name: string;
  email: string;
  summary: string;
  age: number;
  university: string;
  documentsId: string; // Added documentId field
  
}


interface ManageAppProps {
  parentDocumentId?: Id<"documents">;
}

const ManageApp: React.FC<ManageAppProps> = ({ parentDocumentId }: ManageAppProps) => {
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
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <p className="text-4xl pt-6 mt-3 font-bold">Manage applications</p>

        {documents.map((document) => (
          <Card className="w-[350px] mt-5" key={document._id}  >
            <CardHeader>
              <CardTitle> {document.title}</CardTitle>
              {formatTimestamp(document._creationTime)}
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
              <Button onClick={handleChatInput}   key={document._id}>
                Show Data
              </Button>
              <Button onClick={() => setShowDialog(true)}  key={document._id}>
            Add Edits
           </Button>
            </CardFooter>
          </Card>
        ))}
       {documents.map((document) => (
     <Dialog open={showDialog} onOpenChange={onClose}  key={document._id}>
     <DialogContent>
      <DialogHeader className="border-b pb-3">
     <h2 className="text-lg font-medium">
        Add Edits
       </h2>
  </DialogHeader>
  <Input
  type="text"
  value={editInput}
  key={document._id}
  onChange={handleEditInput}
  placeholder="Enter edits..."
  className="border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:border-blue-500"
  />
  <Button
  onClick={() => handleEditSubmission(document._id)} 
  key={document._id}
  className="bg-blue-500 text-white px-4 py-2 rounded-md ml-2"
  disabled={loading}
  >
  {loading ? 'Loading...' : 'Submit'}
  </Button>
  {error && <p className="text-red-500">{error}</p>}
  {aiResponse && <p>{aiResponse}</p>}
  </DialogContent>
     </Dialog>
       ))}
     
      </div>
    </div>
  );
}


export default ManageApp;
