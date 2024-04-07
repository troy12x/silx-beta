"use client";

import { useTheme } from "next-themes";
import {
  BlockNoteEditor,
  PartialBlock
} from "@blocknote/core";
import {
  BlockNoteView,
  useBlockNote
} from "@blocknote/react";
import "@blocknote/core/style.css";
import { useState, useEffect } from 'react';
import { Label } from "@/components/ui/label"
import { useMutation, useQuery } from "convex/react";

import { v4 as uuidv4 } from 'uuid';
import { SelectValue, SelectTrigger, SelectItem, SelectGroup, SelectContent, Select } from "@/components/ui/select"


import {
  Dialog,
  DialogContent,
  DialogHeader
} from '@/components/ui/dialog';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel';

import axios , {AxiosError} from 'axios';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { db } from './firebase-config';
import { useEdgeStore } from "@/lib/edgestore";
import { getById } from '@/convex/documents'; 
import { Doc } from "@/convex/_generated/dataModel";


interface User {
  name: string;
  email: string;
  summary: string;
  age: number;
  university: string;
  documentId: string; // Added documentId field
  userId: string; // Added userId field
  experience: number;
  skills:string;
  selected:string;
}

interface EditorProps {
  onChange: (value: string) => void;
  initialContent?: string;
  editable?: boolean;
  initialData: Doc<"documents">; 
}

interface Organization {
  uuid: string;
  image_url: string;
  short_description: string;
  identifier: {
    permalink: string;
    image_id: string;
    uuid: string;
    entity_def_id: string;
    value: string;
  };
  properties: {
    identifier: {
      permalink: string;
      image_id: string;
      uuid: string;
      entity_def_id: string;
      value: string;
    };
    short_description: string;
    rank_org: number;
    location_identifiers: {
      permalink: string;
      uuid: string;
      location_type: string;
      entity_def_id: string;
      value: string;
    }[];
  };
}


const Editor = ({
  onChange,
  initialContent,
  editable,


  initialData
 // Receive Convex document ID as prop
}: EditorProps) => {
  const [formData, setFormData] = useState<User>({
    name: '',
    email: '',
    summary: '',
    age: 0,
    experience:0,
    university: '',
    selected:'',
    skills:'',
    userId: "", // Added userId field
    documentId: initialData._id // Initialize documentId field
  });

  const [chatInput, setChatInput] = useState('');
  const [matches, setMatches] = useState<User[]>([]);
  const [aiResponse, setAiResponse] = useState<string>('');
  const [showDialog, setShowDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const [companyData, setCompanyData] = useState<Organization[]>([]);
  const [selectedCompanyName, setSelectedCompanyName] = useState<string>('');
  const [selectedCompanyImageUrl, setSelectedCompanyImageUrl] = useState<string>('');
  const [selectedCompanyRankOrg, setSelectedCompanyRankOrg] = useState<number | null>(null);
  const [selectedCompany, setSelectedCompany] = useState<Organization | null>(null);
  const [companySelections, setCompanySelections] = useState([{ id: uuidv4(), imageUrl: selectedCompanyImageUrl, name: selectedCompanyName }]);

  const [companyNames, setCompanyNames] = useState<string[]>([]);
  const [sidebarDocuments, setSidebarDocuments] = useState([]);

  const [error, setError] = useState<string | null>(null);

  const { resolvedTheme } = useTheme();
  const { edgestore } = useEdgeStore();

  const handleUpload = async (file: File) => {
    const response = await edgestore.publicFiles.upload({ 
      file
    });

    return response.url;
  }


  const editor = useBlockNote({
    editable,
    initialContent: 
      initialContent 
      ? JSON.parse(initialContent)
      : undefined,
    onEditorContentChange: (editor) => {
      onChange(JSON.stringify(editor.topLevelBlocks, null, 2));
    },
    uploadFile: handleUpload
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleSubmit = async () => {
    try {
      setLoading(true);
  
      // Validate required fields
      if (!formData.name || !formData.email || !formData.age || !formData.experience) {
        console.error('Please fill in all required fields.');
        return;
      }
  
      const userId = uuidv4();
  
      // Add the userId to the form data
      const formDataWithUserId = { ...formData, userId };
  
      // Add the selected company's information to the form data
      const formDataWithCompany = {
        ...formDataWithUserId,
        companyName: selectedCompanyName,
        companyImageUrl: selectedCompanyImageUrl,
        companyRankOrg: selectedCompanyRankOrg
      };
  
      // Add the form data to Firestore
      const docRef = await addDoc(collection(db, 'users'), formDataWithCompany);
  
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
      // Handle error appropriately, e.g., show an error message to the user
    } finally {
      setLoading(false);
    }
  };
  
  
  

  const fetchDataFromFirestore = async () => {
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = usersSnapshot.docs.map((doc) => doc.data() as User);
    return usersData;
  };



  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const usersData = await fetchDataFromFirestore();
        setMatches(usersData);
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Failed to fetch user data. Please try again.');
      }
    };
    fetchUserData();
  }, []);
  
//test d12232

const onClose = () => {
  setShowDialog(false);
  setAiResponse('');
  setError('');
};

useEffect(() => {
  const fetchOrganizations = async () => {
    try {
      const response = await axios.get('http://localhost:5000');
      const { entities } = response.data; // Extract the entities array from the response data

      if (Array.isArray(entities)) {

        setCompanyData(entities.map(entity => entity.properties)); // Extracting properties from each entity
      } else {
        setError('Error: Organizations data is not in the expected format');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        setError(`Axios Error: ${axiosError.message}`);
      } else {
        setError(`Error: ${(error as Error).message}`);
      }
    }
  };

  fetchOrganizations();
}, []);




const handleCompanySelect = (value: string) => {

  const selectedCompany = companyData.find(company => company.image_url === value);
  if (selectedCompany) {
    const companyName = selectedCompany.properties.identifier.value;
    const companyImageUrl = selectedCompany.image_url;
    const companyRankOrg = selectedCompany.properties.rank_org;

    setSelectedCompanyName(companyName);
    setSelectedCompanyImageUrl(companyImageUrl);
    setSelectedCompanyRankOrg(companyRankOrg);

    // Update the relevant fields in formData state
    setFormData(prevFormData => ({
      ...prevFormData,
      companyName: companyName,
      companyImageUrl: companyImageUrl,
      companyRankOrg: companyRankOrg
    }));
  }
};








  
  return (
    <div >

         <BlockNoteView
          editor={editor}
          theme={resolvedTheme === "dark" ? "dark" : "light"}
          />


    </div>
  );
};

export default Editor;
