"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateFormDto = exports.FormDto = void 0;
const zod_1 = require("zod");
exports.FormDto = zod_1.z.object({
    id: zod_1.z.string().uuid().optional(),
    form: zod_1.z.record(zod_1.z.string(), zod_1.z.any()),
    jobId: zod_1.z.string().uuid().optional(),
    createdAt: zod_1.z.coerce.date().optional(),
    updatedAt: zod_1.z.coerce.date().optional(),
});
exports.CreateFormDto = exports.FormDto.pick({
    form: true,
    jobId: true,
}).extend({
    jobId: zod_1.z.string().uuid(),
});
//# sourceMappingURL=form.dto.js.map