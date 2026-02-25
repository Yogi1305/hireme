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
exports.CompanyOwnerController = void 0;
const common_1 = require("@nestjs/common");
const companyowner_service_1 = require("../service/companyowner.service");
const jwt_auth_1 = require("../../guard/jwt.auth");
let CompanyOwnerController = class CompanyOwnerController {
    companyOwnerService;
    constructor(companyOwnerService) {
        this.companyOwnerService = companyOwnerService;
    }
    async createCompany(company) {
        const createdCompany = await this.companyOwnerService.createCompany(company);
        return { message: 'Company created successfully', data: createdCompany };
    }
    async login(data, res) {
        const result = await this.companyOwnerService.loginCompany(data);
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return { message: 'Login successful', data: result };
    }
    async getEmployee(req) {
        const companyId = req.user?.companyId;
        return this.companyOwnerService.getCompanyEmployees(companyId);
    }
    async updateEmployeeRole(req, employeeId, body) {
        if (!body?.role) {
            throw new common_1.BadRequestException('role is required');
        }
        const companyId = req.user?.companyId;
        const requesterRole = req.user?.role;
        const updatedEmployee = await this.companyOwnerService.updateEmployeeRole(companyId, requesterRole, employeeId, body.role);
        return { message: 'Employee role updated successfully', data: updatedEmployee };
    }
    async getAllJobsWithFormsAndTests(req) {
        const companyId = req.user?.companyId;
        const jobs = await this.companyOwnerService.getAllJobsWithFormsAndTests(companyId);
        return { message: 'Jobs retrieved successfully', data: jobs };
    }
    async deleteCompany(req) {
        const companyId = req.user?.companyId;
        await this.companyOwnerService.deleteCompany(companyId);
        return { message: 'Company deleted successfully' };
    }
};
exports.CompanyOwnerController = CompanyOwnerController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyOwnerController.prototype, "createCompany", null);
__decorate([
    (0, common_1.Post)('login'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], CompanyOwnerController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('employees'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyOwnerController.prototype, "getEmployee", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Patch)('employees/:employeeId'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('employeeId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, Object]),
    __metadata("design:returntype", Promise)
], CompanyOwnerController.prototype, "updateEmployeeRole", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)('jobs'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyOwnerController.prototype, "getAllJobsWithFormsAndTests", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyOwnerController.prototype, "deleteCompany", null);
exports.CompanyOwnerController = CompanyOwnerController = __decorate([
    (0, common_1.Controller)('companyowner'),
    __metadata("design:paramtypes", [companyowner_service_1.CompanyOwnerService])
], CompanyOwnerController);
//# sourceMappingURL=companyowner.controller.js.map