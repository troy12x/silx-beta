"use client";

import { ElementRef, useRef, useState ,useEffect} from "react";
import { BadgeCheck, ImageIcon, SendIcon, Smile, TvIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";
import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc, Id } from "@/convex/_generated/dataModel";
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
} from "@/components/ui/card";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import Component from "@/components/component/component";
import Leaderx from "@/components/component/leader";

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
  const params = useParams();
  const title = useMutation(api.individuals.title);
  const [gitHubProfileImage, setGitHubProfileImage] = useState<string>("");
  const [showContent, setShowContent] = useState(false);

  const [gitHubUsername, setGitHubUsername] = useState<string>("");

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

  useEffect(() => {
    const fetchRepositories = async () => {
      try {
        const githubToken = initialData?.githubToken; // Access githubToken from initialData
  
        if (!githubToken) {
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

    const analyzeProfile = async () => {
      try {
        if (!initialData.cv) {
          console.error('CV URL is not available');
          toast.error('Failed to fetch CV: CV URL is not available');
          return;
        }

        if (!pdfText) {
          return; // Wait for the PDF text to be fetched
        }

        const text = `
        User Information:
        Name: ${initialData.name}
        Description: ${initialData.description}
        Programming Languages: ${initialData.programmingLanguages.join(", ")}
        Main Skill: ${initialData.skill}
        
        CV Text:
        ${pdfText}

        Analyze the user's information and CV text to provide an overview, determine the user's level (Intern, Junior, Mid, Senior), and assign a score out of 100. Provide a level (A, B, C, F) based on the analysis.
        `;

        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: text,
            max_tokens: 150,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const aiResponseText = data.choices[0].text.trim();
          setAiResponse(aiResponseText);

          // Extract the score and level from AI response
          const scoreMatch = aiResponseText.match(/(\d+)\/100/);
          const levelMatch = aiResponseText.match(/[A-F]/);

          if (scoreMatch && levelMatch) {
            setScore(parseInt(scoreMatch[1]));
            setLevel(levelMatch[0]);

            // Update the user's level in the database
            title({
              id: params.documentId as Id<"individual">,
              level: levelMatch[0]
            });
          } else {
            console.error('Failed to parse AI response');
          }
        } else {
          throw new Error("Failed to analyze text");
        }
      } catch (error) {
        console.error("Error analyzing text:", error);
      }
    };

    if (pdfUrl) {
      fetchPdfText();
    }

    if (pdfText) {
      analyzeProfile();
    }
  }, [initialData, pdfUrl, pdfText, preview]);

  return (
    <>
      <div className="p-20 group relative h-[100vh]">
        <div className="flex justify-between">
          <div className='flex items-center justify-start gap-4 mt-4'>
            <img src="https://github.com/troy12x.png" alt="GitHub Profile" className='rounded-full' width="80" />
            <div>
              <h2 className="font-bold text-2xl">  {initialData.name}</h2>
              <p className="text-[#919090] text-1xl">{initialData.level}</p>
            </div>
          </div>
          <div> 
            <h2>Overall Rank</h2>
            <div className="flex items-center justify-center gap-3">
              <div className="h-[50px] w-[50px] bg-green-300 rounded-full flex items-center justify-center">
                {level}
              </div>
              <div className="font-bold text-lg">
                {score}/100
              </div>
            </div>
          </div>
        </div>
        <div className="text-container">{text}</div>
        <div className="flex items-center justify-center">
          <div className="grid grid-cols-4 gap-4 w-[100%] p-5">
            {userRepositories.map((repository, index) => (
              <div key={index} className="border border-gray-200 p-4 rounded-md">
                <h3 className="font-semibold">{repository.name}</h3>
                <p>{repository.homepage}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="">
          <h2 className="font-bold">Overview</h2>
          <p className="mt-3">{aiResponse}</p>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-lg">{initialData.name} Strong points</h2>
          <ul className="list-disc m-2">
            <li>Eyad demonstrates exceptional proficiency in UI/UX design, ensuring visually appealing and user-friendly interfaces.</li>
            <li>Eyad possesses a solid foundation in programming languages such as JavaScript and Python, enabling him to develop clean, high-quality, and bug-free code.</li>
            <li>Eyad prioritizes safety in his coding practices, adhering to best practices and standards to ensure the security of the software he develops.</li>
            <li>Eyad's meticulous attention to detail results in the creation of robust and reliable software solutions, contributing to the success of projects he is involved in.</li>
          </ul>
        </div>
        <div className="mt-5">
          <h2 className="font-bold text-lg">{initialData.name} Weak points</h2>
          <ul className="list-disc m-2">
            <li>In some cases, Eyad's focus on UI/UX design may result in spending more time on visual aspects, potentially impacting development timelines.</li>
            <li>Eyad's commitment to adhering to best practices and standards might lead to slightly longer development times as he ensures thorough testing and debugging.</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default EditProfile;
