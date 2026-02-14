import { z } from 'zod';

/** Schema for creating a new company (registration). */
export const CreateCompanyDto = z.object({
  companyName: z
    .string()
    .min(1, 'Company name is required')
    .max(255, 'Company name must be at most 255 characters'),
  email: z
    .string()
    .email('Invalid email address')
    .max(255),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(255),
  location: z
    .string()
    .min(1, 'Location is required')
    .max(255),
  industry: z
    .string()
    .min(1, 'Industry is required')
    .max(255),
  website: z.string().url('Must be a valid URL').max(255).nullable().optional(),
  phone: z.string().max(20).nullable().optional(),
});

export type CreateCompanyDtoType = z.infer<typeof CreateCompanyDto>;

/** Schema for updating a company (all fields optional). */
export const UpdateCompanyDto = CreateCompanyDto.partial();

export type UpdateCompanyDtoType = z.infer<typeof UpdateCompanyDto>;

/** Company response shape (API output). */
export const CompanyResponseDto = z.object({
  id: z.number(),
  companyName: z.string(),
  email: z.string().email(),
  location: z.string(),
  industry: z.string(),
  website: z.string().nullable(),
  phone: z.string().nullable(),
  companyCode: z.string().length(6),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});

export type CompanyResponseDtoType = z.infer<typeof CompanyResponseDto>;
