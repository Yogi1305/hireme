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
exports.FormController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_1 = require("../../guard/jwt.auth");
const hr_company_guard_1 = require("../../guard/hr-company.guard");
const form_service_1 = require("../service/form.service");
let FormController = class FormController {
    formService;
    constructor(formService) {
        this.formService = formService;
    }
    async createForm(body, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const form = await this.formService.createForm(body, auth);
        return { message: 'Form created successfully', data: form };
    }
    async getFormByJobId(jobId, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const form = await this.formService.getFormByJobId(jobId, auth);
        return { message: 'Form retrieved successfully', data: form };
    }
    async getAllForms(req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const forms = await this.formService.getAllForms(auth);
        return { message: 'Forms retrieved successfully', data: forms };
    }
    async updateForm(formId, body, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        const form = await this.formService.updateForm(formId, body, auth);
        return { message: 'Form updated successfully', data: form };
    }
    async deleteForm(formId, req) {
        const auth = {
            role: req.user?.role,
            companyId: req.user?.companyId,
        };
        await this.formService.deleteForm(formId, auth);
        return { message: 'Form deleted successfully' };
    }
};
exports.FormController = FormController;
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, hr_company_guard_1.HrCompanyGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "createForm", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Post)('getByJobId'),
    __param(0, (0, common_1.Body)('jobId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "getFormByJobId", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "getAllForms", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, hr_company_guard_1.HrCompanyGuard),
    (0, common_1.Post)('update'),
    __param(0, (0, common_1.Body)('formId')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "updateForm", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard, hr_company_guard_1.HrCompanyGuard),
    (0, common_1.Post)('delete'),
    __param(0, (0, common_1.Body)('formId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], FormController.prototype, "deleteForm", null);
exports.FormController = FormController = __decorate([
    (0, common_1.Controller)('forms'),
    __metadata("design:paramtypes", [form_service_1.FormService])
], FormController);
//# sourceMappingURL=form.controller.js.map