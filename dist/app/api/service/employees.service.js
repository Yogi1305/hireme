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
exports.EmployeesService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const employee_entity_1 = require("../../../db/entity/employee.entity");
const company_entity_1 = require("../../../db/entity/company.entity");
const Role_1 = require("../../../db/libs/Role");
const bcrypt = __importStar(require("bcryptjs"));
let EmployeesService = class EmployeesService {
    jwtService;
    async deleteEmployee(employeeId) {
        const employee = await employee_entity_1.Employee.findOne({ select: ['id'], where: { id: employeeId } });
        if (!employee)
            throw new common_1.NotFoundException('Employee not found');
        await employee.remove();
    }
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async registerEmployee(dto) {
        if (!dto) {
            throw new common_1.BadRequestException('Request body is required');
        }
        const existingEmployee = await employee_entity_1.Employee.findOne({ where: { email: dto.email } });
        if (existingEmployee) {
            throw new common_1.ConflictException('Employee email already registered');
        }
        let company = null;
        if (dto.companyCode) {
            company = await company_entity_1.Company.findOne({ where: { companyCode: dto.companyCode.toUpperCase() } });
            if (!company) {
                throw new common_1.NotFoundException('Company not found for provided company code');
            }
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const employee = employee_entity_1.Employee.create({
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            password: hashedPassword,
            role: dto.role ?? Role_1.Role.USER,
            companyCode: dto.companyCode?.toUpperCase() ?? null,
            company: company ?? undefined,
        });
        const savedEmployee = await employee.save();
        const safeEmployee = { ...savedEmployee };
        delete safeEmployee.password;
        return safeEmployee;
    }
    async loginEmployee(data) {
        if (!data || !data.email || !data.password) {
            throw new common_1.BadRequestException('Email and password are required');
        }
        const employee = await employee_entity_1.Employee.findOne({
            where: { email: data.email },
            relations: ['company'],
        });
        if (!employee || !employee.password) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(data.password, employee.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = {
            id: employee.id,
            role: employee.role,
            companyCode: employee.companyCode ?? employee.company?.companyCode ?? null,
            companyId: employee.company?.id ?? null,
        };
        const access_token = this.jwtService.sign(payload);
        const safeEmployee = { ...employee };
        delete safeEmployee.password;
        return {
            access_token,
            employee: safeEmployee,
        };
    }
    async getEmployeesByCompany(companyId) {
        if (!companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        const company = await company_entity_1.Company.findOne({ where: { id: companyId } });
        if (!company) {
            throw new common_1.NotFoundException('Company not found');
        }
        const employees = await employee_entity_1.Employee.createQueryBuilder('employee')
            .leftJoin('employee.company', 'company')
            .where('company.id = :companyId', { companyId })
            .select([
            'employee.id',
            'employee.name',
            'employee.email',
            'employee.phone',
            'employee.role',
            'employee.companyCode',
            'employee.createdAt',
        ])
            .getMany();
        return employees;
    }
    async getEmployeesByCompanyCode(companyCode) {
        if (!companyCode) {
            throw new common_1.UnauthorizedException('Company code not found in token');
        }
        const employees = await employee_entity_1.Employee.find({
            where: { companyCode: companyCode.toUpperCase() },
            relations: ['company'],
        });
        return employees.map((employee) => {
            const safeEmployee = { ...employee };
            delete safeEmployee.password;
            return safeEmployee;
        });
    }
};
exports.EmployeesService = EmployeesService;
exports.EmployeesService = EmployeesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], EmployeesService);
//# sourceMappingURL=employees.service.js.map