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
exports.QuestionSetController = void 0;
const common_1 = require("@nestjs/common");
const questionset_service_1 = require("../service/questionset.service");
let QuestionSetController = class QuestionSetController {
    questionSetService;
    constructor(questionSetService) {
        this.questionSetService = questionSetService;
    }
    async createSet(setName) {
        return this.questionSetService.createQuestionSet(setName);
    }
    async getAllSets() {
        return this.questionSetService.getAllQuestionSetsWithQuestions();
    }
    async addQuestion(setId, questionData) {
        return this.questionSetService.addQuestionToSet(setId, questionData);
    }
    async deleteQuestion(questionId) {
        await this.questionSetService.deleteQuestionFromSet(questionId);
        return { message: 'Question deleted' };
    }
    async getSet(id) {
        return this.questionSetService.getQuestionSetWithQuestions(id);
    }
};
exports.QuestionSetController = QuestionSetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)('setName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionSetController.prototype, "createSet", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], QuestionSetController.prototype, "getAllSets", null);
__decorate([
    (0, common_1.Post)(':id/question'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuestionSetController.prototype, "addQuestion", null);
__decorate([
    (0, common_1.Delete)('question/:questionId'),
    __param(0, (0, common_1.Param)('questionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionSetController.prototype, "deleteQuestion", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuestionSetController.prototype, "getSet", null);
exports.QuestionSetController = QuestionSetController = __decorate([
    (0, common_1.Controller)('questionset'),
    __metadata("design:paramtypes", [questionset_service_1.QuestionSetService])
], QuestionSetController);
//# sourceMappingURL=questionset.controller.js.map