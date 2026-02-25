import { CompanyOwnerService } from '../service/companyowner.service';
import type { Response } from 'express';
import type { Request } from 'express';
import type { CreateCompanyDtoType } from 'src/app/zod/company.dto';
import { Role } from 'src/db/libs/Role';
export declare class CompanyOwnerController {
    private readonly companyOwnerService;
    constructor(companyOwnerService: CompanyOwnerService);
    createCompany(company: CreateCompanyDtoType): Promise<{
        message: string;
        data: Omit<import("../../../db/entity/company.entity").Company, "password" | "refreshToken">;
    }>;
    login(data: {
        email: string;
        password: string;
    }, res: Response): Promise<{
        message: string;
        data: {
            access_token: string;
            company: Omit<import("../../../db/entity/company.entity").Company, "password" | "refreshToken">;
        };
    }>;
    getEmployee(req: Request): Promise<Omit<import("../../../db/entity/employee.entity").Employee, "password">[]>;
    updateEmployeeRole(req: Request, employeeId: string, body: {
        role: Role;
    }): Promise<{
        message: string;
        data: Omit<import("../../../db/entity/employee.entity").Employee, "password">;
    }>;
    getAllJobsWithFormsAndTests(req: Request): Promise<{
        message: string;
        data: any[];
    }>;
    deleteCompany(req: Request): Promise<{
        message: string;
    }>;
}
