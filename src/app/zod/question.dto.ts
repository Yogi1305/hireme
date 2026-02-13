import { z } from 'zod';

export const QuestionDto = z.object({
  id: z.number().optional(),
  questionText: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type QuestionDtoType = z.infer<typeof QuestionDto>;
