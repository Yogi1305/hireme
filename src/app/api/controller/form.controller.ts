import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
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
}
