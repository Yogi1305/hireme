"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HrCompanyGuard = void 0;
const common_1 = require("@nestjs/common");
const Role_1 = require("../../db/libs/Role");
let HrCompanyGuard = class HrCompanyGuard {
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authUser = request.user;
        if (!authUser) {
            throw new common_1.UnauthorizedException('Missing authenticated user');
        }
        if (!authUser.companyId) {
            throw new common_1.UnauthorizedException('Company ID not found in token');
        }
        console.log('Authenticated user:', authUser);
        if (authUser.role !== Role_1.Role.Hr && authUser.role !== Role_1.Role.ADMIN) {
            throw new common_1.ForbiddenException('Only HR or Admin can create jobs');
        }
        return true;
    }
};
exports.HrCompanyGuard = HrCompanyGuard;
exports.HrCompanyGuard = HrCompanyGuard = __decorate([
    (0, common_1.Injectable)()
], HrCompanyGuard);
//# sourceMappingURL=hr-company.guard.js.map