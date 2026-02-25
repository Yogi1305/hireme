import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/db/entity/employee.entity';
import type { CreateEmployeeDtoType } from 'src/app/zod/employee.dto';
export declare class EmployeesService {
    private readonly jwtService;
    deleteEmployee(employeeId: string): Promise<void>;
    constructor(jwtService: JwtService);
    registerEmployee(dto: CreateEmployeeDtoType): Promise<Omit<Employee, 'password'>>;
    loginEmployee(data: {
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        employee: Omit<Employee, 'password'>;
    }>;
    getEmployeesByCompany(companyId: string): Promise<Omit<Employee, 'password'>[]>;
    getEmployeesByCompanyCode(companyCode?: string): Promise<Array<Omit<Employee, 'password'>>>;
}
