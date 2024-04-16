"use client";

import { ElementRef, useRef, useState ,useEffect} from "react";
import { BadgeCheck, ImageIcon, Smile, TvIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { Document, Page, pdfjs } from 'react-pdf';
import axios from 'axios';



import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface ToolbarProps {
  initialData: Doc<"individual">;
  preview?: boolean;
};

export const EditProfile = ({
  initialData,
  preview
}: ToolbarProps) => {
  const inputRef = useRef<ElementRef<"textarea">>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialData.githubToken);
  const [score, setScore] = useState(0);
  const [aiResponse, setAiResponse] = useState("");
  const [pdfText, setPdfText] = useState<string>("");
  const [level, setLevel] = useState("");

  const initialPdfUrl = initialData.cv;
  const [pdfUrl, setPdfUrl] = useState(initialPdfUrl);
  const [text, setText] = useState<string>('');
  const handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPdfUrl(event.target.value);
  };





  

  const [userRepositories, setUserRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const coverImage = useCoverImage();

  const enableInput = () => {
    if (preview) return;

    setIsEditing(true);
    setTimeout(() => {
      setValue(initialData.githubToken);
      inputRef.current?.focus();
    }, 0);
  };


  const disableInput = () => setIsEditing(false);
  useEffect(() => {
    
    const fetchRepositories = async () => {
      try {
        const githubToken = initialData?.githubToken; // Access githubToken from initialData
  
        if (!githubToken) {
          // Handle the case where githubToken is not available
          console.error('GitHub token is not available');
          toast.error('Failed to fetch repositories: GitHub token is not available');
          return;
        }
  
        const response = await fetch('https://api.github.com/user/repos', {
          headers: {
            'Authorization': `Bearer ${githubToken}`
          }
        });
  
        if (response.ok) {
          const repositories = await response.json();
          setUserRepositories(repositories);
        } else {
          throw new Error('Failed to fetch repositories');
        }
      } catch (error) {
        console.error('Error fetching repositories:', error);
        toast.error('Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    };
    fetchRepositories();
  }, []); // Fetch repositories only once when component mounts
  
  useEffect(() => {
    const fetchPdfText = async () => {
      try {
        const response = await axios.post('http://localhost:3001/api/text/extract', { pdfUrl });
        setPdfText(response.data.text); // Update pdfText state with the fetched text
      } catch (error) {
        console.error(error);
      }
    };
    const level = async () => {
      try {

        if (!initialData.cv) {
          // Handle case where CV URL is not available
          console.error('CV URL is not available');
          toast.error('Failed to fetch CV: CV URL is not available');
          return;
        }

        if (!pdfText) {
          // Wait for the PDF text to be fetched
          return;
        }

        const text = `
        Using 
        User Information:
        Name: ${initialData.name}
        Description: ${initialData.description}
        Programming Languages: ${initialData.programmingLanguages.join(", ")}
        Main Skill: ${initialData.skill}
        
       Aand read CV Text:
        ${pdfText}
        
        give the user a level based on his information and and his cv if he is a Intern-level ${initialData.skill} or Junior-level ${initialData.skill} or Mid-level ${initialData.skill} Senior-level ${initialData.skill} in the answer only give the level title in the answer dont say Based on the information provided, the user appears to be a
       `;
        // API request to OpenAI for analysis
        const OPENAI_API_KEY = "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";
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: text,
            max_tokens: 300, // Adjust as needed
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const aiResponseText = data.choices[0].text.trim();
          setAiResponse(aiResponseText);
        } else {
          throw new Error("Failed to analyze text");
        }
      } catch (error) {
        console.error("Error analyzing text:", error);
        toast.error("Failed to analyze text");
      }
    }
    const calculateScore = async () => {
      try {

        if (!initialData.cv) {
          // Handle case where CV URL is not available
          console.error('CV URL is not available');
          toast.error('Failed to fetch CV: CV URL is not available');
          return;
        }

        if (!pdfText) {
          // Wait for the PDF text to be fetched
          return;
        }
        
        const text = `
        You are an AI recruiter. Your task is to analyze and provide a valid assessment for users who will provide you with their information.

        User Information:
        Name: ${initialData.name}
        Description: ${initialData.description}
        Programming Languages: ${initialData.programmingLanguages.join(", ")}
        Main Skill: ${initialData.skill}
        
        CV Text:
        ${pdfText}
        
        Your task is to use this information to understand the user's profile comprehensively. Analyze the CV text to identify the user's title, work experience, projects they have worked on, and any education mentioned. Consider how the CV text aligns with the user's provided information and provide an assessment based on this analysis. If there are discrepancies between the provided information and the CV text, address them in your assessment.
        
      `;
        // Constructing the text prompt
  
  
        // API request to OpenAI for analysis
        const OPENAI_API_KEY = "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";
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: text,
            max_tokens: 300, // Adjust as needed
          }),
        });
  
        if (response.ok) {
          const data = await response.json();
          const level = data.choices[0].text.trim();
          setLevel(level);
        } else {
          throw new Error("Failed to analyze text");
        }
      } catch (error) {
        console.error("Error analyzing text:", error);
        toast.error("Failed to analyze text");
      }
    };
  


    if (pdfUrl) {
      fetchPdfText();
    }

    if(pdfUrl) {
      level();
    }
  
    if (!preview) {
      calculateScore();
    }
  }, [initialData, pdfUrl, pdfText, preview]);




   
    
  return (
    <div className="pl-[54px] group relative">
     
     {!!initialData.name &&  (
        <p className="text-3xl pt-6">
          {initialData.name}
       
        </p>
        
      )}

      <div className="text-container">{text}</div>

  <div className="flex items-center justify-center">
  <div className="grid grid-cols-4 gap-4 w-[100%] p-5">
  {userRepositories.map((repository, index) => (
    <div key={index} className="border border-gray-200 p-4 rounded-md">
      <h3 className="font-semibold">{repository.name}</h3>
      <p>{repository.homepage}</p>
      {/* Additional content here if needed */}
    </div>
  ))}
</div>
  </div>


        <div>
        <h2>AI Response:</h2>
        <p>{aiResponse}</p>
        <p>{level}</p>
        
      </div>
    </div>
  )
}