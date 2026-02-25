"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionService = void 0;
const common_1 = require("@nestjs/common");
const question_entity_1 = require("../../../db/entity/question.entity");
const test_entity_1 = require("../../../db/entity/test.entity");
const Role_1 = require("../../../db/libs/Role");
let QuestionService = class QuestionService {
    async deleteQuestion(questionId) {
        const question = await question_entity_1.Question.findOne({ where: { id: questionId } });
        if (!question)
            throw new common_1.NotFoundException('Question not found');
        await question.remove();
    }
    async updateQuestion(questionId, dto) {
        const question = await question_entity_1.Question.findOne({ where: { id: questionId } });
        if (!question)
            throw new common_1.NotFoundException('Question not found');
        Object.assign(question, dto);
        return question.save();
    }
    async addQuestionToTest(testId, dto, auth) {
        if (!dto) {
            throw new common_1.BadRequestException('Request body is required');
        }
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        if (auth.role !== Role_1.Role.Interviewer && auth.role !== Role_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Only interviewer can add question');
        }
        const test = await test_entity_1.Test.findOne({
            where: { id: testId },
            relations: ['job', 'job.company'],
        });
        if (!test) {
            throw new common_1.NotFoundException('Test not found');
        }
        if (test.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can add question only to your company test');
        }
        if (!dto.options.includes(dto.correctAnswer)) {
            throw new common_1.BadRequestException('Correct answer must be one of the options');
        }
        const question = question_entity_1.Question.create({
            questionText: dto.questionText,
            options: dto.options,
            correctAnswer: dto.correctAnswer,
            test: test,
        });
        const savedQuestion = await question.save();
        const updatedTest = await test_entity_1.Test.findOne({
            where: { id: test.id },
            relations: ['questionSet'],
        });
        return { test: updatedTest, question: savedQuestion };
    }
    async addExistingQuestionToTest(questionId, testId) {
        const question = await question_entity_1.Question.findOne({ where: { id: questionId } });
        if (!question) {
            throw new common_1.NotFoundException('Question not found');
        }
        const test = await test_entity_1.Test.findOne({ where: { id: testId } });
        if (!test) {
            throw new common_1.NotFoundException('Test not found');
        }
        question.test = test;
        return question.save();
    }
};
exports.QuestionService = QuestionService;
exports.QuestionService = QuestionService = __decorate([
    (0, common_1.Injectable)()
], QuestionService);
//# sourceMappingURL=question.service.js.map