"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateQuestionDto = exports.QuestionDto = void 0;
const zod_1 = require("zod");
exports.QuestionDto = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    questionText: zod_1.z.string(),
    options: zod_1.z.array(zod_1.z.string()),
    correctAnswer: zod_1.z.string(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
exports.CreateQuestionDto = exports.QuestionDto.pick({
    questionText: true,
    options: true,
    correctAnswer: true,
});
//# sourceMappingURL=question.dto.js.map