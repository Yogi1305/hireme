import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { getPagination } from '../util/pagination.util';
import { Job } from 'src/db/entity/jobs.entity';
import { Company } from 'src/db/entity/company.entity';
import { Form } from 'src/db/entity/form.entity';
import { Test } from 'src/db/entity/test.entity';
import { Question } from 'src/db/entity/question.entity';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class JobService {
	// No repository injection needed for Active Record

	async createJob(
		dto: CreateJobDtoType,
		auth: { role?: string; companyId?: string },
	): Promise<Job> {
		if (!dto) {
			throw new BadRequestException('Request body is required');
		}
		if (!auth?.companyId) {
			throw new UnauthorizedException('Company ID not found in token');
		}
		if (auth.role !== Role.ADMIN && auth.role !== Role.Hr) {
			console.log('Unauthorized role:', auth.role);
			throw new ForbiddenException('Only HR can create jobs');
		}
		const company = await Company.findOne({ select: ['id'], where: { id: auth.companyId } });
		if (!company) {
			throw new NotFoundException('Company not found');
		}
		const job = Job.create({
			title: dto.title,
			description: dto.description,
			location: dto.location,
			salary: dto.salary,
			jobType: dto.jobType,
			jobCategory: dto.jobCategory,
			duration: dto.duration,
			lastDateToApply: dto.lastDateToApply,
			isPublic: false, // New jobs are private by default
			company,
		});
		return job.save();
	}

	async getAllJobs(auth: any, page: number = 1, limit: number = 10): Promise<Job[]> {
		const { skip, take } = getPagination(page, limit);
		return Job.find({ relations: ['company'], skip, take });
	}

	// Public endpoint - Get all companies with their jobs, forms, tests, questions
	async getAllCompaniesWithJobs(page:number=1,limit:number=1): Promise<any[]> {
		const {skip, take} = getPagination(page,limit);
		const companies = await Company.find();
		const jobs = await Job.createQueryBuilder('job')
			.leftJoinAndSelect('job.company', 'company')
			.getMany();
		const jobIds = jobs.map(j => j.id);
		if (jobIds.length === 0) {
			return companies.map(c => ({
				id: c.id,
				companyName: c.companyName,
				location: c.location,
				industry: c.industry,
				website: c.website,
				jobs: [],
			}));
		}
		const forms = await Form.createQueryBuilder('form')
			.leftJoinAndSelect('form.job', 'job')
			.where('job.id IN (:...jobIds)', { jobIds })
			.getMany();
		const tests = await Test.createQueryBuilder('test')
			.leftJoinAndSelect('test.job', 'job')
			.leftJoinAndSelect('test.questionSet', 'questionSet')
			.where('job.id IN (:...jobIds)', { jobIds })
			.getMany();
		const formMap = new Map(forms.map(f => [f.job?.id, f]));
		const testMap = new Map(tests.map(t => [t.job?.id, t]));
		const jobsWithDetails = jobs.map(job => {
			const form = formMap.get(job.id);
			const test = testMap.get(job.id);
			let testWithQuestions: any = null;
			if (test) {
				const questions = (test.questionSet || []).map(q => ({
					id: q.id,
					questionText: q.questionText,
					options: q.options,
				}));
				testWithQuestions = {
					id: test.id,
					title: test.title,
					description: test.description,
					questions,
				};
			}
			return {
				id: job.id,
				title: job.title,
				description: job.description,
				location: job.location,
				salary: job.salary,
				jobType: job.jobType,
				jobCategory: job.jobCategory,
				duration: job.duration,
				lastDateToApply: job.lastDateToApply,
				companyId: job.company?.id,
				form: form ? { id: form.id, form: form.form } : null,
				test: testWithQuestions,
			};
		});
		const jobsByCompany = new Map<string, any[]>();
		for (const job of jobsWithDetails) {
			const companyId = job.companyId;
			if (!jobsByCompany.has(companyId)) {
				jobsByCompany.set(companyId, []);
			}
			jobsByCompany.get(companyId)!.push(job);
		}
		return companies.map(company => ({
			id: company.id,
			companyName: company.companyName,
			location: company.location,
			industry: company.industry,
			website: company.website,
			jobs: jobsByCompany.get(company.id) || [],
		}));
	}

	async makeJobPublic(jobId: string, auth: { companyId?: string }): Promise<Job> {
		if (!auth?.companyId) {
			throw new UnauthorizedException('Company ID not found in token');
		}
		const job = await Job.findOne({ where: { id: jobId }, relations: ['company'] });
		if (!job) {
			throw new NotFoundException('Job not found');
		}
		if (job.company?.id !== auth.companyId) {
			throw new ForbiddenException('You can only update your own company jobs');
		}
		job.isPublic = true;
		return job.save();
	}

	async deleteJob(jobId: string, auth: { companyId?: string }): Promise<void> {
		if (!auth?.companyId) {
			throw new UnauthorizedException('Company ID not found in token');
		}
		const job = await Job.findOne({ where: { id: jobId }, relations: ['company'] });
		if (!job) {
			throw new NotFoundException('Job not found');
		}
		if (job.company?.id !== auth.companyId) {
			throw new ForbiddenException('You can only delete your own company jobs');
		}
		await job.remove();
		
	}
}