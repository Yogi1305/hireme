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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Company = void 0;
const typeorm_1 = require("typeorm");
const uuid_1 = require("uuid");
const employee_entity_1 = require("./employee.entity");
const Role_1 = require("../libs/Role");
let Company = class Company extends typeorm_1.BaseEntity {
    id;
    companyName;
    email;
    password;
    refreshToken;
    location;
    industry;
    website;
    phone;
    companyCode;
    employees;
    role;
    generateCompanyCode() {
        this.companyCode = (0, uuid_1.v4)().slice(0, 6).toUpperCase();
    }
};
exports.Company = Company;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], Company.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'companyName', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "companyName", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true }),
    __metadata("design:type", String)
], Company.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'refreshToken', type: 'varchar', length: 500, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "refreshToken", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'location', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'industry', type: 'varchar', length: 255, nullable: false }),
    __metadata("design:type", String)
], Company.prototype, "industry", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'website', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "website", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'phone', type: 'varchar', length: 20, nullable: true }),
    __metadata("design:type", Object)
], Company.prototype, "phone", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'companyCode', type: 'varchar', length: 6, unique: true }),
    __metadata("design:type", String)
], Company.prototype, "companyCode", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => employee_entity_1.Employee, (employee) => employee.company),
    __metadata("design:type", Array)
], Company.prototype, "employees", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'role', type: 'enum', enum: Role_1.Role, default: Role_1.Role.ADMIN }),
    __metadata("design:type", String)
], Company.prototype, "role", void 0);
__decorate([
    (0, typeorm_1.BeforeInsert)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Company.prototype, "generateCompanyCode", null);
exports.Company = Company = __decorate([
    (0, typeorm_1.Entity)({ name: 'companies' })
], Company);
//# sourceMappingURL=company.entity.js.map