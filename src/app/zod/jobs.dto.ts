import { z } from 'zod';

export const JobDto = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  location: z.string(),
  salary: z.number(),
  companyId: z.string().uuid(),
  jobType: z.enum(['remote', 'hybrid', 'onsite']),
  jobCategory: z.enum(['fulltime', 'parttime', 'contract', 'intern']),
  duration: z.string(),
  lastDateToApply: z.coerce.date(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  testId: z.string().uuid().optional(),
  formId: z.string().uuid().optional(),
});

export type JobDtoType = z.infer<typeof JobDto>;

export const CreateJobDto = JobDto.omit({
  id: true,
  companyId: true,
  createdAt: true,
  updatedAt: true,
  testId: true,
  formId: true,
});

export type CreateJobDtoType = z.infer<typeof CreateJobDto>;
