"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyOwnerService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = __importStar(require("bcryptjs"));
const company_entity_1 = require("../../../db/entity/company.entity");
const Role_1 = require("../../../db/libs/Role");
const employee_entity_1 = require("../../../db/entity/employee.entity");
const jobs_entity_1 = require("../../../db/entity/jobs.entity");
const form_entity_1 = require("../../../db/entity/form.entity");
const test_entity_1 = require("../../../db/entity/test.entity");
const application_entity_1 = require("../../../db/entity/application.entity");
let CompanyOwnerService = class CompanyOwnerService {
    jwtService;
    async deleteCompany(companyId) {
        const company = await company_entity_1.Company.findOne({ select: ['id'], where: { id: companyId } });
        if (!company)
            throw new common_1.NotFoundException('Company not found');
        await company.remove();
    }
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async createCompany(dto) {
        const existingCompany = await company_entity_1.Company.findOne({ where: { email: dto.email } });
        if (existingCompany) {
            throw new common_1.ConflictException('Company email already registered');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const company = company_entity_1.Company.create({
            ...dto,
            password: hashedPassword,
            website: dto.website ?? null,
            phone: dto.phone ?? null,
        });
        const savedCompany = await company.save();
        const safeCompany = { ...savedCompany };
        delete safeCompany.password;
        delete safeCompany.refreshToken;
        return safeCompany;
    }
    async loginCompany(data) {
        const { email, password } = data;
        const company = await company_entity_1.Company.findOne({ where: { email } });
        if (!company) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            id: company.id,
            role: Role_1.Role.ADMIN,
            companyCode: company.companyCode,
            companyId: company.id,
        };
        const access_token = this.jwtService.sign(payload);
        const safeCompany = { ...company };
        delete safeCompany.password;
        delete safeCompany.refreshToken;
        return {
            access_token,
            company: safeCompany,
        };
    }
    async getCompanyEmployees(companyId) {
        if (!companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const employees = await employee_entity_1.Employee.createQueryBuilder('employee')
            .leftJoin('employee.company', 'company')
            .where('company.id = :companyId', { companyId })
            .getMany();
        return employees.map((employee) => {
            const safeEmployee = { ...employee };
            delete safeEmployee.password;
            return safeEmployee;
        });
    }
    async updateEmployeeRole(companyId, requesterRole, employeeId, role) {
        if (!companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        if (requesterRole !== Role_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Only admin can update employee role');
        }
        const employee = await employee_entity_1.Employee.createQueryBuilder('employee')
            .leftJoinAndSelect('employee.company', 'company')
            .where('employee.id = :employeeId', { employeeId })
            .getOne();
        if (!employee) {
            throw new common_1.NotFoundException('Employee not found');
        }
        if (employee.company?.id !== companyId) {
            throw new common_1.ForbiddenException('You can update roles only in your company');
        }
        employee.role = role;
        const updatedEmployee = await employee.save();
        const safeEmployee = { ...updatedEmployee };
        delete safeEmployee.password;
        return safeEmployee;
    }
    async getAllJobsWithFormsAndTests(companyId) {
        if (!companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const jobs = await jobs_entity_1.Job.createQueryBuilder('job')
            .where('job.companyId = :companyId', { companyId })
            .getMany();
        const jobIds = jobs.map(job => job.id);
        if (jobIds.length === 0) {
            return [];
        }
        const forms = await form_entity_1.Form.createQueryBuilder('form')
            .leftJoinAndSelect('form.job', 'job')
            .where('job.id IN (:...jobIds)', { jobIds })
            .getMany();
        const tests = await test_entity_1.Test.createQueryBuilder('test')
            .leftJoinAndSelect('test.job', 'job')
            .where('job.id IN (:...jobIds)', { jobIds })
            .getMany();
        const formMap = new Map(forms.map(f => [f.job?.id, f]));
        const testMap = new Map(tests.map(t => [t.job?.id, t]));
        const applicationCounts = await application_entity_1.Application.createQueryBuilder('application')
            .leftJoin('application.job', 'job')
            .select('job.id', 'jobId')
            .addSelect('COUNT(application.id)', 'count')
            .addSelect('SUM(CASE WHEN application.status = :pending THEN 1 ELSE 0 END)', 'pendingCount')
            .addSelect('SUM(CASE WHEN application.status = :accepted THEN 1 ELSE 0 END)', 'acceptedCount')
            .addSelect('SUM(CASE WHEN application.status = :rejected THEN 1 ELSE 0 END)', 'rejectedCount')
            .where('job.id IN (:...jobIds)', { jobIds })
            .setParameters({ pending: 'pending', accepted: 'accepted', rejected: 'rejected' })
            .groupBy('job.id')
            .getRawMany();
        const applicationMap = new Map(applicationCounts.map(a => [a.jobId, {
                total: parseInt(a.count) || 0,
                pending: parseInt(a.pendingCount) || 0,
                accepted: parseInt(a.acceptedCount) || 0,
                rejected: parseInt(a.rejectedCount) || 0,
            }]));
        return jobs.map(job => ({
            ...job,
            form: formMap.get(job.id) || null,
            test: testMap.get(job.id) || null,
            applications: applicationMap.get(job.id) || { total: 0, pending: 0, accepted: 0, rejected: 0 },
        }));
    }
};
exports.CompanyOwnerService = CompanyOwnerService;
exports.CompanyOwnerService = CompanyOwnerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], CompanyOwnerService);
//# sourceMappingURL=companyowner.service.js.map