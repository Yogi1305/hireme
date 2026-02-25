"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TestService = void 0;
const common_1 = require("@nestjs/common");
const test_entity_1 = require("../../../db/entity/test.entity");
const question_entity_1 = require("../../../db/entity/question.entity");
const jobs_entity_1 = require("../../../db/entity/jobs.entity");
const Role_1 = require("../../../db/libs/Role");
let TestService = class TestService {
    async deleteTest(testId) {
        const test = await test_entity_1.Test.findOne({ where: { id: testId } });
        if (!test)
            throw new common_1.NotFoundException('Test not found');
        await test.remove();
    }
    async updateTest(testId, dto) {
        const test = await test_entity_1.Test.findOne({ where: { id: testId } });
        if (!test)
            throw new common_1.NotFoundException('Test not found');
        Object.assign(test, dto);
        return test.save();
    }
    async createTest(dto, auth) {
        if (!dto) {
            throw new common_1.BadRequestException('Request body is required');
        }
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        if (auth.role !== Role_1.Role.Interviewer && auth.role !== Role_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Only interviewer can create test');
        }
        const job = await jobs_entity_1.Job.findOne({
            where: { id: dto.jobId },
            relations: ['company', 'test'],
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can create test only for your company jobs');
        }
        if (job.test) {
            throw new common_1.ConflictException('Test already exists for this job');
        }
        const test = test_entity_1.Test.create({
            title: dto.title,
            description: dto.description,
            questionSet: [],
            job,
        });
        return test.save();
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
    async getTestByJobId(jobId, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const test = await test_entity_1.Test.createQueryBuilder('test')
            .leftJoinAndSelect('test.job', 'job')
            .leftJoinAndSelect('job.company', 'company')
            .where('job.id = :jobId', { jobId })
            .getOne();
        if (!test) {
            throw new common_1.NotFoundException('Test not found for this job');
        }
        if (test.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only view tests for your company jobs');
        }
        return test;
    }
    async getAllTests(auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const tests = await test_entity_1.Test.createQueryBuilder('test')
            .leftJoinAndSelect('test.job', 'job')
            .leftJoinAndSelect('job.company', 'company')
            .where('company.id = :companyId', { companyId: auth.companyId })
            .getMany();
        return tests;
    }
};
exports.TestService = TestService;
exports.TestService = TestService = __decorate([
    (0, common_1.Injectable)()
], TestService);
//# sourceMappingURL=test.service.js.map