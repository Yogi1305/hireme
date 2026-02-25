import { z } from 'zod';
export declare const CreateCompanyDto: z.ZodObject<{
    companyName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    location: z.ZodString;
    industry: z.ZodString;
    website: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    phone: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export type CreateCompanyDtoType = z.infer<typeof CreateCompanyDto>;
export declare const UpdateCompanyDto: z.ZodObject<{
    companyName: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    location: z.ZodOptional<z.ZodString>;
    industry: z.ZodOptional<z.ZodString>;
    website: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
}, z.core.$strip>;
export type UpdateCompanyDtoType = z.infer<typeof UpdateCompanyDto>;
export declare const CompanyResponseDto: z.ZodObject<{
    id: z.ZodNumber;
    companyName: z.ZodString;
    email: z.ZodString;
    location: z.ZodString;
    industry: z.ZodString;
    website: z.ZodNullable<z.ZodString>;
    phone: z.ZodNullable<z.ZodString>;
    companyCode: z.ZodString;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export type CompanyResponseDtoType = z.infer<typeof CompanyResponseDto>;
