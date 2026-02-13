import { z } from 'zod';

export const CompanyDto = z.object({
  id: z.number().optional(),
  CompanyName: z.string(),
  Location: z.string(),
  Industry: z.string(),
  Website: z.string(),
  Email: z.string().email(),
  Phone: z.string(),
  Roles: z.string(),
  CreatedAt: z.coerce.date().optional(),
  UpdatedAt: z.coerce.date().optional(),
  CompanyCode: z.string().length(6).optional(),
});

export type CompanyDtoType = z.infer<typeof CompanyDto>;
