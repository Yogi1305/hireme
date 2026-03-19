import { Body, Controller, Delete, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { HrCompanyGuard } from 'src/app/guard/hr-company.guard';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
import { JobService } from '../service/job.service';
import { Company } from 'src/db/entity/company.entity';

@Controller('jobs')
export class JobController {
	constructor(
		private readonly jobService: JobService,
		private readonly jwtService: JwtService,
	) {}

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
		const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
		const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
		const jobs = await this.jobService.getAllJobs(auth, page, limit);
		return { message: 'Jobs retrieved successfully', data: jobs };
	}
     
	@Get('browse')
	async browseAllCompaniesWithJobs(@Req() req: Request) {
		const page = req.query.page ? parseInt(req.query.page as string, 10) : 1;
		const limit = req.query.limit ? parseInt(req.query.limit as string, 10) : 10;
		const userId = this.getOptionalUserId(req);
		const data = await this.jobService.getAllCompaniesWithJobs(page, limit, userId);
		return { message: 'Companies and jobs retrieved successfully', data };
	}

	private getOptionalUserId(req: Request): string | undefined {
		const authHeader = req.headers['authorization'];
		const tokenFromHeader =
			typeof authHeader === 'string' && authHeader.startsWith('Bearer ')
				? authHeader.split(' ')[1]
				: undefined;
		const tokenFromCookie = (req as any).cookies?.access_token as string | undefined;
		const token = tokenFromHeader || tokenFromCookie;

		if (!token) {
			return undefined;
		}

		try {
			const payload = this.jwtService.verify(token) as { id?: string };
			return payload?.id;
		} catch {
			return undefined;
		}
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

	@UseGuards(JwtAuthGuard)
	@Delete(':jobId')
	async deleteJob(@Req() req: Request) {
		const jobIdParam = req.params.jobId;
		const jobId = Array.isArray(jobIdParam) ? jobIdParam[0] : jobIdParam;
		const auth = {
			companyId: (req as any).user?.companyId as string | undefined,
		};
		await this.jobService.deleteJob(jobId, auth);
		return { message: 'Job deleted successfully' };
	}	
}