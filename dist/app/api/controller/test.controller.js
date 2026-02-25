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
exports.TestController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_1 = require("../../guard/jwt.auth");
const interviewer_company_guard_1 = require("../../guard/interviewer-company.guard");
const test_service_1 = require("../service/test.service");
let TestController = class TestController {
    testService;
    constructor(testService) {
        this.testService = testService;
    }
    async createTest(body, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const test = await this.testService.createTest(body, auth);
        return { message: 'Test created successfully', data: test };
    }
    async addQuestion(testId, body, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const result = await this.testService.addQuestionToTest(testId, body, auth);
        return { message: 'Question added successfully', data: result };
    }
    async getAllTests(req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const tests = await this.testService.getAllTests(auth);
        return { message: 'Tests retrieved successfully', data: tests };
    }
};
exports.TestController = TestController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, interviewer_company_guard_1.InterviewerCompanyGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "createTest", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, interviewer_company_guard_1.InterviewerCompanyGuard),
    (0, common_1.Post)(':testId/questions'),
    __param(0, (0, common_1.Param)('testId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "addQuestion", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TestController.prototype, "getAllTests", null);
exports.TestController = TestController = __decorate([
    (0, common_1.Controller)('tests'),
    __metadata("design:paramtypes", [test_service_1.TestService])
], TestController);
//# sourceMappingURL=test.controller.js.map