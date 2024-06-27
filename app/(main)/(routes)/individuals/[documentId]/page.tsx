"use client";

import { useState, useEffect } from 'react';
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Textarea } from '@/components/ui/textarea';
import { auth, githubProvider } from '../../../../../firebase'; // Adjust the path to your firebase.js file
import { signInWithPopup, getAuth, GithubAuthProvider, signOut } from "firebase/auth";
import { EdgeStoreProvider } from '@/lib/edgestore';
import { FaGithub ,  } from "react-icons/fa6";
import { useCoverCV } from '@/hooks/user-cv';
import { CgFileDocument } from "react-icons/cg";
import { CV } from '@/components/cv';
import { useConvexAuth } from "convex/react";
import { redirect } from "next/navigation";
import { Spinner } from "@/components/spinner";
import { Skeleton } from "@/components/ui/skeleton";
import { Cover } from "@/components/cover";

interface IndividualProfileProps {
  params:{
    documentId:Id<"individual">
   }
}

const IndividualProfile = ({params}:IndividualProfileProps) => {
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [yourlevel,setLevel] = useState("");

  const [yourDescription, setYourDescription] = useState("");
  const [isCvUploaded, setIsCvUploaded] = useState(false);
  const { isAuthenticated, isLoading } = useConvexAuth();
  const [cv,isCv] = useState("");
  const [mainSkill, setMainSkill] = useState("Software Engineer");
  const [yearsOfExperience, setYearsOfExperience] = useState("0-1");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>(["React"]); // Default with React
  const [gitHubUsername, setGitHubUsername] = useState<string>("");
  const [score,setScore] = useState<string>("0");
  const [gitHubProfileImage, setGitHubProfileImage] = useState<string>("");
  const [isGitHubConnected, setIsGitHubConnected] = useState(false); // New state variable
  const [updatedDocumentId, setUpdatedDocumentId] = useState<string | null>(null);
  const [showMatchedContent, setShowMatchedContent] = useState(false);

  const document = useQuery(api.individuals.getById, {
    id: params.documentId
  });

  const update = useMutation(api.individuals.update);
  const insert = useMutation(api.individuals.insert);
  const logout = useMutation(api.individuals.logout);
  const router = useRouter();

  if (!isAuthenticated) {
     
  }



  

  const coverCv = useCoverCV();
 
  const onReplace = (url: string) => {
    coverCv.onReplace(url);
    setIsCvUploaded(true);
  };
  
 useEffect(() => {
  if (updatedDocumentId) {
    router.push(`/individuals/${updatedDocumentId}/profile`);

  }
}, [updatedDocumentId, router]);


if (document === undefined) {
  return (
    <div>
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
        <div className="space-y-4 pl-8 pt-4">
          <Skeleton className="h-14 w-[50%]" />
          <Skeleton className="h-14 w-[40%]" />

        </div>
      </div>
    </div>
  );
}
if (document === null) {
  return <div>Not found</div>
}

  const fetchGitHubUserInfo = async (accessToken: string) => {
    const url = "https://api.github.com/user";
    
    const response = await fetch(url, {
      headers: {
        "Authorization": `token ${accessToken}`
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

  const handleGitHubConnect = async (documentId:string) => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const githubToken = credential?.accessToken;
  
      if (githubToken) {
        const githubUserInfo = await fetchGitHubUserInfo(githubToken);
      
        // Display GitHub user info (update state or whatever you prefer)
        setGitHubUsername(githubUserInfo.username);
        setGitHubProfileImage(githubUserInfo.profileImage);
        setIsGitHubConnected(true); // Set the state to true when GitHub is connected

      } else {
        console.error("GitHub token is undefined");
        // Handle the error, maybe show a message to the user
      }

      // Store the GitHub access token in your database using the insert mutation
      const promise = insert({
        id: params.documentId,
        githubToken: githubToken
      })
  
      toast.promise(promise, {
        loading: "Loading...",
      });
  
    } catch (error) {
      console.error("GitHub authentication error:", error);
      toast.error("Failed to authenticate with GitHub");
    }
  };
  

  const handleSubmit = async (documentId: string) => {



      const promise =  update({
        id: params.documentId,
        name: yourName,
        email: yourEmail,
        skill: mainSkill,
        experience: yearsOfExperience,
        programmingLanguages,
        level:yourlevel,
       
   
      
      })
      .then(() => {
        setUpdatedDocumentId(documentId); // Store the updated documentId in local state
        setShowMatchedContent(true); // Set the state to true when the promise resolves
    }).catch((error) => {
  
      console.error("Update error:", error);
  });



      toast.promise(promise, {
        loading: "Loading...",
       
      });
   
    
  };
  const handleLogout = async () => {
    try {
      const auth = getAuth();
      await signOut(auth);
  
      // Remove GitHub token from your database using the update mutation
      const promise = logout({
        id: params.documentId,
        githubToken: ""  // set the token to null or remove it completely
      });
  
      toast.promise(promise, {
        loading: "Logging out...",
      });
  
      // Clear GitHub token from local state
      setGitHubUsername("");
      setGitHubProfileImage("");
      setIsGitHubConnected(false); // Reset the state to false when logging out

      // Redirect the user to the login page or do whatever you need after logout
  
    } catch (error) {
      console.error("Error signing out:", error);
      // Handle error, maybe show a message to the user
    }
  };
  

  const handleAddLanguage = () => {
    if (selectedLanguage && !programmingLanguages.includes(selectedLanguage)) {
      setProgrammingLanguages([...programmingLanguages, selectedLanguage]);
      setSelectedLanguage(""); // Reset the selected language
    }
  };

  return (
    <div className="h-full flex items-center justify-center h-[110vh]">
      <div className="w-2/5 space-y-6">
        <div className="space-y-4">
        
       

          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              type="text"
              required
              name="name"
              value={yourName}
              placeholder="Enter your name"
              onChange={(e) => setYourName(e.target.value)}
              id="name"
              className="mt-1 block w-full py-2 px-3 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
            
              name="email"
              value={yourEmail}
              onChange={(e) => setYourEmail(e.target.value)}
              id="email"
              placeholder="Enter your email"
              className="mt-1 block w-full py-2 px-3 border rounded-md"
            />
          </div>
          <div>
            <label htmlFor="mainSkill" className="block text-sm font-medium text-gray-700">
              Main Skill
            </label>
            <select
              value={mainSkill}
              onChange={(e) => setMainSkill(e.target.value)}
              id="mainSkill"
              className="mt-1 block w-full py-2 px-3 border rounded-md"
            >
              <option value="Software Engineer">Software Engineer</option>
              <option value="Data Analyst">Data Analyst</option>
              <option value="Front-end Developer">Front-end Developer</option>
            </select>
          </div>

          <div>
            <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
              Years of Experience
            </label>
            <select
              value={yearsOfExperience}
              onChange={(e) => setYearsOfExperience(e.target.value)}
              id="yearsOfExperience"
              className="mt-1 block w-full py-2 px-3 border rounded-md"
            >
              <option value="0-1">0-1</option>
              <option value="1-3">1-3</option>
              <option value="3-5">3-5</option>
              <option value="5+">5+</option>
            </select>
          </div>
       
          <div>
            <label htmlFor="programmingLanguage" className="block text-sm font-medium text-gray-700">
              Programming Languages
            </label>
            <div className="flex space-x-4 mt-1">
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                id="programmingLanguage"
                className="mt-1 block w-full py-2 px-3 border rounded-md"
              >
                <option value="" disabled>Select a language</option>
                <option value="JavaScript">JavaScript</option>
                <option value="Python">Python</option>
                <option value="Java">Java</option>
                <option value="Ruby">Ruby</option>
                <option value="Go">Go</option>
                <option value="C#">C#</option>
                <option value="PHP">PHP</option>
                <option value="TypeScript">TypeScript</option>
                <option value="Swift">Swift</option>
                <option value="Kotlin">Kotlin</option>
              </select>
              <Button onClick={handleAddLanguage} className="text-white px-4 py-2 rounded">
                Add
              </Button>
            </div>
          </div>
          <div>
            <div className="flex space-x-4 mt-1">
              {programmingLanguages.map((lang, index) => (
                <div key={index} className="bg-blue-200 text-blue-800 px-3 py-1 rounded-md">
                  {lang}
                </div>
              ))}
            </div>
          </div>
          {!document?.cv && (
              <Button onClick={coverCv.onOpen} className="text-muted-foreground text-sx gap-2" variant="outline" size="sm">
             <CgFileDocument className="text-2xl" /> Upload CV
           </Button>
       )}
        <CV url={document?.cv}/>
        

          {isGitHubConnected ? (
           <div className="flex items-center justify-between">
            <div className='flex items-center justify-start gap-4'>
            <img src={gitHubProfileImage} alt="GitHub Profile" className='rounded-full' width="60" />
              <p className='font-bold'>{gitHubUsername}</p>
           </div>
            <h2 className='text-red-500 cursor-pointer' onClick={handleLogout}>Logout</h2>
            </div>
          
          ) : (
            <div>
            <Button onClick={() => handleGitHubConnect(document._id)} className="bg-black text-white px-4 py-2 rounded gap-2">
            <FaGithub className='text-2xl'/>  Connect Github
            </Button>
          </div>
            )}
          <Button
            onClick={() => handleSubmit(document._id)}
            className="text-white px-4 py-2 rounded"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default IndividualProfile;
