import { z } from 'zod';

export const FormDto = z.object({
  id: z.number().optional(),
  form: z.record(z.string(), z.any()),
  jobId: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type FormDtoType = z.infer<typeof FormDto>;
