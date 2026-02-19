import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { AddQuestionToTestDtoType } from 'src/app/zod/test.dto';
import { Question } from 'src/db/entity/question.entity';
import { Test } from 'src/db/entity/test.entity';
import { Role } from 'src/db/libs/Role';
import { Repository } from 'typeorm';

@Injectable()
export class QuestionService {
  @InjectRepository(Question)
  private readonly questionRepository: Repository<Question>;

  @InjectRepository(Test)
  private readonly testRepository: Repository<Test>;

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

  // Relate an existing question to a test
  async addExistingQuestionToTest(questionId: string, testId: string): Promise<Question> {
    const question = await this.questionRepository.findOne({ where: { id: questionId } });
    if (!question) {
      throw new NotFoundException('Question not found');
    }
    const test = await this.testRepository.findOne({ where: { id: testId } });
    if (!test) {
      throw new NotFoundException('Test not found');
    }
    question.test = test;
    return this.questionRepository.save(question);
  }
}
