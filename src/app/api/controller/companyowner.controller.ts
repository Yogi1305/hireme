import { BadRequestException, Body, Controller, Delete, Get, Param, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CompanyOwnerService } from '../service/companyowner.service';
import type { Response } from 'express';
import type { Request } from 'express';
import type { CreateCompanyDtoType } from 'src/app/zod/company.dto';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { Role } from 'src/db/libs/Role';
@Controller('companyowner')
export class CompanyOwnerController {
    constructor(private readonly companyOwnerService: CompanyOwnerService) {}

    @Post('create')
    async createCompany(@Body() company: CreateCompanyDtoType) {
        const createdCompany = await this.companyOwnerService.createCompany(company);
        return { message: 'Company created successfully', data: createdCompany };
    }

    @Post('login')
    async login(
        @Body() data: { email: string; password: string },
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.companyOwnerService.loginCompany(data);

        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return { message: 'Login successful', data: result };
    }
     
    @UseGuards(JwtAuthGuard)
    @Get('employees')
    async getEmployee(@Req() req: Request) {
         const companyId = (req as any).user?.companyId as string | undefined;
        return this.companyOwnerService.getCompanyEmployees(companyId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch('employees/:employeeId')
    async updateEmployeeRole(
        @Req() req: Request,
        @Param('employeeId') employeeId: string,
        @Body() body: { role: Role },
    ) {
        if (!body?.role) {
            throw new BadRequestException('role is required');
        }

        const companyId = (req as any).user?.companyId as string | undefined;
        const requesterRole = (req as any).user?.role as string | undefined;

        const updatedEmployee = await this.companyOwnerService.updateEmployeeRole(
            companyId,
            requesterRole,
            employeeId,
            body.role,
        );

        return { message: 'Employee role updated successfully', data: updatedEmployee };
    }

    @UseGuards(JwtAuthGuard)
    @Get('jobs')
    async getAllJobsWithFormsAndTests(@Req() req: Request) {
        const companyId = (req as any).user?.companyId as string | undefined;
        const jobs = await this.companyOwnerService.getAllJobsWithFormsAndTests(companyId);
        return { message: 'Jobs retrieved successfully', data: jobs };
    }
    @UseGuards(JwtAuthGuard)
    @Delete('delete')
        async deleteCompany(@Req() req: Request) {
        const companyId = (req as any).user?.companyId as string ;
        await this.companyOwnerService.deleteCompany(companyId);
        return { message: 'Company deleted successfully' };
    }
}