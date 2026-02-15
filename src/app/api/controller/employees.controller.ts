import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import type { Response } from 'express';
import type { Request } from 'express';
import type { CreateEmployeeDtoType } from 'src/app/zod/employee.dto';
import { EmployeesService } from '../service/employees.service';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';

@Controller('employees')
export class EmployeesController {
    constructor(private readonly employeesService: EmployeesService) {}

    @Post('register')
    async register(@Body() employee: CreateEmployeeDtoType) {
        const createdEmployee = await this.employeesService.registerEmployee(employee);
        return { message: 'Employee registered successfully', data: createdEmployee };
    }

    @Post('create')
    async create(@Body() employee: CreateEmployeeDtoType) {
        const createdEmployee = await this.employeesService.registerEmployee(employee);
        return { message: 'Employee registered successfully', data: createdEmployee };
    }

    @Post('login')
    async login(
        @Body() data: { email: string; password: string },
        @Res({ passthrough: true }) res: Response,
    ) {
        const result = await this.employeesService.loginEmployee(data);

        res.cookie('access_token', result.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 24 * 60 * 60 * 1000,
        });

        return { message: 'Login successful', data: result };
    }


}