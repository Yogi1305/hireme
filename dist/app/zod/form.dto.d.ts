import { z } from 'zod';
export declare const FormDto: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    form: z.ZodRecord<z.ZodString, z.ZodAny>;
    jobId: z.ZodOptional<z.ZodString>;
    createdAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
    updatedAt: z.ZodOptional<z.ZodCoercedDate<unknown>>;
}, z.core.$strip>;
export type FormDtoType = z.infer<typeof FormDto>;
export declare const CreateFormDto: z.ZodObject<{
    form: z.ZodRecord<z.ZodString, z.ZodAny>;
    jobId: z.ZodString;
}, z.core.$strip>;
export type CreateFormDtoType = z.infer<typeof CreateFormDto>;
