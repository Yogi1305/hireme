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
exports.ApplicationController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_1 = require("../../guard/jwt.auth");
const hr_company_guard_1 = require("../../guard/hr-company.guard");
const application_service_1 = require("../service/application.service");
let ApplicationController = class ApplicationController {
    applicationService;
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    async createApplication(body, req) {
        const auth = {
            userId: req.user?.id,
        };
        const application = await this.applicationService.createApplication(body, auth);
        return { message: 'Application submitted successfully', data: application };
    }
    async getMyApplications(req) {
        const auth = {
            userId: req.user?.id,
        };
        const applications = await this.applicationService.getMyApplications(auth);
        return { message: 'Applications retrieved successfully', data: applications };
    }
    async getApplicationsByJob(jobId, req) {
        const auth = {
            companyId: req.user?.companyId,
        };
        const applications = await this.applicationService.getApplicationsByJob(jobId, auth);
        return { message: 'Applications retrieved successfully', data: applications };
    }
    async getQuestionsByTestId(testId) {
        const questions = await this.applicationService.getQuestionsByTestId(testId);
        return { message: 'Questions retrieved successfully', data: questions };
    }
    async getApplicationById(applicationId, req) {
        const auth = {
            userId: req.user?.id,
            companyId: req.user?.companyId,
        };
        const application = await this.applicationService.getApplicationById(applicationId, auth);
        return { message: 'Application retrieved successfully', data: application };
    }
    async updateApplicationStatus(applicationId, status, notes, req) {
        const auth = {
            companyId: req.user?.companyId,
        };
        const application = await this.applicationService.updateApplicationStatus(applicationId, status, notes, auth);
        return { message: 'Application status updated successfully', data: application };
    }
    async submitTestAnswers(applicationId, testAnswers, req) {
        const auth = {
            userId: req.user?.id,
        };
        const application = await this.applicationService.submitTestAnswers(applicationId, testAnswers, auth);
        return { message: 'Test submitted successfully', data: application };
    }
    async getJobsWithApplicantsByCompany(req) {
        const companyId = req.user?.companyId;
        const result = await this.applicationService.getJobsWithApplicantsByCompany(companyId);
        return { message: 'Jobs with applicants retrieved successfully', data: result };
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Post)('apply'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "createApplication", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('my'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getMyApplications", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('job/:jobId'),
    __param(0, (0, common_1.Param)('jobId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getApplicationsByJob", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('questionset/:testId'),
    __param(0, (0, common_1.Param)('testId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getQuestionsByTestId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)(':applicationId'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getApplicationById", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Patch)(':applicationId/status'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Body)('notes')),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "updateApplicationStatus", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Post)(':applicationId/submit-test'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)('testAnswers')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "submitTestAnswers", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, hr_company_guard_1.HrCompanyGuard),
    (0, common_1.Get)('company/jobs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "getJobsWithApplicantsByCompany", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map