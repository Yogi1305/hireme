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
exports.Application = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const jobs_entity_1 = require("./jobs.entity");
const form_entity_1 = require("./form.entity");
const base_entity_1 = require("./base.entity");
let Application = class Application extends base_entity_1.BaseTimestampEntity {
    id;
    user;
    job;
    form;
    formResponse;
    status;
    correctedanswers;
    incorrectanswers;
    answerDetails;
    totalquestions;
    testAnswered;
    notes;
};
exports.Application = Application;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], Application.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Application.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => jobs_entity_1.Job, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'jobId' }),
    __metadata("design:type", jobs_entity_1.Job)
], Application.prototype, "job", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => form_entity_1.Form, { nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: 'formId' }),
    __metadata("design:type", form_entity_1.Form)
], Application.prototype, "form", void 0);
__decorate([
    (0, typeorm_1.Column)('json', { name: 'formResponse', nullable: true }),
    __metadata("design:type", Object)
], Application.prototype, "formResponse", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status', default: 'pending' }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'correctedanswers', default: '' }),
    __metadata("design:type", Array)
], Application.prototype, "correctedanswers", void 0);
__decorate([
    (0, typeorm_1.Column)('simple-array', { name: 'incorrectanswers', default: '' }),
    __metadata("design:type", Array)
], Application.prototype, "incorrectanswers", void 0);
__decorate([
    (0, typeorm_1.Column)('jsonb', { name: 'answerDetails', nullable: true, default: '[]' }),
    __metadata("design:type", Array)
], Application.prototype, "answerDetails", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'totalquestions', default: 0 }),
    __metadata("design:type", Number)
], Application.prototype, "totalquestions", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'testAnswered', default: false }),
    __metadata("design:type", Boolean)
], Application.prototype, "testAnswered", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'notes', type: 'text', nullable: true }),
    __metadata("design:type", String)
], Application.prototype, "notes", void 0);
exports.Application = Application = __decorate([
    (0, typeorm_1.Entity)({ name: 'applications' })
], Application);
//# sourceMappingURL=application.entity.js.map