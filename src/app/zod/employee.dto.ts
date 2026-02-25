import { z } from 'zod';

const RoleValues = ['admin', 'user', 'hr', 'interviewer'] as const;

/** Schema for creating/inviting an employee. */
export const CreateEmployeeDto = z.object({
  name: z
    .string()
    .min(1, 'Name is required')
    .max(255),
  email: z
    .string()
    .email('Invalid email address')
    .max(255),
  phone: z
    .string()
    .min(1, 'Phone is required')
    .max(20),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(255),
  role: z.enum(RoleValues).optional().default('user'),
  companyCode: z.string().length(6, 'Company code must be 6 characters').optional().nullable(),
  companyId: z.string().uuid().optional(),
});

export type CreateEmployeeDtoType = z.infer<typeof CreateEmployeeDto>;

/** Schema for updating an employee (all fields optional). */
export const UpdateEmployeeDto = CreateEmployeeDto.partial();

export type UpdateEmployeeDtoType = z.infer<typeof UpdateEmployeeDto>;

/** Employee response shape (API output). */
export const EmployeeResponseDto = z.object({
  id: z.string().uuid(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.enum(RoleValues),
  companyCode: z.string().nullable(),
  companyId: z.string().uuid().nullable().optional(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type EmployeeResponseDtoType = z.infer<typeof EmployeeResponseDto>;
