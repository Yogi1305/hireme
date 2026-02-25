import type { Response } from 'express';
import type { Request } from 'express';
import type { CreateEmployeeDtoType } from 'src/app/zod/employee.dto';
import { EmployeesService } from '../service/employees.service';
export declare class EmployeesController {
    private readonly employeesService;
    constructor(employeesService: EmployeesService);
    register(employee: CreateEmployeeDtoType): Promise<{
        message: string;
        data: Omit<import("../../../db/entity/employee.entity").Employee, "password">;
    }>;
    create(employee: CreateEmployeeDtoType): Promise<{
        message: string;
        data: Omit<import("../../../db/entity/employee.entity").Employee, "password">;
    }>;
    login(data: {
        email: string;
        password: string;
    }, res: Response): Promise<{
        message: string;
        data: {
            access_token: string;
            employee: Omit<import("../../../db/entity/employee.entity").Employee, "password">;
        };
    }>;
    getEmployeesByCompany(req: Request): Promise<{
        message: string;
        data: Omit<import("../../../db/entity/employee.entity").Employee, "password">[];
    }>;
}
