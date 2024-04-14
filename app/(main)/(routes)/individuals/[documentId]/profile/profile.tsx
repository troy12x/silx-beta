"use client";

import { ElementRef, useRef, useState ,useEffect} from "react";
import { BadgeCheck, ImageIcon, Smile, TvIcon, X } from "lucide-react";
import { useMutation } from "convex/react";
import TextareaAutosize from "react-textarea-autosize";

import { useCoverImage } from "@/hooks/use-cover-image";
import { Doc } from "@/convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";

import { toast } from "sonner";

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

  const update = useMutation(api.documents.update);
  const removeIcon = useMutation(api.documents.removeIcon);
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


  const disableInput = () => setIsEditing(false);
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
  



  return (
    <div className="pl-[54px] group relative">
     
     {!!initialData.name &&  (
        <p className="text-3xl pt-6">
          {initialData.name}
        </p>
      )}
       {userRepositories.map((repository, index) => (
          <div key={index}>
            {repository.name}
            <div>
              {repository.description}
            </div>
          
          </div>
        ))}
    </div>
  )
}