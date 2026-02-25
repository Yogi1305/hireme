"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobService = void 0;
const common_1 = require("@nestjs/common");
const pagination_util_1 = require("../util/pagination.util");
const jobs_entity_1 = require("../../../db/entity/jobs.entity");
const company_entity_1 = require("../../../db/entity/company.entity");
const form_entity_1 = require("../../../db/entity/form.entity");
const test_entity_1 = require("../../../db/entity/test.entity");
const Role_1 = require("../../../db/libs/Role");
let JobService = class JobService {
    async createJob(dto, auth) {
        if (!dto) {
            throw new common_1.BadRequestException('Request body is required');
        }
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        if (auth.role !== Role_1.Role.ADMIN && auth.role !== Role_1.Role.Hr) {
            console.log('Unauthorized role:', auth.role);
            throw new common_1.ForbiddenException('Only HR can create jobs');
        }
        const company = await company_entity_1.Company.findOne({ select: ['id'], where: { id: auth.companyId } });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        const job = jobs_entity_1.Job.create({
            title: dto.title,
            description: dto.description,
            location: dto.location,
            salary: dto.salary,
            jobType: dto.jobType,
            jobCategory: dto.jobCategory,
            duration: dto.duration,
            lastDateToApply: dto.lastDateToApply,
            isPublic: false,
            company,
        });
        return job.save();
    }
    async getAllJobs(auth, page = 1, limit = 10) {
        const { skip, take } = (0, pagination_util_1.getPagination)(page, limit);
        return jobs_entity_1.Job.find({ relations: ['company'], skip, take });
    }
    async getAllCompaniesWithJobs(page = 1, limit = 1) {
        const { skip, take } = (0, pagination_util_1.getPagination)(page, limit);
        const companies = await company_entity_1.Company.find();
        const jobs = await jobs_entity_1.Job.createQueryBuilder('job')
            .leftJoinAndSelect('job.company', 'company')
            .getMany();
        const jobIds = jobs.map(j => j.id);
        if (jobIds.length === 0) {
            return companies.map(c => ({
                id: c.id,
                companyName: c.companyName,
                location: c.location,
                industry: c.industry,
                website: c.website,
                jobs: [],
            }));
        }
        const forms = await form_entity_1.Form.createQueryBuilder('form')
            .leftJoinAndSelect('form.job', 'job')
            .where('job.id IN (:...jobIds)', { jobIds })
            .getMany();
        const tests = await test_entity_1.Test.createQueryBuilder('test')
            .leftJoinAndSelect('test.job', 'job')
            .leftJoinAndSelect('test.questionSet', 'questionSet')
            .where('job.id IN (:...jobIds)', { jobIds })
            .getMany();
        const formMap = new Map(forms.map(f => [f.job?.id, f]));
        const testMap = new Map(tests.map(t => [t.job?.id, t]));
        const jobsWithDetails = jobs.map(job => {
            const form = formMap.get(job.id);
            const test = testMap.get(job.id);
            let testWithQuestions = null;
            if (test) {
                const questions = (test.questionSet || []).map(q => ({
                    id: q.id,
                    questionText: q.questionText,
                    options: q.options,
                }));
                testWithQuestions = {
                    id: test.id,
                    title: test.title,
                    description: test.description,
                    questions,
                };
            }
            return {
                id: job.id,
                title: job.title,
                description: job.description,
                location: job.location,
                salary: job.salary,
                jobType: job.jobType,
                jobCategory: job.jobCategory,
                duration: job.duration,
                lastDateToApply: job.lastDateToApply,
                companyId: job.company?.id,
                form: form ? { id: form.id, form: form.form } : null,
                test: testWithQuestions,
            };
        });
        const jobsByCompany = new Map();
        for (const job of jobsWithDetails) {
            const companyId = job.companyId;
            if (!jobsByCompany.has(companyId)) {
                jobsByCompany.set(companyId, []);
            }
            jobsByCompany.get(companyId).push(job);
        }
        return companies.map(company => ({
            id: company.id,
            companyName: company.companyName,
            location: company.location,
            industry: company.industry,
            website: company.website,
            jobs: jobsByCompany.get(company.id) || [],
        }));
    }
    async makeJobPublic(jobId, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const job = await jobs_entity_1.Job.findOne({ where: { id: jobId }, relations: ['company'] });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only update your own company jobs');
        }
        job.isPublic = true;
        return job.save();
    }
    async deleteJob(jobId, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const job = await jobs_entity_1.Job.findOne({ where: { id: jobId }, relations: ['company'] });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only delete your own company jobs');
        }
        await job.remove();
    }
};
exports.JobService = JobService;
exports.JobService = JobService = __decorate([
    (0, common_1.Injectable)()
], JobService);
//# sourceMappingURL=job.service.js.map