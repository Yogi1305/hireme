"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddQuestionToTestDto = exports.CreateTestDto = exports.TestDto = exports.QuestionDto = void 0;
const zod_1 = require("zod");
exports.QuestionDto = zod_1.z.object({
    id: zod_1.z.string().uuid(),
    questionText: zod_1.z.string(),
    options: zod_1.z.array(zod_1.z.string()),
    correctAnswer: zod_1.z.string(),
});
exports.TestDto = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    title: zod_1.z.string(),
    description: zod_1.z.string(),
    jobId: zod_1.z.string().uuid().optional(),
    questionSet: zod_1.z.array(exports.QuestionDto),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
exports.CreateTestDto = exports.TestDto.pick({
    title: true,
    description: true,
    jobId: true,
}).extend({
    jobId: zod_1.z.string().uuid(),
});
exports.AddQuestionToTestDto = zod_1.z.object({
    questionText: zod_1.z.string().min(1),
    options: zod_1.z.array(zod_1.z.string()).min(2),
    correctAnswer: zod_1.z.string().min(1),
});
//# sourceMappingURL=test.dto.js.map