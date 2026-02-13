import { z } from 'zod';

export const ProfileDto = z.object({
  id: z.number().optional(),
  github: z.string().nullable().optional(),
  linkedin: z.string().nullable().optional(),
  codingProfile: z.string().nullable().optional(),
  resumeLink: z.string().nullable().optional(),
  userId: z.number().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type ProfileDtoType = z.infer<typeof ProfileDto>;
