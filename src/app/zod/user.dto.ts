import { z } from 'zod';

/** ── Role enum values (kept in sync with db/libs/Role.ts) ── */
const RoleValues = ['admin', 'user', 'hr', 'interviewer'] as const;

/** Schema used when creating a new user (sign-up / admin create). */
export const CreateUserDto = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255, 'Name must be at most 255 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255, 'Email must be at most 255 characters'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(255, 'Password must be at most 255 characters'),
  role: z.enum(RoleValues).optional().default('user'),
});

export type CreateUserDtoType = z.infer<typeof CreateUserDto>;

/** Schema used when updating an existing user. */
export const UpdateUserDto = CreateUserDto.partial();

export type UpdateUserDtoType = z.infer<typeof UpdateUserDto>;

/** Schema for login. */
export const LoginUserDto = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginUserDtoType = z.infer<typeof LoginUserDto>;

/** Full user response (returned from API, never includes password). */
export const UserResponseDto = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(RoleValues),
  refreshToken: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  profileId: z.number().nullable().optional(),
});

export type UserResponseDtoType = z.infer<typeof UserResponseDto>;
