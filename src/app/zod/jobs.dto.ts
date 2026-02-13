import { z } from 'zod';

export const JobDto = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  salary: z.number(),
  companyId: z.number(),
  jobType: z.string(),
  jobCategory: z.string(),
  duration: z.string(),
  lastDateToApply: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  testId: z.number().optional(),
  formId: z.number().optional(),
});

export type JobDtoType = z.infer<typeof JobDto>;
