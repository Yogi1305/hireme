import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import type { Request } from 'express';
import { JwtAuthGuard } from 'src/app/guard/jwt.auth';
import { InterviewerCompanyGuard } from 'src/app/guard/interviewer-company.guard';
import type { AddQuestionToTestDtoType, CreateTestDtoType } from 'src/app/zod/test.dto';
import { TestService } from '../service/test.service';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @UseGuards(JwtAuthGuard, InterviewerCompanyGuard)
  @Post('create')
  async createTest(@Body() body: CreateTestDtoType, @Req() req: Request) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const test = await this.testService.createTest(body, auth);
    return { message: 'Test created successfully', data: test };
  }

  @UseGuards(JwtAuthGuard, InterviewerCompanyGuard)
  @Post(':testId/questions')
  async addQuestion(
    @Param('testId') testId: string,
    @Body() body: AddQuestionToTestDtoType,
    @Req() req: Request,
  ) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };

    const result = await this.testService.addQuestionToTest(testId, body, auth);
    return { message: 'Question added successfully', data: result };
  }

  @UseGuards(JwtAuthGuard)
  @Get('all')
  async getAllTests(@Req() req: Request) {
    const auth = {
      role: (req as any).user?.role as string | undefined,
      companyId: (req as any).user?.companyId as string | undefined,
    };
    const tests = await this.testService.getAllTests(auth);
    return { message: 'Tests retrieved successfully', data: tests };
  }
}
