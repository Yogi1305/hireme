import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { QuestionSet } from 'src/db/entity/questionset.entity';
import { QuestionSetService } from '../service/questionset.service';

@Controller('questionset')
export class QuestionSetController {
  constructor(private readonly questionSetService: QuestionSetService) {}

  @Post()
  async createSet(@Body('setName') setName: string) {
    return this.questionSetService.createQuestionSet(setName);
  }

  @Get()
  async getAllSets(): Promise<QuestionSet[]> {
    return this.questionSetService.getAllQuestionSetsWithQuestions();
  }

  @Post(':id/question')
  async addQuestion(
    @Param('id') setId: string,
    @Body() questionData: { questionText: string; options: string[]; correctAnswer: string }
  ) {
    return this.questionSetService.addQuestionToSet(setId, questionData);
  }

  @Delete('question/:questionId')
  async deleteQuestion(@Param('questionId') questionId: string) {
    await this.questionSetService.deleteQuestionFromSet(questionId);
    return { message: 'Question deleted' };
  }

  @Get(':id')
  async getSet(@Param('id') id: string) {
    return this.questionSetService.getQuestionSetWithQuestions(id);
  }
}
