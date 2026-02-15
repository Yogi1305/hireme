import { ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Company } from 'src/db/entity/company.entity';
import type { CreateCompanyDtoType } from 'src/app/zod/company.dto';
import { Role } from 'src/db/libs/Role';
import { Employee } from 'src/db/entity/employee.entity';
import { Job } from 'src/db/entity/jobs.entity';
import { Form } from 'src/db/entity/form.entity';
import { Test } from 'src/db/entity/test.entity';
import { Application } from 'src/db/entity/application.entity';

@Injectable()
export class CompanyOwnerService {
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>;

    @InjectRepository(Employee)
    private readonly employeeRepository: Repository<Employee>;

    @InjectRepository(Job)
    private readonly jobRepository: Repository<Job>;

    @InjectRepository(Form)
    private readonly formRepository: Repository<Form>;

    @InjectRepository(Test)
    private readonly testRepository: Repository<Test>;

    @InjectRepository(Application)
    private readonly applicationRepository: Repository<Application>;

    constructor(private readonly jwtService: JwtService) {}

    async createCompany(dto: CreateCompanyDtoType): Promise<Omit<Company, 'password' | 'refreshToken'>> {
        const existingCompany = await this.companyRepository.findOne({
            where: { email: dto.email },
        });

        if (existingCompany) {
            throw new ConflictException('Company email already registered');
        }

        const hashedPassword = await bcrypt.hash(dto.password, 10);
        const company = this.companyRepository.create({
            ...dto,
            password: hashedPassword,
            website: dto.website ?? null,
            phone: dto.phone ?? null,
        });

        const savedCompany = await this.companyRepository.save(company);
        const safeCompany = { ...savedCompany } as Partial<Company>;
        delete safeCompany.password;
        delete safeCompany.refreshToken;
        return safeCompany as Omit<Company, 'password' | 'refreshToken'>;
    }

    async loginCompany(data: {
        email: string;
        password: string;
    }): Promise<{ access_token: string; company: Omit<Company, 'password' | 'refreshToken'> }> {
        const { email, password } = data;

        const company = await this.companyRepository.findOne({ where: { email } });
        if (!company) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const payload = {
            id: company.id,
            role: Role.ADMIN,
            companyCode: company.companyCode,
            companyId: company.id,
        };
        const access_token = this.jwtService.sign(payload);
        const safeCompany = { ...company } as Partial<Company>;
        delete safeCompany.password;
        delete safeCompany.refreshToken;

        return {
            access_token,
            company: safeCompany as Omit<Company, 'password' | 'refreshToken'>,
        };
    }

    async getCompanyEmployees(companyId?: string): Promise<Array<Omit<Employee, 'password'>>> {
        if (!companyId) {
            throw new UnauthorizedException('Company ID not found in token');
        }

        const employees = await this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoin('employee.company', 'company')
            .where('company.id = :companyId', { companyId })
            .getMany();

        return employees.map((employee) => {
            const safeEmployee = { ...employee } as Partial<Employee>;
            delete safeEmployee.password;
            return safeEmployee as Omit<Employee, 'password'>;
        });
    }

    async updateEmployeeRole(
        companyId: string | undefined,
        requesterRole: string | undefined,
        employeeId: string,
        role: Role,
    ): Promise<Omit<Employee, 'password'>> {
        if (!companyId) {
            throw new UnauthorizedException('Company ID not found in token');
        }

        if (requesterRole !== Role.ADMIN) {
            throw new ForbiddenException('Only admin can update employee role');
        }

        const employee = await this.employeeRepository
            .createQueryBuilder('employee')
            .leftJoinAndSelect('employee.company', 'company')
            .where('employee.id = :employeeId', { employeeId })
            .getOne();

        if (!employee) {
            throw new NotFoundException('Employee not found');
        }

        if (employee.company?.id !== companyId) {
            throw new ForbiddenException('You can update roles only in your company');
        }

        employee.role = role;
        const updatedEmployee = await this.employeeRepository.save(employee);

        const safeEmployee = { ...updatedEmployee } as Partial<Employee>;
        delete safeEmployee.password;
        return safeEmployee as Omit<Employee, 'password'>;
    }

    async getAllJobsWithFormsAndTests(companyId?: string): Promise<any[]> {
        if (!companyId) {
            throw new UnauthorizedException('Company ID not found in token');
        }

        const jobs = await this.jobRepository
            .createQueryBuilder('job')
            .where('job.companyId = :companyId', { companyId })
            .getMany();

        const jobIds = jobs.map(job => job.id);

        if (jobIds.length === 0) {
            return [];
        }

        const forms = await this.formRepository
            .createQueryBuilder('form')
            .leftJoinAndSelect('form.job', 'job')
            .where('job.id IN (:...jobIds)', { jobIds })
            .getMany();

        const tests = await this.testRepository
            .createQueryBuilder('test')
            .leftJoinAndSelect('test.job', 'job')
            .where('job.id IN (:...jobIds)', { jobIds })
            .getMany();

        const formMap = new Map(forms.map(f => [f.job?.id, f]));
        const testMap = new Map(tests.map(t => [t.job?.id, t]));

        // Get application counts for each job
        const applicationCounts = await this.applicationRepository
            .createQueryBuilder('application')
            .leftJoin('application.job', 'job')
            .select('job.id', 'jobId')
            .addSelect('COUNT(application.id)', 'count')
            .addSelect('SUM(CASE WHEN application.status = :pending THEN 1 ELSE 0 END)', 'pendingCount')
            .addSelect('SUM(CASE WHEN application.status = :accepted THEN 1 ELSE 0 END)', 'acceptedCount')
            .addSelect('SUM(CASE WHEN application.status = :rejected THEN 1 ELSE 0 END)', 'rejectedCount')
            .where('job.id IN (:...jobIds)', { jobIds })
            .setParameters({ pending: 'pending', accepted: 'accepted', rejected: 'rejected' })
            .groupBy('job.id')
            .getRawMany();

        const applicationMap = new Map(applicationCounts.map(a => [a.jobId, {
            total: parseInt(a.count) || 0,
            pending: parseInt(a.pendingCount) || 0,
            accepted: parseInt(a.acceptedCount) || 0,
            rejected: parseInt(a.rejectedCount) || 0,
        }]));

        return jobs.map(job => ({
            ...job,
            form: formMap.get(job.id) || null,
            test: testMap.get(job.id) || null,
            applications: applicationMap.get(job.id) || { total: 0, pending: 0, accepted: 0, rejected: 0 },
        }));
    }
}
