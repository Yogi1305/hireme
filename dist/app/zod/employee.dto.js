"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeResponseDto = exports.UpdateEmployeeDto = exports.CreateEmployeeDto = void 0;
const zod_1 = require("zod");
const RoleValues = ['admin', 'user', 'hr', 'interviewer'];
exports.CreateEmployeeDto = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, 'Name is required')
        .max(255),
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .max(255),
    phone: zod_1.z
        .string()
        .min(1, 'Phone is required')
        .max(20),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255),
    role: zod_1.z.enum(RoleValues).optional().default('user'),
    companyCode: zod_1.z.string().length(6, 'Company code must be 6 characters').optional().nullable(),
    companyId: zod_1.z.string().uuid().optional(),
});
exports.UpdateEmployeeDto = exports.CreateEmployeeDto.partial();
exports.EmployeeResponseDto = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    phone: zod_1.z.string(),
    role: zod_1.z.enum(RoleValues),
    companyCode: zod_1.z.string().nullable(),
    companyId: zod_1.z.string().uuid().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
});
//# sourceMappingURL=employee.dto.js.map