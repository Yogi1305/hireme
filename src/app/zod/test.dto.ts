import { z } from 'zod';

export const TestDto = z.object({
  id: z.string().uuid().optional(),
  title: z.string(),
  description: z.string(),
  jobId: z.string().uuid().optional(),
  questionSet: z.array(z.string().uuid()),
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
