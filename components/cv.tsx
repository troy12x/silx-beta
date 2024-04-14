"use client";

import { cn } from "@/lib/utils";
import Folder from 'next/'
import { CgFileDocument } from "react-icons/cg";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useCoverCV } from "@/hooks/user-cv";
import { toast } from "sonner";

import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";
import { useEdgeStore } from "@/lib/edgestore";
interface CVProps {
    url?: string;
    preview?: boolean;
    path?:string;
  }

export const CV = ({url,preview,path}:CVProps) => {
 const {edgestore} = useEdgeStore();
  const params = useParams();
   const coverCv = useCoverCV();
   const removeCv = useMutation(api.individuals.removeCV);

   const onRemove = async () => {
    if(url){
     const promise =  edgestore.publicFiles.delete({
        url:url
      })
      await toast.promise(promise, {
        error :"Error...",
        loading: "Loading...",
        success:"The CV has been deleted successfully"
      });
  
    }
    removeCv({
      id: params.documentId as Id<"individual">
    })
   }

    return(
        <div className={cn(
            "relative w-full  h-[5vh] group flex ",
            !url && "h-auto",
            url 
        )}>
           {!!url && (
            <Button variant="outline"  >
                <div className="flex gap-3 items-center" >
                 <CgFileDocument className='text-2xl' /> 
             <h2 className="whitespace-nowrap text-ellipsis truncate">
                {url}
                
             </h2>
            </div>
            </Button>
           )}
            {url && !preview && (
        <div className="opacity-0 group-hover:opacity-100 absolute flex justify-between gap-x-2 mt-5 ">
          <Button
            onClick={() => coverCv.onReplace(url)}
            className="text-muted-foreground text-xs"
            variant="outline"
            size="sm"
          >
            
            Change CV
          </Button>
          <Button
         
            className="text-muted-foreground text-xs"
            variant="outline"
            onClick={onRemove}
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            Remove
          </Button>
        </div>
      )}
        </div>
    )
}