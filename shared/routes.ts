import { z } from 'zod';
import {
  personalInfo,
  education,
  skills,
  experience,
  projects,
  certifications
} from './schema';

export const api = {
  resume: {
    get: {
      method: 'GET' as const,
      path: '/api/resume',
      responses: {
        200: z.object({
          personalInfo: personalInfo,
          education: z.array(education),
          skills: z.array(skills),
          experience: z.array(experience),
          projects: z.array(projects),
          certifications: z.array(certifications),
        }),
      },
    },
  },
  contact: {
    send: {
      method: 'POST' as const,
      path: '/api/contact',
      input: z.object({
        name: z.string(),
        email: z.string().email(),
        message: z.string(),
      }),
      responses: {
        200: z.object({ success: z.boolean() }),
        400: z.object({ message: z.string() }),
      },
    }
  }
};
