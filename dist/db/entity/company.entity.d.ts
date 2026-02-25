import { BaseEntity } from 'typeorm';
import { Employee } from './employee.entity';
import { Role } from '../libs/Role';
export declare class Company extends BaseEntity {
    id: string;
    companyName: string;
    email: string;
    password: string;
    refreshToken: string | null;
    location: string;
    industry: string;
    website: string | null;
    phone: string | null;
    companyCode: string;
    employees: Employee[];
    role: Role;
    generateCompanyCode(): void;
}
