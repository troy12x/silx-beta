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
import { collection, addDoc, getDocs, query, where, doc, updateDoc ,getDoc} from 'firebase/firestore';
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
  userId: string;
  documentId: string; // Added documentId field
  experience: number;
  skills: string[];
  companyRankOrg: number;
  aiResponse?: string; // Optional property for aiResponse

}

const calculateExperiencePoints = (experience: number): number => {
  // Assuming every 5 years of experience gives one point
  return Math.floor(experience / 5);
};

const calculateSkillsPoints = (skills: string[]): number => {
  // Assuming each programming language or additional skill gives one point
  return skills.length;
};

const calculateCompanyRankPoints = (companyRankOrg: number): number => {
  // Assuming the rank is normalized between 0 and 1
  return 1 - companyRankOrg;
};

const calculateUniversityRankPoints = (university: string): number => {
  const top100Universities = ['Harvard', 'MIT', 'Stanford']; // Example list
  return top100Universities.includes(university) ? 1 : 0;
};

const calculateAgePoints = (age: number): number => {
  return (age >= 22 && age <= 40) ? 1 : 0;
};

const calculateSummaryPoints = (summary: string): number => {
  // Assuming summaries with more than 500 characters are less professional
  return summary.length > 500 ? 0 : 1;
};

const calculateTotalPoints = (applicant: User): number => {
  const experiencePoints = calculateExperiencePoints(applicant.experience);
  const skillsPoints = calculateSkillsPoints(applicant.skills);
  const companyRankPoints = calculateCompanyRankPoints(applicant.companyRankOrg);
  const universityRankPoints = calculateUniversityRankPoints(applicant.university);
  const agePoints = calculateAgePoints(applicant.age);
  const summaryPoints = calculateSummaryPoints(applicant.summary);

  // Sum up all the points
  return (
    experiencePoints +
    skillsPoints +
    companyRankPoints +
    universityRankPoints +
    agePoints +
    summaryPoints
  );
};

const findBestApplication = (applicants: User[]): User | null => {
  if (applicants.length === 0) return null;

  const applicantsWithPoints: { applicant: User, points: number }[] = applicants.map(applicant => ({
    applicant,
    points: calculateTotalPoints(applicant)
  }));

  // Find the best application based on total points
  const bestApplication = applicantsWithPoints.reduce((prev, current) => prev.points > current.points ? prev : current);

  return bestApplication.applicant;
};

interface ManageProps {
  parentDocumentId?: Id<"documents">;
  level?: number;
  data?: Doc<"documents">[];
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

  const documents = useQuery(api.documents.getSidebar, {});
  
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
      const usersData = usersSnapshot.docs.map((doc) => {
        const userData = doc.data() as Partial<User>;
        return {
          ...userData,
          id: doc.id,
        } as User;
      });
  
      if (usersData.length === 0) {
        setError("There are no applications for the provided documentId.");
        setShowDialog(true);
        setLoading(false);
        return;
      }
  
      const allUsers = [...usersData]; // Store all users data
  
      const bestApplication = findBestApplication(usersData);
  
      if (bestApplication === null) {
        setError("Failed to find the best application.");
        setShowDialog(true);
        setLoading(false);
        return;
      }
  
      const response = await generateResponse(bestApplication, allUsers); // Generate response for the best application
  
      // Set AI response in Firestore for the best application
      const userRef = doc(db, 'users', bestApplication.userId);
      const userDoc = await getDoc(userRef);
      if (userDoc.exists()) {
        const userData = userDoc.data() as Partial<User>; // Type assertion to Partial<User>
        if (userData && userData.name !== undefined && userData.email !== undefined && userData.summary !== undefined && userData.age !== undefined && userData.university !== undefined && userData.userId !== undefined && userData.documentId !== undefined && userData.experience !== undefined && userData.skills !== undefined && userData.companyRankOrg !== undefined) {
          const currentAiResponse = userData.aiResponse || '';
          if (!currentAiResponse || calculateTotalPoints(userData as User) > calculateTotalPoints(bestApplication)) {
            await updateDoc(userRef, {
              aiResponse: response
            });
          }
        }
      }
      
  
      setAiResponse(response);
      setShowDialog(true);
    } catch (error) {
      console.error('Error querying Firestore or OpenAI:', error);
      setError('Failed to fetch AI response. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  

  const generateResponse = async (user: User, allUsers: User[]): Promise<string> => {
    // Calculate total points for the user
    const totalPoints = calculateTotalPoints(user);
  
    // Generate reasons for acceptance and rejection
    const selectedReason = `The candidate ${user.name} has been selected for the Saher application due to their strong academic background, significant experience in software engineering, and a good mix of technical skills and experience. They have earned a total of ${totalPoints} points, showcasing their suitability for the role.`;
    const rejectionReasons = allUsers
      .filter(applicant => applicant !== user) // Exclude the selected application
      .map(applicant => {
        const points = calculateTotalPoints(applicant);
        return `${applicant.name} was rejected with ${points} points\n`;
      })
      .join("");
  
    // Generate a prompt for the AI based on user information, total points, and reasons
    const prompt = `
      Application for ${user.name}:
      Summary: ${user.summary}
      Age: ${user.age}
      University: ${user.university}
      Skills: ${user.skills}
      Experience: ${user.experience} years
      Total Points: ${totalPoints}
      
      Reason for selection:
      ${selectedReason}
      
      Reasons for rejection:
      ${rejectionReasons}
      
      Please provide feedback on this application.
    `;
  
    // Send prompt to the OpenAI GPT API
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
  

  
    // Return the generated response from the AI
    return response.data.choices[0].text.trim();
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
          <DialogContent className="border-2 border-black">
            <DialogHeader className=" pb-3 font-bold">Applications Reviewed by AI</DialogHeader>
            {isLoading && (
              <div className="w-full flex items-center justify-center">
                <Spinner size="lg" />
              </div>
            )}
            <div>
            <p>{aiResponse}</p>

            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};
