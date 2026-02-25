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
exports.Profile = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let Profile = class Profile extends typeorm_1.BaseEntity {
    id;
    github;
    linkedin;
    codingProfiles;
    resumes;
    primaryResumeIndex;
    skills;
    education;
    experiences;
    user;
};
exports.Profile = Profile;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid', { name: 'id' }),
    __metadata("design:type", String)
], Profile.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'github', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Profile.prototype, "github", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'linkedin', type: 'varchar', length: 255, nullable: true }),
    __metadata("design:type", Object)
], Profile.prototype, "linkedin", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codingProfiles', type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Profile.prototype, "codingProfiles", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'resumes', type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Profile.prototype, "resumes", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'primaryResumeIndex', type: 'int', nullable: true, default: 0 }),
    __metadata("design:type", Object)
], Profile.prototype, "primaryResumeIndex", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'skills', type: 'simple-array', nullable: true }),
    __metadata("design:type", Object)
], Profile.prototype, "skills", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'education', type: 'jsonb', nullable: true, default: '[]' }),
    __metadata("design:type", Object)
], Profile.prototype, "education", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'experiences', type: 'jsonb', nullable: true, default: '[]' }),
    __metadata("design:type", Object)
], Profile.prototype, "experiences", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.User, (user) => user.profile, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'userId' }),
    __metadata("design:type", user_entity_1.User)
], Profile.prototype, "user", void 0);
exports.Profile = Profile = __decorate([
    (0, typeorm_1.Entity)({ name: 'profiles' })
], Profile);
//# sourceMappingURL=profile.entity.js.map