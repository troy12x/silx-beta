"use client";
import { useState } from 'react';
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Textarea } from '@/components/ui/textarea';

interface IndividualProfileProps {
  params:{
    documentId:Id<"individual">
   }
}

const IndividualProfile = ({params}:IndividualProfileProps) => {
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [yourDescription, setYourDescription] = useState("");

  const [mainSkill, setMainSkill] = useState("Software Engineer");
  const [yearsOfExperience, setYearsOfExperience] = useState("0-1");
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [programmingLanguages, setProgrammingLanguages] = useState<string[]>(["React"]); // Default with React

  const update = useMutation(api.individuals.update);
  const router = useRouter();

  const documents = useQuery(api.individuals.getSidebar, {
    id: params.documentId as Id<"individual">,

  });

  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (documentId: string) => {

      const promise =  update({
        id: params.documentId,
        name: yourName,
        email: yourEmail,
        skill: mainSkill,
        experience: yearsOfExperience,
        programmingLanguages,
        description:yourDescription
      })
      .then((documentId) => router.push(`/findjob/`))

      toast.promise(promise, {
        loading: "Loading...",
       
      });
    
    
  };

  const handleAddLanguage = () => {
    if (selectedLanguage && !programmingLanguages.includes(selectedLanguage)) {
      setProgrammingLanguages([...programmingLanguages, selectedLanguage]);
      setSelectedLanguage(""); // Reset the selected language
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-2/3 space-y-6">
        <div className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <Input
              type="text"
        
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
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description

            </label>
            <Textarea
              name="description"
              value={yourDescription}
              onChange={(e) => setYourDescription(e.target.value)}
              id="description"
              placeholder="Enter your description"
              className="mt-1 block w-full py-2 px-3 border rounded-md resize-none"
            />
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
          <Button
            onClick={() => handleSubmit(documents[0]._id)}
            key={`${documents[0]._id}-data`}
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
