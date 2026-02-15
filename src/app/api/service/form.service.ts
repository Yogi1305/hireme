import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Form } from 'src/db/entity/form.entity';
import { Job } from 'src/db/entity/jobs.entity';
import type { CreateFormDtoType } from 'src/app/zod/form.dto';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class FormService {
  @InjectRepository(Form)
  private readonly formRepository: Repository<Form>;

  @InjectRepository(Job)
  private readonly jobRepository: Repository<Job>;

  async createForm(
    dto: CreateFormDtoType,
    auth: { role?: string; companyId?: string },
  ): Promise<Form> {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }

    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    if (auth.role !== Role.Hr) {
      throw new ForbiddenException('Only HR can create form');
    }

    const job = await this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.Form', 'form')
      .where('job.id = :jobId', { jobId: dto.jobId })
      .getOne();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can create form only for your company jobs');
    }

    if (job.Form) {
      throw new ConflictException('Form already exists for this job');
    }

    const form = this.formRepository.create({
      form: dto.form,
      job,
    });

    return this.formRepository.save(form);
  }
}
