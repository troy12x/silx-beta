"use client";

import { useMutation, useQuery } from "convex/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";

import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Toolbar } from "@/components/toolbar";
import { Cover } from "@/components/cover";
import { DragItem } from "@/components/drag";
import React, { useState } from "react";
import { toast } from "sonner";

import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui/dialog';

import axios from 'axios';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { db } from '../../../../../components/firebase-config';
import { Input } from "@/components/ui/input";
import { Doc } from "@/convex/_generated/dataModel";
import DocumentIdPage from "@/app/(public)/(routes)/preview/[documentId]/page";

import { Manage } from "@/app/(main)/_components/manage";


//edit page

const ManageApp = ({

}) => {
  
  const params = useParams();

  


  const OPENAI_API_KEY = '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';

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
        <p className="text-4xl pt-6 mt-3 font-bold">Manage applications</p>

       <Manage />

        {/* Dialog for adding edits */}


      </div>
    </div>
  );
}
 
export default ManageApp;