import { z } from 'zod';

export const FormDto = z.object({
  id: z.string().uuid().optional(),
  form: z.record(z.string(), z.any()),
  jobId: z.string().uuid().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type FormDtoType = z.infer<typeof FormDto>;

export const CreateFormDto = FormDto.pick({
  form: true,
  jobId: true,
}).extend({
  jobId: z.string().uuid(),
});

export type CreateFormDtoType = z.infer<typeof CreateFormDto>;
