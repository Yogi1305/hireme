import { z } from 'zod';

export const QuestionDto = z.object({
  id: z.string().uuid(),
  questionText: z.string(),
  options: z.array(z.string()),
  correctAnswer: z.string(),
});

export const TestDto = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  jobId: z.string().uuid().optional(),
  questionSet: z.array(QuestionDto),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type TestDtoType = z.infer<typeof TestDto>;

export const CreateTestDto = TestDto.pick({
  title: true,
  description: true,
  jobId: true,
}).extend({
  jobId: z.string().uuid(),
});

export type CreateTestDtoType = z.infer<typeof CreateTestDto>;

export const AddQuestionToTestDto = z.object({
  questionText: z.string().min(1),
  options: z.array(z.string()).min(2),
  correctAnswer: z.string().min(1),
});

export type AddQuestionToTestDtoType = z.infer<typeof AddQuestionToTestDto>;
