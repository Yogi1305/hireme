"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobDto = exports.JobDto = void 0;
const zod_1 = require("zod");
exports.JobDto = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    location: zod_1.z.string(),
    salary: zod_1.z.number(),
    companyId: zod_1.z.string().uuid(),
    jobType: zod_1.z.enum(['remote', 'hybrid', 'onsite']),
    jobCategory: zod_1.z.enum(['fulltime', 'parttime', 'contract', 'intern']),
    duration: zod_1.z.string(),
    lastDateToApply: zod_1.z.coerce.date(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
    testId: zod_1.z.string().uuid().optional(),
    formId: zod_1.z.string().uuid().optional(),
});
exports.CreateJobDto = exports.JobDto.omit({
    id: true,
    companyId: true,
    createdAt: true,
    updatedAt: true,
    testId: true,
    formId: true,
});
//# sourceMappingURL=jobs.dto.js.map