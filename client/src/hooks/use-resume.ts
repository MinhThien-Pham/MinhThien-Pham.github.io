import { useQuery, useMutation } from "@tanstack/react-query";
import { api } from "@shared/routes";
import { z } from "zod";

// Define the response type based on the schema
type ResumeData = z.infer<typeof api.resume.get.responses[200]>;
type ContactInput = z.infer<typeof api.contact.send.input>;

export function useResume() {
  return useQuery({
    queryKey: ["resume-data"],
    queryFn: async () => {
      // Fetch from static JSON file in public directory
      const res = await fetch("./resume.json");
      if (!res.ok) throw new Error("Failed to fetch resume data");
      const json = await res.json();
      // We can still use the schema to validate if we want, or just return the json
      // Using schema validation ensures our static JSON is correct
      return api.resume.get.responses[200].parse(json);
    },
    // Data is relatively static, keep it fresh for a long time
    staleTime: 1000 * 60 * 30, // 30 minutes
  });
}

export function useContact() {
  return useMutation({
    mutationFn: async (data: ContactInput) => {
      // Simulate network delay for better UX
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // PERMANENT MOCK for Static Deployment
      console.log("Contact form submitted (Mock):", data);
      return { success: true };
    },
  });
}
