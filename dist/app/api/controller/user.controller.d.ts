import { Service } from "../service/service.service";
import { UserService } from "../service/user.service";
import type { CreateUserDtoType } from '../../zod/user.dto';
import type { Request } from 'express';
import type { Response } from 'express';
import { Profile } from "src/db/entity/profile.entity";
export declare class UserController {
    private readonly service;
    private readonly userService;
    constructor(service: Service, userService: UserService);
    createUser(user: CreateUserDtoType): Promise<import("../../../db/entity/user.entity").User>;
    getProfile(req: Request): Promise<Profile>;
    login(data: {
        email: string;
        password: string;
    }, res: Response): Promise<{
        message: string;
        data: {
            access_token: string;
            user: import("../../../db/entity/user.entity").User;
            profile: Profile;
        };
    }>;
    logout(res: Response): {
        message: string;
    };
    getMe(req: Request): Promise<Profile>;
    updateProfile(req: Request, profileData: Partial<Profile>): Promise<Profile>;
    getUserService(): string;
    getUserApplications(req: Request): Promise<import("../../../db/entity/application.entity").Application[]>;
    deleteUser(req: Request): Promise<void>;
}
