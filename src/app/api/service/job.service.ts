import { BadRequestException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Job } from 'src/db/entity/jobs.entity';
import { Company } from 'src/db/entity/company.entity';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class JobService {
	@InjectRepository(Job)
	private readonly jobRepository: Repository<Job>;

	@InjectRepository(Company)
	private readonly companyRepository: Repository<Company>;

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

		if (auth.role !== Role.Hr) {
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
}