import { z } from 'zod';
export declare const ApplicationDto: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    jobId: z.ZodString;
    formId: z.ZodString;
    status: z.ZodDefault<z.ZodString>;
    correctedanswers: z.ZodNumber;
    totalquestions: z.ZodNumber;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type ApplicationDtoType = z.infer<typeof ApplicationDto>;
export declare const CreateApplicationDto: z.ZodObject<{
    jobId: z.ZodString;
    formResponse: z.ZodRecord<z.ZodString, z.ZodAny>;
    testAnswers: z.ZodOptional<z.ZodArray<z.ZodObject<{
        questionId: z.ZodString;
        answer: z.ZodString;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type CreateApplicationDtoType = z.infer<typeof CreateApplicationDto>;
export declare const UpdateApplicationStatusDto: z.ZodObject<{
    status: z.ZodString;
    notes: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateApplicationStatusDtoType = z.infer<typeof UpdateApplicationStatusDto>;
