"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResponseDto = exports.LoginUserDto = exports.UpdateUserDto = exports.CreateUserDto = void 0;
const zod_1 = require("zod");
const RoleValues = ['admin', 'user', 'hr', 'interviewer'];
exports.CreateUserDto = zod_1.z.object({
    name: zod_1.z
        .string()
        .min(1, 'Name is required')
        .max(255, 'Name must be at most 255 characters'),
    email: zod_1.z
        .string()
        .email('Invalid email address')
        .max(255, 'Email must be at most 255 characters'),
    password: zod_1.z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(255, 'Password must be at most 255 characters'),
    role: zod_1.z.enum(RoleValues).optional().default('user'),
});
exports.UpdateUserDto = exports.CreateUserDto.partial();
exports.LoginUserDto = zod_1.z.object({
    email: zod_1.z.string().email('Invalid email address'),
    password: zod_1.z.string().min(1, 'Password is required'),
});
exports.UserResponseDto = zod_1.z.object({
    id: zod_1.z.number(),
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    role: zod_1.z.enum(RoleValues),
    refreshToken: zod_1.z.string().nullable().optional(),
    createdAt: zod_1.z.coerce.date(),
    updatedAt: zod_1.z.coerce.date(),
    profileId: zod_1.z.number().nullable().optional(),
});
//# sourceMappingURL=user.dto.js.map