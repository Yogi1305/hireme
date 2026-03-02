import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { HrCompanyGuard } from 'src/app/guard/hr-company.guard';
import type { CreateFormDtoType } from 'src/app/zod/form.dto';
import { FormService } from '../service/form.service';

@Controller('forms')
export class FormController {
  constructor(private readonly formService: FormService) {}

  @UseGuards(JwtAuthGuard, HrCompanyGuard)
  @Post('create')
  async createForm(@Body() body: CreateFormDtoType, @Req() req: Request) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const form = await this.formService.createForm(body, auth);
    return { message: 'Form created successfully', data: form };
  }
  @UseGuards(JwtAuthGuard)
  @Post('getByJobId')
  async getFormByJobId(@Body('jobId') jobId: string, @Req() req: Request) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };
    const form = await this.formService.getFormByJobId(jobId, auth);
    return { message: 'Form retrieved successfully', data: form };
  }
  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllForms(@Req() req: Request) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };
    const forms = await this.formService.getAllForms(auth);
    return { message: 'Forms retrieved successfully', data: forms };
  }

  @UseGuards(JwtAuthGuard, HrCompanyGuard)
  @Post('update')
  async updateForm(@Body('formId') formId: string, @Body() body: Partial<CreateFormDtoType>, @Req() req: Request) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };
    const form = await this.formService.updateForm(formId, body, auth);
    return { message: 'Form updated successfully', data: form };
  }

  @UseGuards(JwtAuthGuard, HrCompanyGuard)
  @Post('delete')
  async deleteForm(@Body('formId') formId: string, @Req() req: Request) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };
    await this.formService.deleteForm(formId, auth);
    return { message: 'Form deleted successfully' };
  }
}
