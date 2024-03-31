"use client";
import Link from "next/link"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const IndividualPage = () => {
  const FormSchema = z.object({
    individualName: z.string({
      required_error: "Please enter your individual name.",
    }),
  });
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const create = useMutation(api.individuals.createIndividual);
   
  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      // Call the create mutation with the form data
      create({
        individualName: data.individualName,
      });
      
      // Handle success, navigate to another page, or show a success message
      console.log("Individual data created successfully");
    } catch (error) {
      // Handle error
      console.error("Error creating individual data:", error);
    }
  };

  return (
  <div className="h-full flex items-center justify-center">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="individualName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Chose your job role</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a verified email to display" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="software engineer">software engineer</SelectItem>
                  <SelectItem value="Data analysis">Data analysis</SelectItem>
                </SelectContent>
              </Select>
              <FormDescription>
                You can manage email addresses in your{" "}
                <Link href="/examples/forms">email settings</Link>.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  </div>
  )
}
 
export default IndividualPage;