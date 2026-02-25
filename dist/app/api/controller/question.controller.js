"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_1 = require("../../guard/jwt.auth");
const interviewer_company_guard_1 = require("../../guard/interviewer-company.guard");
const question_service_1 = require("../service/question.service");
let QuestionController = class QuestionController {
    questionService;
    constructor(questionService) {
        this.questionService = questionService;
    }
    async addQuestionToTest(testId, body, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const result = await this.questionService.addQuestionToTest(testId, body, auth);
        return { message: 'Question added successfully', data: result };
    }
    async addExistingQuestionToTest(testId, questionId, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const result = await this.questionService.addExistingQuestionToTest(questionId, testId);
        return { message: 'Existing question added to test', data: result };
    }
    async deleteQuestion(questionId) {
        await this.questionService.deleteQuestion(questionId);
        return { message: 'Question deleted successfully' };
    }
};
exports.QuestionController = QuestionController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, interviewer_company_guard_1.InterviewerCompanyGuard),
    (0, common_1.Post)('tests/:testId/create'),
    __param(0, (0, common_1.Param)('testId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "addQuestionToTest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, interviewer_company_guard_1.InterviewerCompanyGuard),
    (0, common_1.Post)('tests/:testId/add-existing/:questionId'),
    __param(0, (0, common_1.Param)('testId')),
    __param(1, (0, common_1.Param)('questionId')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "addExistingQuestionToTest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, interviewer_company_guard_1.InterviewerCompanyGuard),
    (0, common_1.Delete)(':questionId'),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionController.prototype, "deleteQuestion", null);
exports.QuestionController = QuestionController = __decorate([
    (0, common_1.Controller)('questions'),
    __metadata("design:paramtypes", [question_service_1.QuestionService])
], QuestionController);
//# sourceMappingURL=question.controller.js.map