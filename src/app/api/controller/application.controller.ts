import { Body, Controller, Get, Param, Patch, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { HrCompanyGuard } from 'src/app/guard/hr-company.guard';
import type { CreateApplicationDtoType } from 'src/app/zod/application.dto';
import { ApplicationService } from '../service/application.service';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('apply')
  async createApplication(@Body() body: CreateApplicationDtoType, @Req() req: Request) {
    const auth = {
      userId: (req as any).user?.id as string | undefined,
    };

    const application = await this.applicationService.createApplication(body, auth);
    return { message: 'Application submitted successfully', data: application };
  }

  @UseGuards(JwtAuthGuard)
  @Get('my')
  async getMyApplications(@Req() req: Request) {
    const auth = {
      userId: (req as any).user?.id as string | undefined,
    };

    const applications = await this.applicationService.getMyApplications(auth);
    return { message: 'Applications retrieved successfully', data: applications };
  }

  @UseGuards(JwtAuthGuard)
  @Get('job/:jobId')
  async getApplicationsByJob(@Param('jobId') jobId: string, @Req() req: Request) {
    const auth = {
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const applications = await this.applicationService.getApplicationsByJob(jobId, auth);
    return { message: 'Applications retrieved successfully', data: applications };
  }

  @UseGuards(JwtAuthGuard)
  @Get('questionset/:testId')
  async getQuestionsByTestId(@Param('testId') testId: string) {
    const questions = await this.applicationService.getQuestionsByTestId(testId);
    return { message: 'Questions retrieved successfully', data: questions };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':applicationId')
  async getApplicationById(@Param('applicationId') applicationId: string, @Req() req: Request) {
    const auth = {
      userId: (req as any).user?.id as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const application = await this.applicationService.getApplicationById(applicationId, auth);
    return { message: 'Application retrieved successfully', data: application };
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':applicationId/status')
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body('status') status: string,
    @Body('notes') notes: string | undefined,
    @Req() req: Request,
  ) {
    const auth = {
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const application = await this.applicationService.updateApplicationStatus(applicationId, status, notes, auth);
    return { message: 'Application status updated successfully', data: application };
  }

  @UseGuards(JwtAuthGuard)
  @Post(':applicationId/submit-test')
  async submitTestAnswers(
    @Param('applicationId') applicationId: string,
    @Body('testAnswers') testAnswers: { questionId: string; answer: string }[],
    @Req() req: Request,
  ) {
    const auth = {
      userId: (req as any).user?.id as string | undefined,
    };

    const application = await this.applicationService.submitTestAnswers(applicationId, testAnswers, auth);
    return { message: 'Test submitted successfully', data: application };
  }

  /**
   * Get all jobs with applicants for the logged-in user's company
   * Only HR or Admin can access this endpoint
   */
  @UseGuards(JwtAuthGuard, HrCompanyGuard)
  @Get('company/jobs')
  async getJobsWithApplicantsByCompany(@Req() req: Request) {
    const companyId = (req as any).user?.companyId as string;
    const result = await this.applicationService.getJobsWithApplicantsByCompany(companyId);
    return { message: 'Jobs with applicants retrieved successfully', data: result };
  }
}
