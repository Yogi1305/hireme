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
exports.Job = void 0;
const typeorm_1 = require("typeorm");
const company_entity_1 = require("./company.entity");
const Role_1 = require("../libs/Role");
const test_entity_1 = require("./test.entity");
const form_entity_1 = require("./form.entity");
let Job = class Job extends typeorm_1.BaseEntity {
    id;
    title;
    description;
    location;
    salary;
    company;
    jobType;
    jobCategory;
    duration;
    lastDateToApply;
    isPublic;
    test;
    Form;
};
exports.Job = Job;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Job.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "location", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Job.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => company_entity_1.Company, (company) => company.id),
    (0, typeorm_1.JoinColumn)({ name: 'companyId' }),
    __metadata("design:type", company_entity_1.Company)
], Job.prototype, "company", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: "enum", enum: Role_1.jobmode }),
    __metadata("design:type", String)
], Job.prototype, "jobType", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: Role_1.jobcategory }),
    __metadata("design:type", String)
], Job.prototype, "jobCategory", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Job.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Date)
], Job.prototype, "lastDateToApply", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], Job.prototype, "isPublic", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => test_entity_1.Test, (test) => test.job, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'testId' }),
    __metadata("design:type", test_entity_1.Test)
], Job.prototype, "test", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => form_entity_1.Form, (form) => form.job, { cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: 'formId' }),
    __metadata("design:type", form_entity_1.Form)
], Job.prototype, "Form", void 0);
exports.Job = Job = __decorate([
    (0, typeorm_1.Entity)({ name: 'jobs' }),
    (0, typeorm_1.Index)(['title']),
    (0, typeorm_1.Index)(['company']),
    (0, typeorm_1.Index)(['lastDateToApply'])
], Job);
//# sourceMappingURL=jobs.entity.js.map