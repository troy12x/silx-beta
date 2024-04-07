"use client";

import { useState, useEffect } from 'react';
import { useQuery } from 'convex/react';
import { api } from '@/convex/_generated/api';
import Image from 'next/image';
import axios from 'axios';
import { Doc, Id } from "@/convex/_generated/dataModel";
import { Cover } from "@/components/cover";
import { Skeleton } from "@/components/ui/skeleton";

type Individual = {
  _id: Id<"individual">;
  _creationTime: number;
  userId: string;
  individualTitle: string;
  skill: string;
  name: string;
  email: string;
  experience: string;
  description: string;
  programmingLanguages: string[];  // Updated property name
};

interface MatchPageProps {
  params: {
    documentId: Id<"company">;
  };
}

const Match = ({ params }: MatchPageProps) => {
  const [aiResponse, setAiResponse] = useState<string | null>(null);
  const individuals = useQuery(api.individuals.getAll);
  const document = useQuery(api.company.getById, {
    id: params?.documentId // use optional chaining to safely access properties
  });

  useEffect(() => {
    if (!params) {
      console.error("documentId is missing");
      return;
    }

    if (!document) {
      return;
    }

    if (!individuals) {
      return;
    }

    const fetchMatch = async () => {
      try {
        const prompt = `Fetch all individuals from the table with skills: ${document.lookingFor}`;
        const aiText = await getAIResponse("Name Placeholder", "Email Placeholder");

        const matchedIndividuals = individuals
          .filter((individual: Individual) => 
            individual.programmingLanguages.some(skill => document.lookingFor.includes(skill))
          )
          .map((individual: Individual) => ({
            ...individual,
            score: scoreIndividual(individual)
          }));

        const bestMatch = matchedIndividuals.reduce((prev, current) => 
          (prev.score > current.score) ? prev : current
        , matchedIndividuals[0]);

        console.log('Best Match:', bestMatch);

        const finalAiText = await getAIResponse(bestMatch.name, bestMatch.email);
        setAiResponse(finalAiText);
      } catch (error) {
        console.error('Error fetching AI response:', error);
      }
    };

    fetchMatch();
  }, [params, document, individuals]);

  if (!params || !document || !individuals) {
    return <div>Loading...</div>;
  }

  if (document === null) {
    return <div>Not found</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <h2 className="flex items-center space-x-4 bg-gray-100 p-4 rounded-lg">
        <span>
          Hello <span className='font-bold'>{document.companyName}</span>
        </span>
      </h2>
      <p className="mt-4 text-gray-600">This is what we matched you with</p>
      {aiResponse && <div className="mt-4">{aiResponse}</div>}
    </div>
  );
};

export default Match;

const OPENAI_API_KEY = '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';

async function getAIResponse(matchedName: string, matchedEmail: string): Promise<string> {
  const prompt = `Congrats! You have been matched with ${matchedName}. His email is ${matchedEmail}.`;
  
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

  if (response && response.data && response.data.choices && response.data.choices[0]) {
    return `Congrats! You have been matched with ${matchedName}. His email is ${matchedEmail}. ${response.data.choices[0].text.trim()}`;
  }

  throw new Error('Failed to get AI response');
}

function scoreIndividual(individual: Individual): number {
  let score = 0;

  // Score based on programming languages
  if (individual.programmingLanguages.length > 4) {
    score += 1;
  } else {
    score -= 1;
  }

  // Score based on experience
  const calculateScore = (experience: string): number => {
    if (experience === "5+") {
      return 3;
    } else if (experience === "1-3+") {
      return 1;
    } else if (experience === "3-5") {
      return 2;
    } else if (experience === "0-1") {
      return -1;
    } else {
      return 0; // default score
    }
  };

  return score;
}
