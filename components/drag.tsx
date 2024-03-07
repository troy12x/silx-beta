// Drag.tsx

"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";

interface DragProps {
  onChange: (value: string) => void;
}

export const DragItem: React.FC<DragProps> = ({ onChange }) => {
  const [name, setName] = useState("");
  const [showLabel, setShowLabel] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };



  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onChange(name); // Call the provided onChange callback with the name value
    setShowLabel(true);
  };

  return (
    <div className={cn("relative pb-40 group")}>
   
        <form className="md:max-w-3xl lg:max-w-4xl mx-auto" onSubmit={handleFormSubmit}>
          <Label>Typ your name</Label>
          <Input type="text" placeholder="My Name" className="w-200 mt-1" onChange={handleInputChange} />

          <Button type="submit" className="mt-3">
            Submit
          </Button>
        </form>

    </div>
  );
};

export default DragItem;
