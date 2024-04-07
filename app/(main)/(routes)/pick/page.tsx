"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

import { Doc, Id } from "@/convex/_generated/dataModel";

interface PickProps {
  params: {
    documentId: Id<"individual">;
  };
}

const PickComp = ({}: PickProps) => {
  const FormSchema = z.object({
    individualTitle: z.string({
      required_error: "Please enter your job title.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const params = useParams();
  const create2 = useMutation(api.company.create);
  const create = useMutation(api.individuals.create);
  const router = useRouter();

  const onRedirect = (documentId: string) => {
    router.push(`/company/${documentId}`);
  };
  const onRedirect2 = (documentId: string) => {
    router.push(`/individual/${documentId}`);
  };

  const company = useQuery(api.company.getTrash);
  const documents = useQuery(api.individuals.getTrash);

  const handleCompany = async () => {


      const promise = create2({
        companyName: "",
        companyDescription: "",
        companySize: "",
        lookingFor: "",
        payingSalary: "",
      })
      .then((documentId) => router.push(`/company/${documentId}`))



      toast.promise(promise, {
        loading: "Loading...",
       
      });
  };

  if (company === undefined) {
    return (
      <div className="h-full flex items-center justify-center p-4">
        <h3>Loading ...</h3>
      </div>
    );
  }

  const handleIndividual = async () => {
   
      const promise = create({
        individualTitle: "Individual",
        skill: "",
        experience: "",
        email: "",
        name: "",
        description: "",
        programmingLanguages: [""],
      })
      .then((documentId) => router.push(`/individuals/${documentId}`))

      toast.promise(promise, {
        loading: "Loading...",
       
      });
    
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-2/3 space-y-6">
        <div
        
          className="text-white cursor-pointer p-4 rounded bg-black"
          onClick={() => handleCompany()}
        >
          Company
        </div>

        <div
          onClick={() => handleIndividual()}
          className="cursor-pointer p-4 border rounded"
        >
          Individual
        </div>
       
      </div>
    </div>
  );
};

export default PickComp;
