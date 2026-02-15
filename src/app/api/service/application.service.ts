import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Application } from 'src/db/entity/application.entity';
import { Job } from 'src/db/entity/jobs.entity';
import { Form } from 'src/db/entity/form.entity';
import { Test } from 'src/db/entity/test.entity';
import { Question } from 'src/db/entity/question.entity';
import { User } from 'src/db/entity/user.entity';
import type { CreateApplicationDtoType } from 'src/app/zod/application.dto';

@Injectable()
export class ApplicationService {
  @InjectRepository(Application)
  private readonly applicationRepository: Repository<Application>;

  @InjectRepository(Job)
  private readonly jobRepository: Repository<Job>;

  @InjectRepository(Form)
  private readonly formRepository: Repository<Form>;

  @InjectRepository(Test)
  private readonly testRepository: Repository<Test>;

  @InjectRepository(Question)
  private readonly questionRepository: Repository<Question>;

  @InjectRepository(User)
  private readonly userRepository: Repository<User>;

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

    const user = await this.userRepository.findOne({ where: { id: auth.userId } });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const job = await this.jobRepository.findOne({ where: { id: dto.jobId } });
    if (!job) {
      throw new NotFoundException('Job not found');
    }

    // Check if user already applied
    const existingApplication = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoin('application.user', 'user')
      .leftJoin('application.job', 'job')
      .where('user.id = :userId', { userId: auth.userId })
      .andWhere('job.id = :jobId', { jobId: dto.jobId })
      .getOne();

    if (existingApplication) {
      throw new ConflictException('You have already applied for this job');
    }

    // Get form for this job
    const form = await this.formRepository
      .createQueryBuilder('form')
      .leftJoinAndSelect('form.job', 'job')
      .where('job.id = :jobId', { jobId: dto.jobId })
      .getOne();

    if (!form) {
      throw new NotFoundException('Form not found for this job');
    }

    // Get test and calculate score if test answers provided
    let correctedAnswerIds: string[] = [];
    let totalQuestions = 0;

    if (dto.testAnswers && dto.testAnswers.length > 0) {
      const test = await this.testRepository
        .createQueryBuilder('test')
        .leftJoinAndSelect('test.job', 'job')
        .where('job.id = :jobId', { jobId: dto.jobId })
        .getOne();

      if (test && test.questionSet.length > 0) {
        totalQuestions = test.questionSet.length;

        for (const answer of dto.testAnswers) {
          const question = await this.questionRepository.findOne({
            where: { id: answer.questionId },
          });

          if (question && question.correctAnswer === answer.answer) {
            correctedAnswerIds.push(answer.questionId);
          }
        }
      }
    }

    const application = this.applicationRepository.create({
      user,
      job,
      form,
      formResponse: dto.formResponse,
      status: 'pending',
      correctedanswers: correctedAnswerIds,
      totalquestions: totalQuestions,
    });

    return this.applicationRepository.save(application);
  }

  async getMyApplications(auth: { userId?: string }): Promise<Application[]> {
    if (!auth?.userId) {
      throw new UnauthorizedException('User ID not found in token');
    }

    const applications = await this.applicationRepository
      .createQueryBuilder('application')
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

    const job = await this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .where('job.id = :jobId', { jobId })
      .getOne();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only view applications for your company jobs');
    }

    const applications = await this.applicationRepository
      .createQueryBuilder('application')
      .leftJoinAndSelect('application.user', 'user')
      .leftJoinAndSelect('user.profile', 'profile')
      .leftJoinAndSelect('application.job', 'job')
      .where('job.id = :jobId', { jobId })
      .getMany();

    // Remove sensitive data
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
    auth: { companyId?: string },
  ): Promise<Application> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    const application = await this.applicationRepository
      .createQueryBuilder('application')
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
    return this.applicationRepository.save(application);
  }

  async getApplicationById(
    applicationId: string,
    auth: { userId?: string; companyId?: string },
  ): Promise<Application> {
    const application = await this.applicationRepository
      .createQueryBuilder('application')
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

    // Check access - either the applicant or the company can view
    const isApplicant = application.user?.id === auth.userId;
    const isCompany = application.job?.company?.id === auth.companyId;

    if (!isApplicant && !isCompany) {
      throw new ForbiddenException('You do not have access to this application');
    }

    // Remove sensitive data
    if (application.user) {
      delete (application.user as any).password;
      delete (application.user as any).refreshToken;
    }

    return application;
  }

  async getQuestionsByTestId(testId: string): Promise<any[]> {
    const test = await this.testRepository.findOne({ where: { id: testId } });

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    if (!test.questionSet || test.questionSet.length === 0) {
      return [];
    }

    const questions = await this.questionRepository
      .createQueryBuilder('question')
      .where('question.id IN (:...questionIds)', { questionIds: test.questionSet })
      .getMany();

    // Return questions without correct answer for users
    return questions.map(q => ({
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

    const application = await this.applicationRepository
      .createQueryBuilder('application')
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

    // Get test for this job
    const test = await this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.job', 'job')
      .where('job.id = :jobId', { jobId: application.job?.id })
      .getOne();

    if (!test) {
      throw new NotFoundException('Test not found for this job');
    }

    const correctedAnswerIds: string[] = [];

    for (const answer of testAnswers) {
      const question = await this.questionRepository.findOne({
        where: { id: answer.questionId },
      });

      if (question && question.correctAnswer === answer.answer) {
        correctedAnswerIds.push(answer.questionId);
      }
    }

    application.correctedanswers = correctedAnswerIds;
    application.totalquestions = test.questionSet.length;

    return this.applicationRepository.save(application);
  }
}
