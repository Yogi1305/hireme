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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("../../../db/entity/user.entity");
const profile_entity_1 = require("../../../db/entity/profile.entity");
const application_entity_1 = require("../../../db/entity/application.entity");
const Role_1 = require("../../../db/libs/Role");
const bcrypt = __importStar(require("bcryptjs"));
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    jwtService;
    async deleteUser(userId) {
        const user = await user_entity_1.User.findOne({ where: { id: userId } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        await user.remove();
    }
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async registerUser(dto) {
        const existing = await user_entity_1.User.findOne({ where: { email: dto.email } });
        if (existing) {
            throw new common_1.ConflictException('Email already registered');
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const user = user_entity_1.User.create({
            name: dto.name,
            email: dto.email,
            password: hashedPassword,
            role: (dto.role ?? Role_1.Role.USER),
        });
        const savedUser = await user.save();
        const profile = profile_entity_1.Profile.create({
            github: null,
            linkedin: null,
            codingProfiles: null,
            resumes: null,
            primaryResumeIndex: 0,
            skills: null,
            education: [],
            experiences: [],
            user: savedUser,
        });
        await profile.save();
        return savedUser;
    }
    async loginUser(data) {
        const { email, password } = data;
        const user = await user_entity_1.User.findOne({ where: { email } });
        if (!user) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const payload = { id: user.id, role: user.role };
        const access_token = this.jwtService.sign(payload);
        const profile = await this.getProfileByUserId(user.id);
        return { access_token, user, profile };
    }
    async getUserById(id) {
        const user = await user_entity_1.User.findOne({ where: { id } });
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        return user;
    }
    async getProfileByUserId(userId) {
        if (!userId) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        const profile = await profile_entity_1.Profile.findOne({
            where: { user: { id: userId } },
        });
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        return profile;
    }
    async updateProfile(userId, profileData) {
        const profile = await this.getProfileByUserId(userId);
        if (!profile) {
            throw new common_1.NotFoundException('Profile not found');
        }
        if (profileData.skills) {
            profileData.skills = profileData.skills.map(skill => skill.trim());
        }
        if (profileData.resumes) {
        }
        Object.assign(profile, profileData);
        return profile.save();
    }
    async getUserApplications(userId) {
        if (!userId) {
            throw new common_1.UnauthorizedException('Invalid user');
        }
        return application_entity_1.Application.find({
            where: { user: { id: userId } },
            relations: ['job', 'job.company', 'form'],
            order: { createdAt: 'DESC' },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map