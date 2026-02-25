import { z } from 'zod';
export declare const QuestionDto: z.ZodObject<{
    id: z.ZodString;
    questionText: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    correctAnswer: z.ZodString;
}, z.core.$strip>;
export declare const TestDto: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    jobId: z.ZodOptional<z.ZodString>;
    questionSet: z.ZodArray<z.ZodObject<{
        id: z.ZodString;
        questionText: z.ZodString;
        options: z.ZodArray<z.ZodString>;
        correctAnswer: z.ZodString;
    }, z.core.$strip>>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type TestDtoType = z.infer<typeof TestDto>;
export declare const CreateTestDto: z.ZodObject<{
    title: z.ZodString;
    description: z.ZodString;
    jobId: z.ZodString;
}, z.core.$strip>;
export type CreateTestDtoType = z.infer<typeof CreateTestDto>;
export declare const AddQuestionToTestDto: z.ZodObject<{
    questionText: z.ZodString;
    options: z.ZodArray<z.ZodString>;
    correctAnswer: z.ZodString;
}, z.core.$strip>;
export type AddQuestionToTestDtoType = z.infer<typeof AddQuestionToTestDto>;
