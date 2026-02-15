import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'src/db/entity/jobs.entity';
import { Company } from 'src/db/entity/company.entity';
import { Form } from 'src/db/entity/form.entity';
import { Test } from 'src/db/entity/test.entity';
import { Question } from 'src/db/entity/question.entity';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class JobService {
	@InjectRepository(Job)
	private readonly jobRepository: Repository<Job>;

	@InjectRepository(Company)
	private readonly companyRepository: Repository<Company>;

	@InjectRepository(Form)
	private readonly formRepository: Repository<Form>;

	@InjectRepository(Test)
	private readonly testRepository: Repository<Test>;

	@InjectRepository(Question)
	private readonly questionRepository: Repository<Question>;

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

		const company = await this.companyRepository.findOne({ where: { id: auth.companyId } });
		if (!company) {
			throw new NotFoundException('Company not found');
		}

		const job = this.jobRepository.create({
			title: dto.title,
			description: dto.description,
			location: dto.location,
			salary: dto.salary,
			jobType: dto.jobType,
			jobCategory: dto.jobCategory,
			duration: dto.duration,
			lastDateToApply: dto.lastDateToApply,
			company,
		});

		return this.jobRepository.save(job);
	}

	async getAllJobs(auth:any): Promise<Job[]> {
		console.log('Getting all jobs with auth:', auth);
		return this.jobRepository.find({ relations: ['company'] });
	}

	// Public endpoint - Get all companies with their jobs, forms, tests, questions
	async getAllCompaniesWithJobs(): Promise<any[]> {
		// Get all companies
		const companies = await this.companyRepository.find();

		// Get all jobs
		const jobs = await this.jobRepository
			.createQueryBuilder('job')
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

		// Get all forms for jobs
		const forms = await this.formRepository
			.createQueryBuilder('form')
			.leftJoinAndSelect('form.job', 'job')
			.where('job.id IN (:...jobIds)', { jobIds })
			.getMany();

		// Get all tests for jobs
		const tests = await this.testRepository
			.createQueryBuilder('test')
			.leftJoinAndSelect('test.job', 'job')
			.where('job.id IN (:...jobIds)', { jobIds })
			.getMany();

		// Get all question IDs from tests
		const allQuestionIds = tests.flatMap(t => t.questionSet || []).filter(id => id);

		// Get all questions (without correct answers)
		let questionsMap = new Map<string, any>();
		if (allQuestionIds.length > 0) {
			const questions = await this.questionRepository
				.createQueryBuilder('question')
				.where('question.id IN (:...questionIds)', { questionIds: allQuestionIds })
				.getMany();

			questionsMap = new Map(questions.map(q => [q.id, {
				id: q.id,
				questionText: q.questionText,
				options: q.options,
				// correctAnswer is NOT included for security
			}]));
		}

		// Create maps for forms and tests
		const formMap = new Map(forms.map(f => [f.job?.id, f]));
		const testMap = new Map(tests.map(t => [t.job?.id, t]));

		// Build jobs with forms and tests
		const jobsWithDetails = jobs.map(job => {
			const form = formMap.get(job.id);
			const test = testMap.get(job.id);

			let testWithQuestions: any = null;
			if (test) {
				const questions = (test.questionSet || []).map(qId => questionsMap.get(qId)).filter(q => q);
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

		// Group jobs by company
		const jobsByCompany = new Map<string, any[]>();
		for (const job of jobsWithDetails) {
			const companyId = job.companyId;
			if (!jobsByCompany.has(companyId)) {
				jobsByCompany.set(companyId, []);
			}
			jobsByCompany.get(companyId)!.push(job);
		}

		// Build final response
		return companies.map(company => ({
			id: company.id,
			companyName: company.companyName,
			location: company.location,
			industry: company.industry,
			website: company.website,
			jobs: jobsByCompany.get(company.id) || [],
		}));
	}
}