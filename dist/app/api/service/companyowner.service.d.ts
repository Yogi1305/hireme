import { JwtService } from '@nestjs/jwt';
import { Company } from 'src/db/entity/company.entity';
import type { CreateCompanyDtoType } from 'src/app/zod/company.dto';
import { Role } from 'src/db/libs/Role';
import { Employee } from 'src/db/entity/employee.entity';
export declare class CompanyOwnerService {
    private readonly jwtService;
    deleteCompany(companyId: string): Promise<void>;
    constructor(jwtService: JwtService);
    createCompany(dto: CreateCompanyDtoType): Promise<Omit<Company, 'password' | 'refreshToken'>>;
    loginCompany(data: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        company: Omit<Company, 'password' | 'refreshToken'>;
    }>;
    getCompanyEmployees(companyId?: string): Promise<Array<Omit<Employee, 'password'>>>;
    updateEmployeeRole(companyId: string | undefined, requesterRole: string | undefined, employeeId: string, role: Role): Promise<Omit<Employee, 'password'>>;
    getAllJobsWithFormsAndTests(companyId?: string): Promise<any[]>;
}
