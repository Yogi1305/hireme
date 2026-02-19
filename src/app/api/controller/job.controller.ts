import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { HrCompanyGuard } from 'src/app/guard/hr-company.guard';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
import { JobService } from '../service/job.service';
import { Company } from 'src/db/entity/company.entity';

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
         console.log('Creating job with auth:', auth);
		const job = await this.jobService.createJob(body, auth);
		return { message: 'Job created successfully', data: job };
	}
	@UseGuards(JwtAuthGuard)
	@Get('all')
	async getAllJobs(@Req() req: Request) {
		const auth = {
			role: (req as any).user?.role as string | undefined,
			companyId: (req as any).user?.companyId as string | undefined,
			Companycode: (req as any).user?.Companycode as string | undefined,
		};
		//  console.log('Getting all jobs with auth:', auth);
		const jobs = await this.jobService.getAllJobs(auth);
		return { message: 'Jobs retrieved successfully', data: jobs };
	}

	@Get('browse')
	async browseAllCompaniesWithJobs() {
		const data = await this.jobService.getAllCompaniesWithJobs();
		return { message: 'Companies and jobs retrieved successfully', data };
	}

	@UseGuards(JwtAuthGuard, HrCompanyGuard)
	@Post(':jobId/public')
	async makeJobPublic(@Req() req: Request) {
		const jobIdParam = req.params.jobId;
		const jobId = Array.isArray(jobIdParam) ? jobIdParam[0] : jobIdParam;
		const auth = {
			companyId: (req as any).user?.companyId as string | undefined,
		};
		const job = await this.jobService.makeJobPublic(jobId, auth);
		return { message: 'Job made public successfully', data: job };
	}
}