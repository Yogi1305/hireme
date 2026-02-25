"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyResponseDto = exports.UpdateCompanyDto = exports.CreateCompanyDto = void 0;
const zod_1 = require("zod");
exports.CreateCompanyDto = zod_1.z.object({
    companyName: zod_1.z
        .string()
        .min(1, 'Company name is required')
        .max(255, 'Company name must be at most 255 characters'),
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .max(255),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255),
    location: zod_1.z
        .string()
        .min(1, 'Location is required')
        .max(255),
    industry: zod_1.z
        .string()
        .min(1, 'Industry is required')
        .max(255),
    website: zod_1.z.string().url('Must be a valid URL').max(255).nullable().optional(),
    phone: zod_1.z.string().max(20).nullable().optional(),
});
exports.UpdateCompanyDto = exports.CreateCompanyDto.partial();
exports.CompanyResponseDto = zod_1.z.object({
    id: zod_1.z.number(),
    companyName: zod_1.z.string(),
    email: zod_1.z.string().email(),
    location: zod_1.z.string(),
    industry: zod_1.z.string(),
    website: zod_1.z.string().nullable(),
    phone: zod_1.z.string().nullable(),
    companyCode: zod_1.z.string().length(6),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
//# sourceMappingURL=company.dto.js.map