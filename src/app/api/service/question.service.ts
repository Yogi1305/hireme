import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import type { AddQuestionToTestDtoType } from 'src/app/zod/test.dto';
import { Question } from 'src/db/entity/question.entity';
import { Test } from 'src/db/entity/test.entity';
import { Role } from 'src/db/libs/Role';

@Injectable()
export class QuestionService {
    async deleteQuestion(questionId: string): Promise<void> {
      const question = await Question.findOne({ where: { id: questionId } });
      if (!question) throw new NotFoundException('Question not found');
      await question.remove();
    }

    async updateQuestion(questionId: string, dto: Partial<Question>): Promise<Question> {
      const question = await Question.findOne({ where: { id: questionId } });
      if (!question) throw new NotFoundException('Question not found');
      Object.assign(question, dto);
      return question.save();
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
      const test = await Test.findOne({
        where: { id: testId },
        relations: ['job', 'job.company'],
      });
      if (!test) {
        throw new NotFoundException('Test not found');
      }
      if (test.job?.company?.id !== auth.companyId) {
        throw new ForbiddenException('You can add question only to your company test');
      }
      if (!dto.options.includes(dto.correctAnswer)) {
        throw new BadRequestException('Correct answer must be one of the options');
      }
      const question = Question.create({
        questionText: dto.questionText,
        options: dto.options,
        correctAnswer: dto.correctAnswer,
        test: test,
      });
      const savedQuestion = await question.save();
      const updatedTest = await Test.findOne({
        where: { id: test.id },
        relations: ['questionSet'],
      });
      return { test: updatedTest!, question: savedQuestion };
    }

    async addExistingQuestionToTest(questionId: string, testId: string): Promise<Question> {
      const question = await Question.findOne({ where: { id: questionId } });
      if (!question) {
        throw new NotFoundException('Question not found');
      }
      const test = await Test.findOne({ where: { id: testId } });
      if (!test) {
        throw new NotFoundException('Test not found');
      }
      question.test = test;
      return question.save();
    }
}
