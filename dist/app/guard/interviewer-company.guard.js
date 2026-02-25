"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewerCompanyGuard = void 0;
const common_1 = require("@nestjs/common");
const Role_1 = require("../../db/libs/Role");
let InterviewerCompanyGuard = class InterviewerCompanyGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authUser = request.user;
        if (!authUser) {
            throw new common_1.UnauthorizedException('Missing authenticated user');
        }
        if (!authUser.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        if (authUser.role !== Role_1.Role.Interviewer && authUser.role !== Role_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Only interviewer can create test and questions');
        }
        return true;
    }
};
exports.InterviewerCompanyGuard = InterviewerCompanyGuard;
exports.InterviewerCompanyGuard = InterviewerCompanyGuard = __decorate([
    (0, common_1.Injectable)()
], InterviewerCompanyGuard);
//# sourceMappingURL=interviewer-company.guard.js.map