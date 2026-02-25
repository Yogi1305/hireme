"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormService = void 0;
const common_1 = require("@nestjs/common");
const form_entity_1 = require("../../../db/entity/form.entity");
const jobs_entity_1 = require("../../../db/entity/jobs.entity");
const Role_1 = require("../../../db/libs/Role");
let FormService = class FormService {
    async createForm(dto, auth) {
        if (!dto) {
            throw new common_1.BadRequestException('Request body is required');
        }
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        if (auth.role !== Role_1.Role.Hr && auth.role !== Role_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Only HR can create form');
        }
        const job = await jobs_entity_1.Job.findOne({
            where: { id: dto.jobId },
            relations: ['company', 'Form'],
        });
        if (!job) {
            throw new common_1.NotFoundException('Job not found');
        }
        if (job.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can create form only for your company jobs');
        }
        if (job.Form) {
            throw new common_1.ConflictException('Form already exists for this job');
        }
        const form = form_entity_1.Form.create({
            form: dto.form,
            job,
        });
        return form.save();
    }
    async getFormByJobId(jobId, auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const form = await form_entity_1.Form.findOne({
            where: { job: { id: jobId } },
            relations: ['job', 'job.company'],
        });
        if (!form) {
            throw new common_1.NotFoundException('Form not found for this job');
        }
        if (form.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only view forms for your company jobs');
        }
        return form;
    }
    async getAllForms(auth) {
        if (!auth?.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const forms = await form_entity_1.Form.find({
            where: { job: { company: { id: auth.companyId } } },
            relations: ['job', 'job.company'],
        });
        return forms;
    }
    async updateForm(formId, dto, auth) {
        const form = await form_entity_1.Form.findOne({ where: { id: formId }, relations: ['job', 'job.company'] });
        if (!form) {
            throw new common_1.NotFoundException('Form not found');
        }
        if (form.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only update forms for your company jobs');
        }
        Object.assign(form, dto);
        return form.save();
    }
    async deleteForm(formId, auth) {
        const form = await form_entity_1.Form.findOne({ where: { id: formId }, relations: ['job', 'job.company'] });
        if (!form) {
            throw new common_1.NotFoundException('Form not found');
        }
        if (form.job?.company?.id !== auth.companyId) {
            throw new common_1.ForbiddenException('You can only delete forms for your company jobs');
        }
        await form.remove();
    }
};
exports.FormService = FormService;
exports.FormService = FormService = __decorate([
    (0, common_1.Injectable)()
], FormService);
//# sourceMappingURL=form.service.js.map