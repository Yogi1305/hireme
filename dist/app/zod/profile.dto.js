"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileResponseDto = exports.UpdateProfileDto = exports.CreateProfileDto = exports.ExperienceSchema = exports.EducationSchema = void 0;
const zod_1 = require("zod");
exports.EducationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, 'Institution name is required'),
    course: zod_1.z.string().min(1, 'Course name is required'),
    startDate: zod_1.z.string().min(1, 'Start date is required'),
    endDate: zod_1.z.string().min(1, 'End date is required'),
});
exports.ExperienceSchema = zod_1.z.object({
    companyName: zod_1.z.string().min(1, 'Company name is required'),
    jobType: zod_1.z.string().min(1, 'Job type is required'),
    location: zod_1.z.string().min(1, 'Location is required'),
    startDate: zod_1.z.string().min(1, 'Start date is required'),
    endDate: zod_1.z.string().min(1, 'End date is required'),
    ctc: zod_1.z.number().min(0, 'CTC must be non-negative'),
});
exports.CreateProfileDto = zod_1.z.object({
    github: zod_1.z
        .string()
        .url('Must be a valid URL')
        .max(255)
        .nullable()
        .optional(),
    linkedin: zod_1.z
        .string()
        .url('Must be a valid URL')
        .max(255)
        .nullable()
        .optional(),
    codingProfiles: zod_1.z.array(zod_1.z.string().url()).nullable().optional(),
    resumes: zod_1.z.array(zod_1.z.string().url()).nullable().optional(),
    primaryResumeIndex: zod_1.z.number().int().min(0).nullable().optional().default(0),
    skills: zod_1.z.array(zod_1.z.string().min(1)).nullable().optional(),
    education: zod_1.z.array(exports.EducationSchema).nullable().optional().default([]),
    experiences: zod_1.z.array(exports.ExperienceSchema).nullable().optional().default([]),
});
exports.UpdateProfileDto = exports.CreateProfileDto.partial();
exports.ProfileResponseDto = zod_1.z.object({
    id: zod_1.z.number(),
    github: zod_1.z.string().nullable(),
    linkedin: zod_1.z.string().nullable(),
    codingProfiles: zod_1.z.array(zod_1.z.string()).nullable(),
    resumes: zod_1.z.array(zod_1.z.string()).nullable(),
    primaryResumeIndex: zod_1.z.number().nullable(),
    skills: zod_1.z.array(zod_1.z.string()).nullable(),
    education: zod_1.z.array(exports.EducationSchema).nullable(),
    experiences: zod_1.z.array(exports.ExperienceSchema).nullable(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
//# sourceMappingURL=profile.dto.js.map