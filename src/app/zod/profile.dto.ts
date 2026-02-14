import { z } from 'zod';

/* ── Nested schemas ── */

export const EducationSchema = z.object({
  name: z.string().min(1, 'Institution name is required'),
  course: z.string().min(1, 'Course name is required'),
  startDate: z.string().min(1, 'Start date is required'),   // ISO date
  endDate: z.string().min(1, 'End date is required'),       // ISO date
});

export type EducationType = z.infer<typeof EducationSchema>;

export const ExperienceSchema = z.object({
  companyName: z.string().min(1, 'Company name is required'),
  jobType: z.string().min(1, 'Job type is required'),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1, 'Start date is required'),
  endDate: z.string().min(1, 'End date is required'),
  ctc: z.number().min(0, 'CTC must be non-negative'),
});

export type ExperienceType = z.infer<typeof ExperienceSchema>;

/* ── Create profile ── */

export const CreateProfileDto = z.object({
  github: z
    .string()
    .url('Must be a valid URL')
    .max(255)
    .nullable()
    .optional(),
  linkedin: z
    .string()
    .url('Must be a valid URL')
    .max(255)
    .nullable()
    .optional(),
  codingProfiles: z.array(z.string().url()).nullable().optional(),
  resumes: z.array(z.string().url()).nullable().optional(),
  primaryResumeIndex: z.number().int().min(0).nullable().optional().default(0),
  skills: z.array(z.string().min(1)).nullable().optional(),
  education: z.array(EducationSchema).nullable().optional().default([]),
  experiences: z.array(ExperienceSchema).nullable().optional().default([]),
});

export type CreateProfileDtoType = z.infer<typeof CreateProfileDto>;

/* ── Update profile (all fields optional) ── */

export const UpdateProfileDto = CreateProfileDto.partial();

export type UpdateProfileDtoType = z.infer<typeof UpdateProfileDto>;

/* ── Profile response (API output) ── */

export const ProfileResponseDto = z.object({
  id: z.number(),
  github: z.string().nullable(),
  linkedin: z.string().nullable(),
  codingProfiles: z.array(z.string()).nullable(),
  resumes: z.array(z.string()).nullable(),
  primaryResumeIndex: z.number().nullable(),
  skills: z.array(z.string()).nullable(),
  education: z.array(EducationSchema).nullable(),
  experiences: z.array(ExperienceSchema).nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type ProfileResponseDtoType = z.infer<typeof ProfileResponseDto>;
