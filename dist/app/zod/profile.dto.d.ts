import { z } from 'zod';
export declare const EducationSchema: z.ZodObject<{
    name: z.ZodString;
    course: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
}, z.core.$strip>;
export type EducationType = z.infer<typeof EducationSchema>;
export declare const ExperienceSchema: z.ZodObject<{
    companyName: z.ZodString;
    jobType: z.ZodString;
    location: z.ZodString;
    startDate: z.ZodString;
    endDate: z.ZodString;
    ctc: z.ZodNumber;
}, z.core.$strip>;
export type ExperienceType = z.infer<typeof ExperienceSchema>;
export declare const CreateProfileDto: z.ZodObject<{
    github: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    linkedin: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    codingProfiles: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    resumes: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    primaryResumeIndex: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>;
    skills: z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>;
    education: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        course: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
    }, z.core.$strip>>>>>;
    experiences: z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        companyName: z.ZodString;
        jobType: z.ZodString;
        location: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
        ctc: z.ZodNumber;
    }, z.core.$strip>>>>>;
}, z.core.$strip>;
export type CreateProfileDtoType = z.infer<typeof CreateProfileDto>;
export declare const UpdateProfileDto: z.ZodObject<{
    github: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    linkedin: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    codingProfiles: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>>;
    resumes: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>>;
    primaryResumeIndex: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodNumber>>>>;
    skills: z.ZodOptional<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodString>>>>;
    education: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        course: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
    }, z.core.$strip>>>>>>;
    experiences: z.ZodOptional<z.ZodDefault<z.ZodOptional<z.ZodNullable<z.ZodArray<z.ZodObject<{
        companyName: z.ZodString;
        jobType: z.ZodString;
        location: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
        ctc: z.ZodNumber;
    }, z.core.$strip>>>>>>;
}, z.core.$strip>;
export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>;
export declare const ProfileResponseDto: z.ZodObject<{
    id: z.ZodNumber;
    github: z.ZodNullable<z.ZodString>;
    linkedin: z.ZodNullable<z.ZodString>;
    codingProfiles: z.ZodNullable<z.ZodArray<z.ZodString>>;
    resumes: z.ZodNullable<z.ZodArray<z.ZodString>>;
    primaryResumeIndex: z.ZodNullable<z.ZodNumber>;
    skills: z.ZodNullable<z.ZodArray<z.ZodString>>;
    education: z.ZodNullable<z.ZodArray<z.ZodObject<{
        name: z.ZodString;
        course: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
    }, z.core.$strip>>>;
    experiences: z.ZodNullable<z.ZodArray<z.ZodObject<{
        companyName: z.ZodString;
        jobType: z.ZodString;
        location: z.ZodString;
        startDate: z.ZodString;
        endDate: z.ZodString;
        ctc: z.ZodNumber;
    }, z.core.$strip>>>;
    createdAt: z.ZodCoercedDate<unknown>;
    updatedAt: z.ZodCoercedDate<unknown>;
}, z.core.$strip>;
export type ProfileResponseDtoType = z.infer<typeof ProfileResponseDto>;
