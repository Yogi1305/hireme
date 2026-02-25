import { z } from 'zod';
export declare const JobDto: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
    description: z.ZodString;
    location: z.ZodString;
    salary: z.ZodNumber;
    companyId: z.ZodString;
    jobType: z.ZodEnum<{
        remote: "remote";
        hybrid: "hybrid";
        onsite: "onsite";
    }>;
    jobCategory: z.ZodEnum<{
        fulltime: "fulltime";
        parttime: "parttime";
        contract: "contract";
        intern: "intern";
    }>;
    duration: z.ZodString;
    lastDateToApply: z.ZodCoercedDate<unknown>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    testId: z.ZodOptional<z.ZodString>;
    formId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type JobDtoType = z.infer<typeof JobDto>;
export declare const CreateJobDto: z.ZodObject<{
    location: z.ZodString;
    title: z.ZodString;
    description: z.ZodString;
    lastDateToApply: z.ZodCoercedDate<unknown>;
    salary: z.ZodNumber;
    jobType: z.ZodEnum<{
        remote: "remote";
        hybrid: "hybrid";
        onsite: "onsite";
    }>;
    jobCategory: z.ZodEnum<{
        fulltime: "fulltime";
        parttime: "parttime";
        contract: "contract";
        intern: "intern";
    }>;
    duration: z.ZodString;
}, z.core.$strip>;
export type CreateJobDtoType = z.infer<typeof CreateJobDto>;
