import { z } from 'zod';

export const TestDto = z.object({
  id: z.number().optional(),
  title: z.string(),
  description: z.string(),
  jobId: z.number().optional(),
  questionSet: z.array(z.number()),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type TestDtoType = z.infer<typeof TestDto>;
