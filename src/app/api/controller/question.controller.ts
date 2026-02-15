import { Body, Controller, Param, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { InterviewerCompanyGuard } from 'src/app/guard/interviewer-company.guard';
import type { AddQuestionToTestDtoType } from 'src/app/zod/test.dto';
import { QuestionService } from '../service/question.service';


@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @UseGuards(JwtAuthGuard, InterviewerCompanyGuard)
  @Post('tests/:testId/create')
  async addQuestionToTest(
    @Param('testId') testId: string,
    @Body() body: AddQuestionToTestDtoType,
    @Req() req: Request,
  ) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const result = await this.questionService.addQuestionToTest(testId, body, auth);
    return { message: 'Question added successfully', data: result };
  }
}
