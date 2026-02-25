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
exports.InterviewerController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_1 = require("../../guard/jwt.auth");
const interviewer_company_guard_1 = require("../../guard/interviewer-company.guard");
const interviewer_service_1 = require("../service/interviewer.service");
let InterviewerController = class InterviewerController {
    interviewerService;
    constructor(interviewerService) {
        this.interviewerService = interviewerService;
    }
    async getApplicationsByJob(jobId, req) {
        const auth = {
            companyId: req.user?.companyId,
        };
        const applications = await this.interviewerService.getApplicationsByJob(jobId, auth);
        return { message: 'Applications retrieved successfully', data: applications };
    }
    async getApplicationById(applicationId, req) {
        const auth = {
            companyId: req.user?.companyId,
        };
        const application = await this.interviewerService.getApplicationById(applicationId, auth);
        return { message: 'Application retrieved successfully', data: application };
    }
    async updateApplicationStatus(applicationId, status, req) {
        const auth = {
            companyId: req.user?.companyId,
        };
        const application = await this.interviewerService.updateApplicationStatus(applicationId, status, auth);
        return { message: 'Application status updated successfully', data: application };
    }
};
exports.InterviewerController = InterviewerController;
__decorate([
    (0, common_1.Get)('job/:jobId/applications'),
    __param(0, (0, common_1.Param)('jobId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InterviewerController.prototype, "getApplicationsByJob", null);
__decorate([
    (0, common_1.Get)('application/:applicationId'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InterviewerController.prototype, "getApplicationById", null);
__decorate([
    (0, common_1.Patch)('application/:applicationId/status'),
    __param(0, (0, common_1.Param)('applicationId')),
    __param(1, (0, common_1.Body)('status')),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], InterviewerController.prototype, "updateApplicationStatus", null);
exports.InterviewerController = InterviewerController = __decorate([
    (0, common_1.Controller)('interviewer'),
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, interviewer_company_guard_1.InterviewerCompanyGuard),
    __metadata("design:paramtypes", [interviewer_service_1.InterviewerService])
], InterviewerController);
//# sourceMappingURL=interviewer.controller.js.map