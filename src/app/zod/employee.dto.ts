import { z } from 'zod';

export const EmployeeDto = z.object({
  id: z.number().optional(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  role: z.string(),
  companyId: z.number(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
});

export type EmployeeDtoType = z.infer<typeof EmployeeDto>;
