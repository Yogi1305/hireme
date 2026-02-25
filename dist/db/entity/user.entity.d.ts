import { BaseEntity } from 'typeorm';
import { Role } from '../libs/Role';
import { Profile } from './profile.entity';
export declare class User extends BaseEntity {
    id: string;
    name: string;
    email: string;
    password: string;
    role: Role;
    refreshToken: string | null;
    profile: Profile;
}
