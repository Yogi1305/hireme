import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Application, AnswerRecord } from 'src/db/entity/application.entity';
import { Job } from 'src/db/entity/jobs.entity';
import { Form } from 'src/db/entity/form.entity';
import { Test } from 'src/db/entity/test.entity';
import { Question } from 'src/db/entity/question.entity';
import { User } from 'src/db/entity/user.entity';
import { Company } from 'src/db/entity/company.entity';
import { Profile } from 'src/db/entity/profile.entity';
import type { CreateApplicationDtoType } from 'src/app/zod/application.dto';

@Injectable()
export class ApplicationService {
  async createApplication(
    dto: CreateApplicationDtoType,
    auth: { userId?: string },
  ): Promise<Application> {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }
    if (!auth?.userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    const user = await User.findOne({ where: { id: auth.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const job = await Job.findOne({ where: { id: dto.jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (!job.isPublic) {
      throw new ForbiddenException('Job is not public');
    }
    const now = new Date();
    if (job.lastDateToApply && now > job.lastDateToApply) {
      throw new ConflictException('Job application period has ended');
    }
    const existingApplication = await Application.createQueryBuilder('application')
      .leftJoin('application.user', 'user')
      .leftJoin('application.job', 'job')
      .where('user.id = :userId', { userId: auth.userId })
      .andWhere('job.id = :jobId', { jobId: dto.jobId })
      .getOne();
    if (existingApplication) {
      throw new ConflictException('You have already applied for this job');
    }
    const form = await Form.createQueryBuilder('form')
      .leftJoinAndSelect('form.job', 'job')
      .where('job.id = :jobId', { jobId: dto.jobId })
      .getOne();
    if (!form) {
      throw new NotFoundException('Form not found for this job');
    }
    let correctedAnswerIds: string[] = [];
    let incorrectAnswerIds: string[] = [];
    let answerDetails: AnswerRecord[] = [];
    let totalQuestions = 0;
    let testAnswered = false;
    if (dto.testAnswers && dto.testAnswers.length > 0) {
      const test = await Test.createQueryBuilder('test')
        .leftJoinAndSelect('test.job', 'job')
        .leftJoinAndSelect('test.questionSet', 'questionSet')
        .where('job.id = :jobId', { jobId: dto.jobId })
        .getOne();
      if (test && test.questionSet && test.questionSet.length > 0) {
        totalQuestions = test.questionSet.length;
        testAnswered = true;
        for (const answer of dto.testAnswers) {
          const question = test.questionSet.find(q => q.id === answer.questionId);
          if (question) {
            const isCorrect = question.correctAnswer === answer.answer;
            answerDetails.push({
              questionId: answer.questionId,
              userAnswer: answer.answer,
              correctAnswer: question.correctAnswer,
              isCorrect,
            });
            if (isCorrect) {
              correctedAnswerIds.push(answer.questionId);
            } else {
              incorrectAnswerIds.push(answer.questionId);
            }
          }
        }
      }
    }
    const application = Application.create({
      user,
      job,
      form,
      formResponse: dto.formResponse,
      status: 'pending',
      correctedanswers: correctedAnswerIds,
      incorrectanswers: incorrectAnswerIds,
      answerDetails,
      totalquestions: totalQuestions,
      testAnswered,
    });
    return application.save();
  }

  async getMyApplications(auth: { userId?: string }): Promise<Application[]> {
    if (!auth?.userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    const applications = await Application.createQueryBuilder('application')
      .leftJoinAndSelect('application.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoin('application.user', 'user')
      .where('user.id = :userId', { userId: auth.userId })
      .getMany();
    return applications;
  }

  async getApplicationsByJob(
    jobId: string,
    auth: { companyId?: string },
  ): Promise<Application[]> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }
    const job = await Job.createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .where('job.id = :jobId', { jobId })
      .getOne();
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    if (job.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only view applications for your company jobs');
    }
    const applications = await Application.createQueryBuilder('application')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('application.job', 'job')
      .where('job.id = :jobId', { jobId })
      .getMany();
    return applications.map(app => {
      if (app.user) {
        delete (app.user as any).password;
        delete (app.user as any).refreshToken;
      }
      return app;
    });
  }

  async updateApplicationStatus(
    applicationId: string,
    status: string,
    notes: string | undefined,
    auth: { companyId?: string },
  ): Promise<Application> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }
    const application = await Application.createQueryBuilder('application')
      .leftJoinAndSelect('application.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .where('application.id = :applicationId', { applicationId })
      .getOne();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only update applications for your company jobs');
    }
    application.status = status;
    if (notes !== undefined) {
      application.notes = notes;
    }
    return application.save();
  }

  async getApplicationById(
    applicationId: string,
    auth: { userId?: string; companyId?: string },
  ): Promise<Application> {
    const application = await Application.createQueryBuilder('application')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('application.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('application.form', 'form')
      .where('application.id = :applicationId', { applicationId })
      .getOne();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    const isApplicant = application.user?.id === auth.userId;
    const isCompany = application.job?.company?.id === auth.companyId;
    if (!isApplicant && !isCompany) {
      throw new ForbiddenException('You do not have access to this application');
    }
    if (application.user) {
      delete (application.user as any).password;
      delete (application.user as any).refreshToken;
    }
    return application;
  }

  async getQuestionsByTestId(testId: string): Promise<any[]> {
    const test = await Test.findOne({
      where: { id: testId },
      relations: ['questionSet'],
    });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    if (!test.questionSet || test.questionSet.length === 0) {
      return [];
    }
    return test.questionSet.map(q => ({
      id: q.id,
      questionText: q.questionText,
      options: q.options,
    }));
  }

  async submitTestAnswers(
    applicationId: string,
    testAnswers: { questionId: string; answer: string }[],
    auth: { userId?: string },
  ): Promise<Application> {
    if (!auth?.userId) {
      throw new UnauthorizedException('User ID not found in token');
    }
    const application = await Application.createQueryBuilder('application')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('application.job', 'job')
      .where('application.id = :applicationId', { applicationId })
      .getOne();
    if (!application) {
      throw new NotFoundException('Application not found');
    }
    if (application.user?.id !== auth.userId) {
      throw new ForbiddenException('You can only submit answers for your own application');
    }
    const test = await Test.createQueryBuilder('test')
      .leftJoinAndSelect('test.job', 'job')
      .leftJoinAndSelect('test.questionSet', 'questionSet')
      .where('job.id = :jobId', { jobId: application.job?.id })
      .getOne();
    if (!test) {
      throw new NotFoundException('Test not found for this job');
    }
    const alreadyAnsweredIds = [
      ...(Array.isArray(application.correctedanswers) ? application.correctedanswers : []),
      ...(Array.isArray(application.incorrectanswers) ? application.incorrectanswers : [])
    ];
    const duplicate = testAnswers.find(ans => alreadyAnsweredIds.includes(ans.questionId));
    if (duplicate) {
      throw new ConflictException(`Question ${duplicate.questionId} has already been answered`);
    }
    for (const answer of testAnswers) {
      const alreadyAnswered = application.answerDetails?.some(
        (a) => a.questionId === answer.questionId
      );
      if (alreadyAnswered) {
        throw new ConflictException(`Question ${answer.questionId} has already been answered`);
      }
      const question = test.questionSet.find(q => q.id === answer.questionId);
      if (question) {
        const isCorrect = question.correctAnswer === answer.answer;
        application.answerDetails.push({
          questionId: answer.questionId,
          userAnswer: answer.answer,
          correctAnswer: question.correctAnswer,
          isCorrect,
        });
        if (isCorrect) {
          application.correctedanswers.push(answer.questionId);
        } else {
          application.incorrectanswers.push(answer.questionId);
        }
      }
    }
    application.totalquestions = test.questionSet.length;
    application.testAnswered = true;
    return application.save();
  }

  async getJobsWithApplicantsByCompany(companyId: string): Promise<{ jobs: any[] }> {
    if (!companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }
    const company = await Company.findOne({ where: { id: companyId } });
    if (!company) {
      throw new NotFoundException('Company not found');
    }
    const jobs = await Job.createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.test', 'test')
      .leftJoinAndSelect('job.Form', 'form')
      .where('company.id = :companyId', { companyId: company.id })
      .getMany();
    const jobsWithApplicants = await Promise.all(
      jobs.map(async (job) => {
        const applications = await Application.createQueryBuilder('application')
          .leftJoinAndSelect('application.user', 'user')
          .leftJoinAndSelect('application.form', 'form')
          .where('application.jobId = :jobId', { jobId: job.id })
          .select([
            'application.id',
            'application.status',
            'application.formResponse',
            'application.correctedanswers',
            'application.incorrectanswers',
            'application.totalquestions',
            'application.testAnswered',
            'application.createdAt',
            'user.id',
            'user.name',
            'user.email',
          ])
          .getMany();
        const applicantsWithProfiles = await Promise.all(
          applications.map(async (app) => {
            let profile: Profile | null = null;
            if (app.user?.id) {
              profile = await Profile.createQueryBuilder('profile')
                .leftJoin('profile.user', 'user')
                .where('user.id = :userId', { userId: app.user.id })
                .select(['profile.github', 'profile.linkedin', 'profile.skills', 'profile.resumes'])
                .getOne();
            }
            return {
              applicationId: app.id,
              status: app.status,
              formResponse: app.formResponse,
              testScore: app.testAnswered
                ? `${app.correctedanswers?.length || 0}/${app.totalquestions}`
                : 'Not taken',
              correctAnswers: app.correctedanswers?.length || 0,
              incorrectAnswers: app.incorrectanswers?.length || 0,
              appliedAt: app.createdAt,
              user: app.user
                ? {
                    id: app.user.id,
                    name: app.user.name,
                    email: app.user.email,
                    profile,
                  }
                : null,
            };
          })
        );
        return {
          ...job,
          applicantCount: applications.length,
          applicants: applicantsWithProfiles,
        };
      })
    );
    return { jobs: jobsWithApplicants };
  }
}
