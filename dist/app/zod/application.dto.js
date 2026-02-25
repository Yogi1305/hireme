"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateApplicationStatusDto = exports.CreateApplicationDto = exports.ApplicationDto = void 0;
const zod_1 = require("zod");
exports.ApplicationDto = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    userId: zod_1.z.string().uuid(),
    jobId: zod_1.z.string().uuid(),
    formId: zod_1.z.string().uuid(),
    status: zod_1.z.string().default('pending'),
    correctedanswers: zod_1.z.number(),
    totalquestions: zod_1.z.number(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
exports.CreateApplicationDto = zod_1.z.object({
    jobId: zod_1.z.string().uuid(),
    formResponse: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    testAnswers: zod_1.z.array(zod_1.z.object({
        questionId: zod_1.z.string().uuid(),
        answer: zod_1.z.string(),
    })).optional(),
});
exports.UpdateApplicationStatusDto = zod_1.z.object({
    status: zod_1.z.string(),
    notes: zod_1.z.string().optional(),
});
//# sourceMappingURL=application.dto.js.map