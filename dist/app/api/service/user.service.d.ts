import { CreateUserDtoType } from 'src/app/zod/user.dto';
import { User } from 'src/db/entity/user.entity';
import { Profile } from 'src/db/entity/profile.entity';
import { Application } from 'src/db/entity/application.entity';
import { JwtService } from '@nestjs/jwt';
export declare class UserService {
    private readonly jwtService;
    deleteUser(userId: string): Promise<void>;
    constructor(jwtService: JwtService);
    registerUser(dto: CreateUserDtoType): Promise<User>;
    loginUser(data: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: User;
        profile: Profile;
    }>;
    getUserById(id: string): Promise<User>;
    getProfileByUserId(userId: string): Promise<Profile>;
    updateProfile(userId: string, profileData: Partial<Profile>): Promise<Profile>;
    getUserApplications(userId: string): Promise<Application[]>;
}
