"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation} from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const IndividualPage = () => {
  const FormSchema = z.object({
    individualTitle: z.string({
      required_error: "Please enter your job title.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const create = useMutation(api.individuals.create);
  const router = useRouter();

  const handleCompany = async () => {
    try {
      const result = await create({
        individualTitle: "Company",
        skill:"",
        experience:"",
        
      });

      if (result) {
        router.push("/company");
        console.log("Company data created successfully");
      }

    } catch (error) {
      console.error("Error creating company data:", error);
      toast.error("Failed to create company data");
    }
  };

  const handleIndividual = async () => {
    try {
      const result = await create({
        individualTitle: "Individual",
        skill:"",
        experience:"",
      });

      if (result) {
        router.push("/individuals");
        console.log("Individual data created successfully");
      }

    } catch (error) {
      console.error("Error creating individual data:", error);
      toast.error("Failed to create individual data");
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-2/3 space-y-6">
        <div onClick={handleCompany} className="cursor-pointer p-4 border rounded">
          Company
        </div>
        <div onClick={handleIndividual} className="cursor-pointer p-4 border rounded">
          Individual
        </div>
      </div>
    </div>
  );
};

export default IndividualPage;
