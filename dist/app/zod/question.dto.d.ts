import { z } from 'zod';
export declare const QuestionDto: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    questionText: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    correctAnswer: z.ZodString;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type QuestionDtoType = z.infer<typeof QuestionDto>;
export declare const CreateQuestionDto: z.ZodObject<{
    questionText: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    correctAnswer: z.ZodString;
}, z.core.$strip>;
export type CreateQuestionDtoType = z.infer<typeof CreateQuestionDto>;
