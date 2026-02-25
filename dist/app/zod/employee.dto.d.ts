import { z } from 'zod';
export declare const CreateEmployeeDto: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        admin: "admin";
        user: "user";
        hr: "hr";
        interviewer: "interviewer";
    }>>>;
    companyCode: z.ZodNullable<z.ZodOptional<z.ZodString>>;
    companyId: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type CreateEmployeeDtoType = z.infer<typeof CreateEmployeeDto>;
export declare const UpdateEmployeeDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        admin: "admin";
        user: "user";
        hr: "hr";
        interviewer: "interviewer";
    }>>>>;
    companyCode: z.ZodOptional<z.ZodNullable<z.ZodOptional<z.ZodString>>>;
    companyId: z.ZodOptional<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export type UpdateEmployeeDtoType = z.infer<typeof UpdateEmployeeDto>;
export declare const EmployeeResponseDto: z.ZodObject<{
    id: z.ZodString;
    name: z.ZodString;
    email: z.ZodString;
    phone: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        user: "user";
        hr: "hr";
        interviewer: "interviewer";
    }>;
    companyCode: z.ZodNullable<z.ZodString>;
    companyId: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export type EmployeeResponseDtoType = z.infer<typeof EmployeeResponseDto>;
