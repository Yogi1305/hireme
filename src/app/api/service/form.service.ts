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

    if (auth.role !== Role.Hr && auth.role !== Role.ADMIN) {
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
  async getFormByJobId(jobId: string, auth: { role?: string; companyId?: string }): Promise<Form> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    const form = await this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .where('job.id = :jobId', { jobId })
      .getOne();

    if (!form) {
      throw new NotFoundException('Form not found for this job');
    }

    if (form.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only view forms for your company jobs');
    }

    return form;
  }

  async getAllForms(auth: { role?: string; companyId?: string }): Promise<Form[]> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    const forms = await this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .where('company.id = :companyId', { companyId: auth.companyId })
      .getMany();

    return forms;
  }
}
