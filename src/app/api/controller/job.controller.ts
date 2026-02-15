import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { HrCompanyGuard } from 'src/app/guard/hr-company.guard';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
import { JobService } from '../service/job.service';

@Controller('jobs')
export class JobController {
	constructor(private readonly jobService: JobService) {}

	@UseGuards(JwtAuthGuard, HrCompanyGuard)
	@Post('create')
	async createJob(@Body() body: CreateJobDtoType, @Req() req: Request) {
		const auth = {
			role: (req as any).user?.role as string | undefined,
			companyId: (req as any).user?.companyId as string | undefined,
		};

		const job = await this.jobService.createJob(body, auth);
		return { message: 'Job created successfully', data: job };
	}
}