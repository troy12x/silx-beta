"use client";

import { useState } from 'react';
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Id } from "@/convex/_generated/dataModel";

interface IndividualProfileProps {
  parentDocumentId: Id<"individual">;
}

const IndividualProfile = ({ parentDocumentId }: IndividualProfileProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mainSkill, setMainSkill] = useState("Software Engineer");
  const [yearsOfExperience, setYearsOfExperience] = useState("0-1");

  const update = useMutation(api.individuals.update);
  const router = useRouter();

  const handleSubmit = async () => {
    try {
      const result = await update({
        id: parentDocumentId,

        skill: mainSkill,
        experience: yearsOfExperience,
      });

      if (result) {
        toast.success("Profile updated successfully");
        router.push("/individuals");
      }

    } catch (error) {
      console.error("Error updating individual profile:", error);
      toast.error("Failed to update individual profile");
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-2/3 space-y-6">
        <div className="space-y-4">
     

           
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
          <Button 
            onClick={() => handleSubmit()}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </Button>
        </div>

      </div>
    </div>
  );
};

export default IndividualProfile;
