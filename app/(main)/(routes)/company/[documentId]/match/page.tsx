"use client"

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import emailjs from '@emailjs/browser';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface CandidateInfo {
  name: string;
  email: string;
  field: string;
  yearsOfExperience: number;
  skills: string[];
  skills2: string[];
}

const candidateInfo: CandidateInfo = {
  name: "Eyad Gomaa",
  email: "hryp562@gmail.com", // The email you want to send to
  field: "[field]",
  skills2: ["Reliability 4.15 Displays good logical thinking, may produce minor errors that affect project progress.", "Security 5.00 Adheres to best practices in coding to produce secure code without vulnerabilities."],
  yearsOfExperience: 0, // Replace with actual number
  skills: ["Reliability 5.00 Demonstrates strong logical thinking, producing reliable code without errors.", "Maintainability 4.44 Produces unstructured code that is challenging to understand."]
};

const CompanyMatchPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<{ type: 'success' | 'error' | ''; message: string }>({ type: '', message: '' });

  const handleInvite = async () => {
    setIsLoading(true);
    setStatus({ type: '', message: '' });

    const templateParams = {
      to_email: candidateInfo.email,
      from_name: "Truffle",
      to_name: candidateInfo.name,
      message: `We would like to invite you for an interview.`
    };

    try {
      const result = await emailjs.send(
        'service_vw3tfra', // Replace with your EmailJS service ID
        'template_llj6pmd', // Replace with your EmailJS template ID
        templateParams,
        '9i4whkJsA1_kgilat' // Replace with your EmailJS public key
      );

      if (result.text === 'OK') {
        setStatus({ type: 'success', message: 'Interview invitation sent successfully!' });
      } else {
        throw new Error('Failed to send invitation');
      }
    } catch (error) {
      setStatus({ type: 'error', message: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}` });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Company Match</h1>
          <h2 className="text-xl font-semibold mb-2">{candidateInfo.name}</h2>
          <p className="mb-4">
          Eyad Gomaa can write reliable and clean code, but may contain security concerns. Eiad Gomaa has not been extensively engaged in the open-source community.
          </p>
          <h3 className="text-lg font-semibold mb-2">Overall Rating is C/6.55</h3>
          <ul className="list-disc list-inside mb-4">
            {candidateInfo.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <Button onClick={handleInvite} disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Invite to Interview'}
          </Button>
          <h2 className="text-xl font-semibold mt-5">Jacob</h2>
          <p className="mb-4">
          Jacob Binnie can write reliable, secure and clean code. In addition, Jacob Binnie has made notable contributions to the open-source community.</p>
          <h3 className="text-lg font-semibold mb-2">Overall Rating is A/8.18</h3>
          <ul className="list-disc list-inside mb-4">
            {candidateInfo.skills.map((skill, index) => (
              <li key={index}>{skill}</li>
            ))}
          </ul>
          <Button >
             Invite to Interview
          </Button>
          {status.message && (
            <Alert className={`mt-4 ${status.type === 'error' ? 'bg-red-100' : 'bg-green-100'}`}>
              <AlertDescription>{status.message}</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompanyMatchPage;