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
import { documentId } from 'firebase/firestore';
import { EditProfile } from './profile';

interface IndividualProfileProps {
    params: {
        documentId: Id<"individual">;
   };
}

const ProfilePage= ({params}:IndividualProfileProps) => {
  const [yourName, setYourName] = useState("");
  const [yourEmail, setYourEmail] = useState("");
  const [yourDescription, setYourDescription] = useState("");
  const [userRepositories, setUserRepositories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);


  const document = useQuery(api.individuals.getById, {
    id: params.documentId
  });

  const update = useMutation(api.individuals.update);
  const router = useRouter();
 
  if (document === undefined) {
    return (
      <div>Loading...</div>
    );
  }
  if (document === null) {
    return <div>Not found</div>;
  }
 



  return (
    <div className="h-full flex items-center justify-center">
    <EditProfile  initialData={document} />
    </div>
  );
};

export default ProfilePage;
