import { Injectable, NotFoundException, UnauthorizedException, ForbiddenException, BadRequestException } from '@nestjs/common';
import { Application } from 'src/db/entity/application.entity';
import { Job } from 'src/db/entity/jobs.entity';
import { applicationstatus } from 'src/db/libs/Role';

// Allowed status values for interviewers
const INTERVIEWER_ALLOWED_STATUS = [
  applicationstatus.SHORTLISTED,
  applicationstatus.SELECTED,
  applicationstatus.REJECTED,
];

@Injectable()
export class InterviewerService {
  // No repository injection needed for Active Record

  /**
   * Update application status by interviewer
   * Only allows: shortlisted, selected, rejected
   */
  async updateApplicationStatus(
    applicationId: string,
    status: string,
    auth: { companyId?: string },
  ): Promise<Application> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }
    // Validate status is allowed for interviewers
    if (!INTERVIEWER_ALLOWED_STATUS.includes(status as applicationstatus)) {
      throw new BadRequestException(
        `Invalid status. Allowed values: ${INTERVIEWER_ALLOWED_STATUS.join(', ')}`,
      );
    }
    const application = await Application.findOne({
      where: { id: applicationId },
      relations: ['job', 'job.company', 'user'],
    });
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only update applications for your company jobs');
    }
    application.status = status;
    return application.save();
  }

  /**
   * Get all applications for a specific job (interviewer view)
   */
  async getApplicationsByJob(
    jobId: string,
    auth: { companyId?: string },
  ): Promise<Application[]> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }
    const job = await Job.findOne({
      where: { id: jobId },
      relations: ['company'],
    });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only view applications for your company jobs');
    }
    const applications = await Application.find({
      where: { job: { id: jobId } },
      relations: ['user', 'form'],
    });
    return applications;
  }

  /**
   * Get single application details (interviewer view)
   */
  async getApplicationById(
    applicationId: string,
    auth: { companyId?: string },
  ): Promise<Application> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }
    const application = await Application.createQueryBuilder('application')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('application.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('application.form', 'form')
      .where('application.id = :applicationId', { applicationId })
      .getOne();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only view applications for your company jobs');
    }
    return application;
  }
}
