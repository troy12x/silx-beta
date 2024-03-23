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

  const OPENAI_API_KEY = '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';
  const handleChatInput = async () => {
    setLoading(true);
    try {
      const usersData = await fetchDataFromFirestore();
      const userDataText = usersData.map(user => `${user.name} ${user.age} ${user.email} ${user.summary} ${user.university}`).join(' ');
      const prompt = `${chatInput} ${userDataText}`;
    
      const response = await axios.post(
        'https://api.openai.com/v1/completions',
        {
          model: 'gpt-3.5-turbo-instruct',
          prompt,
          max_tokens: 150
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${OPENAI_API_KEY}`,
          }
        }
      );
  
      const answer = response.data.choices[0].text.trim();
  
      if (answer) {
        setAiResponse(answer);
        setShowDialog(true);
      } else {
        setAiResponse("We were unable to find a suitable answer. Please try again later.");
      }
    } catch (error) {
      console.error('Error querying OpenAI:', error);
      setError('Failed to fetch AI response. Please try again.');
    } finally {
      setLoading(false);
    }
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

     <div className="pl-[54px] group relative mt-3">
     <div className="grid w-full max-w-sm items-center ">
      <Label htmlFor="name">Your Name</Label>
      <Input type="text" name="name" placeholder="Eyad Gomaa" onChange={handleInputChange} className="w-60 mt-3" required />
    </div>
    <div className="grid w-full max-w-sm items-center mt-3 ">
      <Label htmlFor="email">Email</Label>
      <Input type="email" name="email" placeholder="admin@silx.com" onChange={handleInputChange} className="w-60 mt-3" required />
    </div>
    <div className="grid w-full max-w-sm items-center mt-3 ">
      <Label htmlFor="age">Age</Label>
      <Input type="number" name="age" placeholder="25" onChange={handleInputChange} className="w-60 mt-3"  required/>
    </div>
    <div className="grid w-full max-w-sm items-center mt-3 ">
      <Label htmlFor="experience">Experience</Label>
      <Input type="number" name="experience" placeholder="6" onChange={handleInputChange} className="w-60 mt-3" required />
    </div>
    <div className="grid w-full max-w-sm items-center mt-3 ">
      <Label htmlFor="skills">Skills</Label>
      <Input type="text" name="skills" placeholder="PHP, React Js, Python , Javascript" onChange={handleInputChange} className="w-60 mt-3" required />
    </div>
    <div className="grid w-full max-w-sm items-center mt-2">
 
  <option value="" className="text-black" disabled>Ex Company</option>

  {error && <p className="text-red-500">{error}</p>} 
  <Select
  defaultValue={selectedCompanyImageUrl}
  aria-label="Searchable select"
  required
>
<SelectTrigger className="w-[180px]">
  {selectedCompany ? (
    <div className="d-flex gap-2 items-center">
      <img src={selectedCompanyImageUrl} className="w-10 h-10 inline-block rounded-full object-cover" />
      <span>{selectedCompanyName}</span>
    </div>
  ) : (
    <SelectValue placeholder="Select Company" />
  )}
</SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <div className="p-2.5">
        <Input className="w-full" placeholder="Search..." type="search" />
      </div>
      {companyData.map((company, index) => (
        <SelectItem key={company.image_url} value={company.image_url} onClick={() => handleCompanySelect(company.image_url)}>
          <div
            className="flex items-center gap-2"
            
          >
            <img src={company.image_url} className="w-10 h-10 inline-block ml-2 rounded-full object-cover" />
            <h2>{company.identifier.value}</h2>
          </div>
        </SelectItem>
      ))}
    </SelectGroup>
  </SelectContent>
</Select>


</div>



    <div className="grid w-full max-w-sm items-center mt-3 ">
      <Label htmlFor="summary">Summary</Label>
      <Input type="text" name="summary" placeholder="I'm a tech wizard with a byte-sized experience of 8 years in the digital realm" onChange={handleInputChange} className="w-60 mt-3" />
    </div>
    <div className="grid w-full max-w-sm items-center mt-3 ">
      <Label htmlFor="university">University</Label>
      <Input type="text" name="university" placeholder="Harvard " onChange={handleInputChange} className="w-60 mt-3" />
    </div>
    
      {/* Other form inputs */}

     {/** <div>
      {!!initialData._id &&  (
        <p className="text-6xl pt-6">
          {initialData._id}
        </p>
      )}
       
      </div> */}

      <Button onClick={handleSubmit} className="mt-3">Submit</Button>


{/**      <Input type="text" placeholder="Ask any question..." value={chatInput} onChange={(e) => setChatInput(e.target.value)} className="mt-3 w-60" />
      <Button onClick={handleChatInput} className="mt-3" disabled={loading}>Ask</Button> */}
 

      <Dialog open={showDialog} onOpenChange={onClose} >
        <DialogContent>
          <DialogHeader className="border-b pb-3">
            <h2 className="text-lg font-medium">
              AI Response
            </h2>
          </DialogHeader>
          <div>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : aiResponse ? (
              <p>{aiResponse}</p>
            ) : (
              matches.map((match, index) => (
                <div key={index}>
                  {/* Render user details here */}
                </div>
              ))
            )}
          </div>
        </DialogContent>
      </Dialog>

     </div>
    </div>
  );
};

export default Editor;
