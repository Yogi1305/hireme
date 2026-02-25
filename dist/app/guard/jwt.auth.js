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
exports.JwtAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
let JwtAuthGuard = class JwtAuthGuard {
    jwtService;
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    getTokenFromCookie(cookieHeader) {
        if (!cookieHeader)
            return null;
        const cookies = cookieHeader.split(';');
        for (const cookie of cookies) {
            const [name, ...valueParts] = cookie.trim().split('=');
            if (name === 'access_token') {
                return decodeURIComponent(valueParts.join('='));
            }
        }
        return null;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const authHeader = request.headers['authorization'];
        const tokenFromHeader = authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null;
        const tokenFromCookie = this.getTokenFromCookie(request.headers['cookie']);
        const token = tokenFromHeader || tokenFromCookie;
        if (!token) {
            throw new common_1.UnauthorizedException('Missing token');
        }
        try {
            const payload = this.jwtService.verify(token);
            if (!payload || !payload.id || !payload.role) {
                throw new common_1.UnauthorizedException('Invalid token payload');
            }
            request.user = {
                id: payload.id,
                role: payload.role,
                companyCode: payload?.companyCode,
                companyId: payload?.companyId,
            };
            return true;
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid or expired token');
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], JwtAuthGuard);
//# sourceMappingURL=jwt.auth.js.map