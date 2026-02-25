import { BadRequestException, ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Employee } from 'src/db/entity/employee.entity';
import { Company } from 'src/db/entity/company.entity';
import { Role } from 'src/db/libs/Role';
import type { CreateEmployeeDtoType } from 'src/app/zod/employee.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class EmployeesService {

        async deleteEmployee(employeeId: string): Promise<void> {
            const employee = await Employee.findOne({ select: ['id'], where: { id: employeeId } });
            if (!employee) throw new NotFoundException('Employee not found');
            await employee.remove();
        }

    constructor(private readonly jwtService: JwtService) {}

    async registerEmployee(dto: CreateEmployeeDtoType): Promise<Omit<Employee, 'password'>> {
        if (!dto) {
            throw new BadRequestException('Request body is required');
        }
        const existingEmployee = await Employee.findOne({ where: { email: dto.email } });
        if (existingEmployee) {
            throw new ConflictException('Employee email already registered');
        }
        let company: Company | null = null;
        if (dto.companyCode) {
            company = await Company.findOne({ where: { companyCode: dto.companyCode.toUpperCase() } });
            if (!company) {
                throw new NotFoundException('Company not found for provided company code');
            }
        }
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const employee = Employee.create({
            name: dto.name,
            email: dto.email,
            phone: dto.phone,
            password: hashedPassword,
            role: (dto.role as Role) ?? Role.USER,
            companyCode: dto.companyCode?.toUpperCase() ?? null,
            company: company ?? undefined,
        });
        const savedEmployee = await employee.save();
        const safeEmployee = { ...savedEmployee } as Partial<Employee>;
        delete safeEmployee.password;
        return safeEmployee as Omit<Employee, 'password'>;
    }

    async loginEmployee(
        data: { email: string; password: string },
    ): Promise<{ access_token: string; employee: Omit<Employee, 'password'> }> {
        if (!data || !data.email || !data.password) {
            throw new BadRequestException('Email and password are required');
        }
        const employee = await Employee.findOne({
            where: { email: data.email },
            relations: ['company'],
        });
        if (!employee || !employee.password) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const isMatch = await bcrypt.compare(data.password, employee.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload = {
            id: employee.id,
            role: employee.role,
            companyCode: employee.companyCode ?? employee.company?.companyCode ?? null,
            companyId: employee.company?.id ?? null,
        };
        const access_token = this.jwtService.sign(payload);
        const safeEmployee = { ...employee } as Partial<Employee>;
        delete safeEmployee.password;
        return {
            access_token,
            employee: safeEmployee as Omit<Employee, 'password'>,
        };
    }

    /**
     * Get all employees for the company from the JWT token
     */
    async getEmployeesByCompany(companyId: string): Promise<Omit<Employee, 'password'>[]> {
        if (!companyId) {
            throw new UnauthorizedException('Company ID not found in token');
        }
        const company = await Company.findOne({ where: { id: companyId } });
        if (!company) {
            throw new NotFoundException('Company not found');
        }
        const employees = await Employee.createQueryBuilder('employee')
            .leftJoin('employee.company', 'company')
            .where('company.id = :companyId', { companyId })
            .select([
                'employee.id',
                'employee.name',
                'employee.email',
                'employee.phone',
                'employee.role',
                'employee.companyCode',
                'employee.createdAt',
            ])
            .getMany();
        return employees;
    }

    async getEmployeesByCompanyCode(companyCode?: string): Promise<Array<Omit<Employee, 'password'>>> {
        if (!companyCode) {
            throw new UnauthorizedException('Company code not found in token');
        }
        const employees = await Employee.find({
            where: { companyCode: companyCode.toUpperCase() },
            relations: ['company'],
        });
        return employees.map((employee) => {
            const safeEmployee = { ...employee } as Partial<Employee>;
            delete safeEmployee.password;
            return safeEmployee as Omit<Employee, 'password'>;
        });
    }
}