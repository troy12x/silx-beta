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
} from "@/components/ui/card"
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
        s
        give the user a level based on his information and and his cv if he is a Intern-level ${initialData.skill} or Junior-level ${initialData.skill} or Mid-level ${initialData.skill} Senior-level ${initialData.skill} in the answer only give the level title in the answer dont say Based on the information provided, the user appears to be a
       `;

      
     
    
        // API request to OpenAI for analysis
        const response = await fetch("https://api.openai.com/v1/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo-instruct",
            prompt: text,
            max_tokens: 100, // Adjust as needed
          }),
        });
  
        if (response.ok) {
      
          const data = await response.json();
          const level = data.choices[0].text.trim();
          setLevel(level);
          title({
            id: params.documentId as Id<"individual">,
            level:level
           });
        } else {
          throw new Error("Failed to analyze text");
        }
      } catch (error) {
        console.error("Error analyzing text:", error);
        toast.error("Failed to analyze text");
      }
    }

    const fetchGitHubUserInfo = async () => {
      const url = "https://api.github.com/user";
      
     const github = "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";

      const response = await fetch(url, {
        headers: {
          "Authorization": `token  ${github}`
        }
      });
    
      if (!response.ok) {
        throw new Error("Failed to fetch GitHub user info");
      }
    
      const data = await response.json();
      return {
        username: data.login,
        profileImage: data.avatar_url
      };
    };
   

    const calculateScore = async () => {
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
          User Profile Assessment:
          Name: ${initialData.name}
          Description: ${initialData.description}
          Programming Languages: ${initialData.programmingLanguages.join(", ")}
          Main Skill: ${initialData.skill}
          
          CV Summary (300 characters):
          ${pdfText}
          
          Please analyze the provided CV summary and assess the user's profile comprehensively. Identify their title, work experience, projects, and education. Align the CV text with the user's provided information and address any discrepancies. Provide a concise assessment focusing on the user's skills, experience, and suitability for the role. Ensure the assessment is clear, concise, and professional.
        `;
    
        const fetchScore = async () => {
          try {
            const response = await fetch("https://api.openai.com/v1/completions", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
              },
              body: JSON.stringify({
                model: "gpt-3.5-turbo-instruct",
                prompt: text,
                max_tokens: 150, // Adjust as needed
              }),
            });
    
            if (response.ok) {
              const data = await response.json();
              const aiResponseText = data.choices[0].text.trim();
              setAiResponse(aiResponseText);
            } else if (response.status === 429) {
              console.log('Rate limited, retrying after some time...');
              setTimeout(fetchScore, 2000); // Retry after 2 seconds
            } else {
              throw new Error("Failed to analyze text");
            }
          } catch (error) {
            console.error("Error analyzing text:", error);
            toast.error("Failed to analyze text");
          }
        };
    
        await fetchScore();
      } catch (error) {
        console.error("Error in calculateScore:", error);
        toast.error("Failed to calculate score");
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

    fetchGitHubUserInfo();
  
  }, [initialData, pdfUrl, pdfText, preview]);




   
    
  return (
    <>
          <div className="p-20 group relative h-[100vh] ">
     
     <div>
      
     </div>

     <div className="flex justify-between ">
   
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
          <div className="h-[50px] w-[50px] bg-green-300 rounded-full flex items-center justify-center ">
              A-
          </div>
          <div className="font-bold text-lg">
           75/100
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
       Additional content here if needed 
      </div> 
      ))}
    </div>   
     </div> 
   
   
           <div className="">
     
          <h2 className="font-bold">Overview</h2>
           <p className="mt-3" >{aiResponse}</p>
     
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
          <h2 className="font-bold text-lg">{initialData.name} Week points</h2>
          <ul className="list-disc m-2">
            <li>Eyad lacks experience working with the open-source community, limiting his exposure to collaborative development practices and contributions to shared projects.</li>
            <li>Eyad demonstrates a stronger focus on front-end development compared to back-end, potentially hindering his ability to fulfill the responsibilities of a full-stack developer effectively.</li>
            <li>Eyad's portfolio on GitHub is relatively small, with a limited number of projects and collaborations showcased, suggesting a need for broader and more diverse experiences in software development.</li>
            <li>Eyad's online presence, particularly on platforms like LinkedIn, is minimal, as he rarely posts or engages with content shared by colleagues or peers. This reluctance to actively participate in professional networking and communication may stem from a fear of judgment or self-consciousness about his social skills.</li>
          </ul>
         </div>

     
     
        <div className="mt-[5rem]">
        <Component/>
        </div>
        <div className="mt-[1rem]">
        <Leaderx />
        </div>

        {/** <div className='mt-4 flex items-center justify-center '> 
      <div className='max-w-lg w-full flex items-center space-x-4 border border-gray-200 rounded-full px-4 py-2 '>
    
        <Input
           type="text"
           required
           name="name"
         
           placeholder="Enter your needs to silx ai"
           id="name"
           className=" block w-full  border-none rounded-full focus:outline-none"
         />
           <Button
        
           className="text-white px-4 py-2 rounded-full ">
              <SendIcon className='w-6 h-5'/>
           </Button>
   
       </div>
      </div> */}
   
   
       </div>
    </>
  
  )
}