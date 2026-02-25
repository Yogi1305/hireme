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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const service_service_1 = require("../service/service.service");
const user_service_1 = require("../service/user.service");
const jwt_auth_1 = require("../../guard/jwt.auth");
let UserController = class UserController {
    service;
    userService;
    constructor(service, userService) {
        this.service = service;
        this.userService = userService;
    }
    async createUser(user) {
        return this.userService.registerUser(user);
    }
    getProfile(req) {
        const userId = req.user?.id;
        return this.userService.getProfileByUserId(userId);
    }
    async login(data, res) {
        const result = await this.userService.loginUser(data);
        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });
        return { message: 'Login successful', data: result };
    }
    logout(res) {
        res.clearCookie('access_token');
        return { message: 'Logout successful' };
    }
    getMe(req) {
        const userId = req.user?.id;
        return this.userService.getProfileByUserId(userId);
    }
    async updateProfile(req, profileData) {
        const userId = req.user?.id;
        return this.userService.updateProfile(userId, profileData);
    }
    getUserService() {
        return this.service.test();
        ;
    }
    async getUserApplications(req) {
        const userId = req.user?.id;
        return this.userService.getUserApplications(userId);
    }
    async deleteUser(req) {
        const userId = req.user?.id;
        return this.userService.deleteUser(userId);
    }
};
exports.UserController = UserController;
__decorate([
    (0, common_1.Post)("create"),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)("profile"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getProfile", null);
__decorate([
    (0, common_1.Post)("login"),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Post)("logout"),
    __param(0, (0, common_1.Res)({ passthrough: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "logout", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)("me"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getMe", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Post)("profile/update"),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "updateProfile", null);
__decorate([
    (0, common_1.Get)("service"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "getUserService", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Get)("applications"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getUserApplications", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_1.JwtAuthGuard),
    (0, common_1.Delete)("delete"),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "deleteUser", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)("user"),
    __metadata("design:paramtypes", [service_service_1.Service,
        user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map