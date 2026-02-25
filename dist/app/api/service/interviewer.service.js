"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewerService = void 0;
const common_1 = require("@nestjs/common");
const application_entity_1 = require("../../../db/entity/application.entity");
const jobs_entity_1 = require("../../../db/entity/jobs.entity");
const Role_1 = require("../../../db/libs/Role");
const INTERVIEWER_ALLOWED_STATUS = [
    Role_1.applicationstatus.SHORTLISTED,
    Role_1.applicationstatus.SELECTED,
    Role_1.applicationstatus.REJECTED,
];
let InterviewerService = class InterviewerService {
    async updateApplicationStatus(applicationId, status, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        if (!INTERVIEWER_ALLOWED_STATUS.includes(status)) {
            throw new common_1.BadRequestException(`Invalid status. Allowed values: ${INTERVIEWER_ALLOWED_STATUS.join(', ')}`);
        }
        const application = await application_entity_1.Application.findOne({
            where: { id: applicationId },
            relations: ['job', 'job.company', 'user'],
        });
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (application.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only update applications for your company jobs');
        }
        application.status = status;
        return application.save();
    }
    async getApplicationsByJob(jobId, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const job = await jobs_entity_1.Job.findOne({
            where: { id: jobId },
            relations: ['company'],
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only view applications for your company jobs');
        }
        const applications = await application_entity_1.Application.find({
            where: { job: { id: jobId } },
            relations: ['user', 'form'],
        });
        return applications;
    }
    async getApplicationById(applicationId, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const application = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoinAndSelect('application.user', 'user')
            .leftJoinAndSelect('application.job', 'job')
            .leftJoinAndSelect('job.company', 'company')
            .leftJoinAndSelect('application.form', 'form')
            .where('application.id = :applicationId', { applicationId })
            .getOne();
        if (!application) {
            throw new common_1.NotFoundException('Application not found');
        }
        if (application.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only view applications for your company jobs');
        }
        return application;
    }
};
exports.InterviewerService = InterviewerService;
exports.InterviewerService = InterviewerService = __decorate([
    (0, common_1.Injectable)()
], InterviewerService);
//# sourceMappingURL=interviewer.service.js.map