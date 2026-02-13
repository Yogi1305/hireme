import { z } from 'zod';

export const ApplicationDto = z.object({
  id: z.number().optional(),
  userId: z.number(),
  jobId: z.number(),
  formId: z.number(),
  status: z.string().default('pending'),
  correctedanswers: z.number(),
  totalquestions: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type ApplicationDtoType = z.infer<typeof ApplicationDto>;

