"use client";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation} from "convex/react";
import { useRouter } from "next/navigation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

const CompanyProfile = () => {
  const FormSchema = z.object({
    individualTitle: z.string({
      required_error: "Please enter your job title.",
    }),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const create = useMutation(api.individuals.createIndividual);
  const router = useRouter();




  return (
    <div className="h-full flex items-center justify-center">
      <div className="w-2/3 space-y-6">
       
      </div>
    </div>
  );
};

export default CompanyProfile;
