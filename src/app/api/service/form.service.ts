import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Form } from 'src/db/entity/form.entity';
import { Job } from 'src/db/entity/jobs.entity';
import type { CreateFormDtoType } from 'src/app/zod/form.dto';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class FormService {
  // No repository injection needed for Active Record

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
    const job = await Job.findOne({
      where: { id: dto.jobId },
      relations: ['company', 'Form'],
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can create form only for your company jobs');
    }
    if (job.Form) {
      throw new ConflictException('Form already exists for this job');
    }
    const form = Form.create({
      form: dto.form,
      job,
    });
    return form.save();
  }
  async getFormByJobId(jobId: string, auth: { role?: string; companyId?: string }): Promise<Form> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }
    const form = await Form.findOne({
      where: { job: { id: jobId } },
      relations: ['job', 'job.company'],
    });
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
    const forms = await Form.find({
      where: { job: { company: { id: auth.companyId } } },
      relations: ['job', 'job.company'],
    });
    return forms;
  }

  async updateForm(formId: string, dto: Partial<CreateFormDtoType>, auth: { role?: string; companyId?: string }): Promise<Form> {
    const form = await Form.findOne({ where: { id: formId }, relations: ['job', 'job.company'] });
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    if (form.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only update forms for your company jobs');
    }
    Object.assign(form, dto);
    return form.save();
  }

  async deleteForm(formId: string, auth: { role?: string; companyId?: string }): Promise<void> {
    const form = await Form.findOne({ where: { id: formId }, relations: ['job', 'job.company'] });
    if (!form) {
      throw new NotFoundException('Form not found');
    }
    if (form.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only delete forms for your company jobs');
    }
    await form.remove();
  }
}
