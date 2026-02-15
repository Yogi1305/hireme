import { z } from 'zod';

export const ApplicationDto = z.object({
  id: z.string().uuid().optional(),
  userId: z.string().uuid(),
  jobId: z.string().uuid(),
  formId: z.string().uuid(),
  status: z.string().default('pending'),
  correctedanswers: z.number(),
  totalquestions: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type ApplicationDtoType = z.infer<typeof ApplicationDto>;

export const CreateApplicationDto = z.object({
  jobId: z.string().uuid(),
  formResponse: z.record(z.string(), z.any()),
  testAnswers: z.array(z.object({
    questionId: z.string().uuid(),
    answer: z.string(),
  })).optional(),
});

export type CreateApplicationDtoType = z.infer<typeof CreateApplicationDto>;

