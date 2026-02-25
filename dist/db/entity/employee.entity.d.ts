import { BaseEntity } from 'typeorm';
import { Company } from './company.entity';
import { Role } from '../libs/Role';
export declare class Employee extends BaseEntity {
    id: string;
    name: string;
    email: string;
    phone: string;
    password: string | null;
    role: Role;
    companyCode: string | null;
    company: Company;
}
