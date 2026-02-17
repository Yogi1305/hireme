import { Body, Controller, Get, Param, Patch, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { InterviewerCompanyGuard } from 'src/app/guard/interviewer-company.guard';
import { InterviewerService } from '../service/interviewer.service';

@Controller('interviewer')
@UseGuards(JwtAuthGuard, InterviewerCompanyGuard)
export class InterviewerController {
  constructor(private readonly interviewerService: InterviewerService) {}

  /**
   * Get all applications for a job
   * GET /interviewer/job/:jobId/applications
   */
  @Get('job/:jobId/applications')
  async getApplicationsByJob(@Param('jobId') jobId: string, @Req() req: Request) {
    const auth = {
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const applications = await this.interviewerService.getApplicationsByJob(jobId, auth);
    return { message: 'Applications retrieved successfully', data: applications };
  }

  /**
   * Get single application details
   * GET /interviewer/application/:applicationId
   */
  @Get('application/:applicationId')
  async getApplicationById(@Param('applicationId') applicationId: string, @Req() req: Request) {
    const auth = {
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const application = await this.interviewerService.getApplicationById(applicationId, auth);
    return { message: 'Application retrieved successfully', data: application };
  }

  /**
   * Update application status
   * PATCH /interviewer/application/:applicationId/status
   * Body: { "status": "shortlisted" | "selected" | "rejected" }
   */
  @Patch('application/:applicationId/status')
  async updateApplicationStatus(
    @Param('applicationId') applicationId: string,
    @Body('status') status: string,
    @Req() req: Request,
  ) {
    const auth = {
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const application = await this.interviewerService.updateApplicationStatus(
      applicationId,
      status,
      auth,
    );
    return { message: 'Application status updated successfully', data: application };
  }
}
