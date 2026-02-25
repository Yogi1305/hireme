import { z } from 'zod';
export declare const CreateUserDto: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    role: z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        admin: "admin";
        user: "user";
        hr: "hr";
        interviewer: "interviewer";
    }>>>;
}, z.core.$strip>;
export type CreateUserDtoType = z.infer<typeof CreateUserDto>;
export declare const UpdateUserDto: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodEnum<{
        admin: "admin";
        user: "user";
        hr: "hr";
        interviewer: "interviewer";
    }>>>>;
}, z.core.$strip>;
export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;
export declare const LoginUserDto: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type LoginUserDtoType = z.infer<typeof LoginUserDto>;
export declare const UserResponseDto: z.ZodObject<{
    id: z.ZodNumber;
    name: z.ZodString;
    email: z.ZodString;
    role: z.ZodEnum<{
        admin: "admin";
        user: "user";
        hr: "hr";
        interviewer: "interviewer";
    }>;
    refreshToken: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
    profileId: z.ZodOptional<z.ZodNullable<z.ZodNumber>>;
}, z.core.$strip>;
export type UserResponseDtoType = z.infer<typeof UserResponseDto>;
