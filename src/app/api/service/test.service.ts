import { BadRequestException, ConflictException, ForbiddenException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Test } from 'src/db/entity/test.entity';
import { Question } from 'src/db/entity/question.entity';
import { Job } from 'src/db/entity/jobs.entity';
import { Company } from 'src/db/entity/company.entity';
import { Role } from 'src/db/libs/Role';
import type { AddQuestionToTestDtoType, CreateTestDtoType } from 'src/app/zod/test.dto';

@Injectable()
export class TestService {
  @InjectRepository(Test)
  private readonly testRepository: Repository<Test>;

  @InjectRepository(Question)
  private readonly questionRepository: Repository<Question>;

  @InjectRepository(Job)
  private readonly jobRepository: Repository<Job>;

  @InjectRepository(Company)
  private readonly companyRepository: Repository<Company>;

  async createTest(
    dto: CreateTestDtoType,
    auth: { role?: string; companyId?: string },
  ): Promise<Test> {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }

    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    if (auth.role !== Role.Interviewer && auth.role !== Role.ADMIN) {
      throw new ForbiddenException('Only interviewer can create test');
    }

    const job = await this.jobRepository
      .createQueryBuilder('job')
      .leftJoinAndSelect('job.company', 'company')
      .leftJoinAndSelect('job.test', 'test')
      .where('job.id = :jobId', { jobId: dto.jobId })
      .getOne();

    if (!job) {
      throw new NotFoundException('Job not found');
    }

    if (job.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can create test only for your company jobs');
    }

    if (job.test) {
      throw new ConflictException('Test already exists for this job');
    }

    const test = this.testRepository.create({
      title: dto.title,
      description: dto.description,
      questionSet: [], // Will be populated by adding questions
      job,
    });

    return this.testRepository.save(test);
  }

  async addQuestionToTest(
    testId: string,
    dto: AddQuestionToTestDtoType,
    auth: { role?: string; companyId?: string },
  ): Promise<{ test: Test; question: Question }> {
    if (!dto) {
      throw new BadRequestException('Request body is required');
    }

    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    if (auth.role !== Role.Interviewer && auth.role !== Role.ADMIN) {
      throw new ForbiddenException('Only interviewer can add question');
    }

    const test = await this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .where('test.id = :testId', { testId })
      .getOne();

    if (!test) {
      throw new NotFoundException('Test not found');
    }

    if (test.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can add question only to your company test');
    }

    if (!dto.options.includes(dto.correctAnswer)) {
      throw new BadRequestException('Correct answer must be one of the options');
    }

    const question = this.questionRepository.create({
      questionText: dto.questionText,
      options: dto.options,
      correctAnswer: dto.correctAnswer,
      test: test,
    });

    const savedQuestion = await this.questionRepository.save(question);

    // No need to manually update questionSet, relation is managed by ORM
    const updatedTest = await this.testRepository.findOne({
      where: { id: test.id },
      relations: ['questionSet'],
    });

    return { test: updatedTest!, question: savedQuestion };
  }

  async getTestByJobId(jobId: string, auth: { role?: string; companyId?: string }): Promise<Test> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    const test = await this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .where('job.id = :jobId', { jobId })
      .getOne();

    if (!test) {
      throw new NotFoundException('Test not found for this job');
    }

    if (test.job?.company?.id !== auth.companyId) {
      throw new ForbiddenException('You can only view tests for your company jobs');
    }

    return test;
  }

  async getAllTests(auth: { role?: string; companyId?: string }): Promise<Test[]> {
    if (!auth?.companyId) {
      throw new UnauthorizedException('Company ID not found in token');
    }

    const tests = await this.testRepository
      .createQueryBuilder('test')
      .leftJoinAndSelect('test.job', 'job')
      .leftJoinAndSelect('job.company', 'company')
      .where('company.id = :companyId', { companyId: auth.companyId })
      .getMany();

    return tests;
  }
}
