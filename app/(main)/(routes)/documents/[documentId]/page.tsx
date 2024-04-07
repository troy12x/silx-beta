"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { DragItem } from "@/components/drag";
import React, { useState } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";


interface DocumentIdPageProps {

  params: {
    documentId: Id<"documents">;
  };
};

//edit page

const DocumentIdPage = ({
  params
}: DocumentIdPageProps) => {
  const Editor = useMemo(() => dynamic(() => import("@/components/editor"), { ssr: false }) ,[]);
  const [showDragItem, setShowDragItem] = useState(false);

  const document = useQuery(api.documents.getById, {
    documentId: params.documentId
  });

  
  const handleShowDragItem = () => {
    setShowDragItem(true);
  };


  
  const [value, setValue] = useState("");

  const update = useMutation(api.documents.update);
 
  
  const onChange = (content: string) => {
    update({
      id: params.documentId,
      content
    });
   
    setValue(content);  // Update the value state

  };

  if (document === undefined) {
    return (
      <div>
        <Cover.Skeleton />
        <div className="md:max-w-3xl lg:max-w-4xl mx-auto mt-10">
          <div className="space-y-4 pl-8 pt-4">
            <Skeleton className="h-14 w-[50%]" />
            <Skeleton className="h-4 w-[80%]" />
            <Skeleton className="h-4 w-[40%]" />
            <Skeleton className="h-4 w-[60%]" />
          </div>
        </div>
      </div>
    );
  }
  if (document === null) {
    return <div>Not found</div>
  }

  return ( 
    <div className="pb-40">
      <div className="md:max-w-3xl lg:max-w-4xl mx-auto">
        <Toolbar initialData={document} /> 
        <Editor
          onChange={onChange}
          initialContent={document.content}
          initialData={document}
   
        />
        
      
      {/*  {showDragItem &&   <DragItem onChange={(value) => console.log("DragItem value:", value)} /> }
        <Button onClick={handleShowDragItem}>Click here</Button> */}
      </div>
    </div>
   );
}
 
export default DocumentIdPage;