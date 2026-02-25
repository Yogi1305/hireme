import { z } from 'zod';

export const QuestionDto = z.object({
  id: z.string().uuid().optional(),
  questionText: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type QuestionDtoType = z.infer<typeof QuestionDto>;

export const CreateQuestionDto = QuestionDto.pick({
  questionText: true,
  options: true,
  correctAnswer: true,
});

export type CreateQuestionDtoType = z.infer<typeof CreateQuestionDto>;
