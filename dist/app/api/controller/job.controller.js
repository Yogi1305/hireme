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
exports.JobController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_1 = require("../../guard/jwt.auth");
const hr_company_guard_1 = require("../../guard/hr-company.guard");
const job_service_1 = require("../service/job.service");
let JobController = class JobController {
    jobService;
    constructor(jobService) {
        this.jobService = jobService;
    }
    async createJob(body, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        console.log('Creating job with auth:', auth);
        const job = await this.jobService.createJob(body, auth);
        return { message: 'Job created successfully', data: job };
    }
    async getAllJobs(req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
            Companycode: req.user?.Companycode,
        };
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        const jobs = await this.jobService.getAllJobs(auth, page, limit);
        return { message: 'Jobs retrieved successfully', data: jobs };
    }
    async browseAllCompaniesWithJobs(req) {
        const page = req.query.page ? parseInt(req.query.page, 10) : 1;
        const limit = req.query.limit ? parseInt(req.query.limit, 10) : 10;
        const data = await this.jobService.getAllCompaniesWithJobs(page, limit);
        return { message: 'Companies and jobs retrieved successfully', data };
    }
    async makeJobPublic(req) {
        const jobIdParam = req.params.jobId;
        const jobId = Array.isArray(jobIdParam) ? jobIdParam[0] : jobIdParam;
        const auth = {
            companyId: req.user?.companyId,
        };
        const job = await this.jobService.makeJobPublic(jobId, auth);
        return { message: 'Job made public successfully', data: job };
    }
    async deleteJob(req) {
        const jobIdParam = req.params.jobId;
        const jobId = Array.isArray(jobIdParam) ? jobIdParam[0] : jobIdParam;
        const auth = {
            companyId: req.user?.companyId,
        };
        await this.jobService.deleteJob(jobId, auth);
        return { message: 'Job deleted successfully' };
    }
};
exports.JobController = JobController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, hr_company_guard_1.HrCompanyGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "createJob", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "getAllJobs", null);
__decorate([
    (0, common_1.Get)('browse'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "browseAllCompaniesWithJobs", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, hr_company_guard_1.HrCompanyGuard),
    (0, common_1.Post)(':jobId/public'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "makeJobPublic", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Delete)(':jobId'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], JobController.prototype, "deleteJob", null);
exports.JobController = JobController = __decorate([
    (0, common_1.Controller)('jobs'),
    __metadata("design:paramtypes", [job_service_1.JobService])
], JobController);
//# sourceMappingURL=job.controller.js.map