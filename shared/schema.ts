import { z } from "zod";

export const personalInfo = z.object({
  name: z.string(),
  title: z.string(),
  bio: z.string(),
  email: z.string(),
  secondaryEmail: z.string().optional(),
  phone: z.string().optional(),
  location: z.string().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  portfolioUrl: z.string().optional(),
});

export const education = z.object({
  school: z.string(),
  degree: z.string(),
  graduationDate: z.string(),
  gpa: z.string().optional(),
  minors: z.string().optional(),
});

export const skills = z.object({
  category: z.string(),
  items: z.union([z.string(), z.array(z.string())]),
});

export const experience = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string().optional(),
  startDate: z.string(),
  endDate: z.string().optional(),
  isCurrent: z.boolean().default(false),
  description: z.union([z.string(), z.array(z.string())]),
});

export const projects = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  date: z.string().optional(),
  description: z.union([z.string(), z.array(z.string())]),
  link: z.string().optional(),
});

export const certifications = z.object({
  name: z.string(),
  date: z.string(),
  issuer: z.string().optional(),
});

// Mock export to keep other files happy without Drizzle
export const insertPersonalInfoSchema = personalInfo;
export const insertEducationSchema = education;
export const insertSkillSchema = skills;
export const insertExperienceSchema = experience;
export const insertProjectSchema = projects;
export const insertCertificationSchema = certifications;

export type PersonalInfo = z.infer<typeof personalInfo>;
export type Education = z.infer<typeof education>;
export type Skill = z.infer<typeof skills>;
export type Experience = z.infer<typeof experience>;
export type Project = z.infer<typeof projects>;
export type Certification = z.infer<typeof certifications>;
