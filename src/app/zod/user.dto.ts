import { z } from 'zod';

export const UserDto = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  role: z.string(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  profileId: z.number().optional(),
});

export type UserDtoType = z.infer<typeof UserDto>;
