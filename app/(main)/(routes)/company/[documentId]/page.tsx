"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';

import { useMutation, useQuery } from "convex/react";
import { redirect, useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { Input } from "@/components/ui/input";

import { Doc, Id } from "@/convex/_generated/dataModel";
import Match from "./match";

interface CompanyProfileProps {
  params:{
   documentId:Id<"company">
  }
 }
 

const Company = ({params}: CompanyProfileProps) => {
  const FormSchema = z.object({
    individualTitle: z.string({
      required_error: "Please enter your job title.",
    }),
  });
  const [yourCompanyName, setYourCompanyName] = useState("");
  const [yourCompanyDescription, setYourCompanyDescription] = useState("");

  const [YourlookingFor, setLookingFor] = useState("Software Engineer");
  const [YourpayingSalary, setYourPayingSalary] = useState("$50,000 - $75,000");
  const [yourCompanySize, setYourCompanySize] = useState("1-10 employees");
  const [isMatchShown, setIsMatchShown] = useState(false);

  const update = useMutation(api.company.update);                 
  const router = useRouter();
  const [showMatchedContent, setShowMatchedContent] = useState(false); // State to track if the matched content should be shown
  const [updatedDocumentId, setUpdatedDocumentId] = useState<string | null>(null); // Local state to store the updated documentId

  const onRedirect = () => {
    router.push(`/match`);
  };
     
  
  const documents = useQuery(api.company.getTrash, {});

  if (documents === undefined) {
    return <div>Loading...</div>;
  }

  
  const handleSubmit = async (documentId:string) => {
    if (!yourCompanyName || !yourCompanyDescription || !yourCompanySize || !YourlookingFor || !YourpayingSalary) {
        toast.error("Please fill out all the required fields.");
        return;
    }


    const promise = update({
        id: params.documentId,
        companyName: yourCompanyName,
        companyDescription: yourCompanyDescription,
        companySize: yourCompanySize,
        lookingFor: YourlookingFor,
        payingSalary: YourpayingSalary
    })
     
    .then(() => {
      console.log("Company updated successfully:", documentId); // use response.id instead of documentId
      setUpdatedDocumentId(documentId); // Store the updated documentId in local state
      setShowMatchedContent(true); // Set the state to true when the promise resolves
  })
    .catch((error) => {
        toast.error("An error occurred while updating the company.");
        console.error("Update error:", error);
    });

    toast.promise(promise, {
        loading: "Loading...",
    });


};

useEffect(() => {
  if (updatedDocumentId) {
    router.push(`/company/${updatedDocumentId}/match`);
  }
}, [updatedDocumentId, router]);

  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <h3>Loading ...</h3>
      </div>
    );
  }



  if (documents === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <h3>Loading ...</h3>
      </div>
    );
  }

  return (
    <div>

        <div className="h-full flex items-center justify-center mt-3">
          <div className="w-2/3 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Company Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={yourCompanyName}
                  placeholder="Enter your company Name"
                  onChange={(e) => setYourCompanyName(e.target.value)}
                  id="name"
                  className="mt-1 block w-full py-2 px-3 border rounded-md"
                />
              </div>
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Company Description
                </label>
                <Textarea
                  name="description"
                  value={yourCompanyDescription}
                  onChange={(e) => setYourCompanyDescription(e.target.value)}
                  id="description"
                  placeholder="Enter your company Description"
                  className="mt-1 block w-full py-2 px-3 border rounded-md resize-none"
                />
              </div>
              <div>
                <label htmlFor="mainSkill" className="block text-sm font-medium text-gray-700">
                  Looking for
                </label>
                <select
                  value={YourlookingFor}
                  onChange={(e) => setLookingFor(e.target.value)}
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
                  Company Size
                </label>
                <select
                  value={yourCompanySize}
                  onChange={(e) => setYourCompanySize(e.target.value)}
                  id="yearsOfExperience"
                  className="mt-1 block w-full py-2 px-3 border rounded-md"
                >
                  <option value="1-10 employees">1-10 employees</option>
                  <option value="11-50 employees">11-50 employees</option>
                  <option value="51-250 employees">51-250 employees</option>
                  <option value="251-500 employees">251-500 employees</option>
                </select>
              </div>
              <div>
                <label htmlFor="payingSalary" className="block text-sm font-medium text-gray-700">
                  Paying Salary
                </label>
                <select
                  value={YourpayingSalary}
                  onChange={(e) => setYourPayingSalary(e.target.value)}
                  id="payingSalary"
                  className="mt-1 block w-full py-2 px-3 border rounded-md"
                >
                  <option value="$50,000 - $75,000">$50,000 - $75,000</option>
                  <option value="$75,000 - $100,000">$75,000 - $100,000</option>
                  <option value="$100,000 - $130,000">$100,000 - $130,000</option>
                </select>
              </div>
              <Button
                onClick={() => handleSubmit(documents[0]._id)}
                className="text-white px-4 py-2 rounded"
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
        {/**      <Match params={{ documentId: documents[0]._id }}/> */}
    </div>
  );

};

export default Company;
