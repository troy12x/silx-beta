"use client";

import {
 
    Dialog,
    DialogContent,
    DialogHeader
 
} from "@/components/ui/dialog";
import { MultiFileDropzone, type FileState } from "@/components/multifile-dropzone";

import { useCoverCV } from "@/hooks/user-cv";
import { useState } from "react";
import { useEdgeStore } from "@/lib/edgestore";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";
import { Id } from "@/convex/_generated/dataModel";

export const CoverCvModal = () => {
    const params = useParams();
    const [file, setFile] = useState<FileState[]>([]); // Initialize as empty array of FileState
    
    const [isSubmitting,setIsSubmitting] = useState(false);
    const updateCV = useMutation(api.individuals.updateCV);

    const coverCv = useCoverCV();
    const { edgestore }= useEdgeStore();

    const onClose = () => {
        setFile([]); // Reset to empty array
        setIsSubmitting(false);
        coverCv.onClose();
   }

   const onChange = async (files: FileState[]) => {

    if (files && files.length > 0) {
      setIsSubmitting(true);
      setFile(files);
  
      const addedFile = files[0].file;
      const res = await edgestore.publicFiles.upload({
        file: addedFile,
        options: {
          replaceTargetUrl: coverCv.url,
        },
      });
  
      await updateCV({
        id: params.documentId as Id<"individual">,
        cv: res.url,
      });
  
      onClose();
    }
  };
  

    return ( 
        <Dialog open={coverCv.isOpen} onOpenChange={coverCv.onClose}>
            <DialogContent>
                <DialogHeader>
                    <h2 className="text-center text-lg font-semibold">
                        Cover CV
                    </h2>
                </DialogHeader>
               <MultiFileDropzone
               className="w-full outline-none"
               disabled={isSubmitting}
               value={file}
               onChange={onChange}
          
               />
            </DialogContent>
        </Dialog>
    )
}