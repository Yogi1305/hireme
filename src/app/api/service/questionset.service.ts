  
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { QuestionSet } from 'src/db/entity/questionset.entity';
import { Question } from 'src/db/entity/question.entity';

@Injectable()
export class QuestionSetService {
    async deleteQuestionSet(questionSetId: string): Promise<void> {
      const set = await this.questionSetRepository.findOne({ where: { id: questionSetId } });
      if (!set) throw new NotFoundException('Question set not found');
      await this.questionSetRepository.delete(questionSetId);
    }
  constructor(
    @InjectRepository(QuestionSet)
    private readonly questionSetRepository: Repository<QuestionSet>,
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  async createQuestionSet(setName: string): Promise<QuestionSet> {
    const questionSet = this.questionSetRepository.create({ setName });
    return this.questionSetRepository.save(questionSet);
  }
  
  async addQuestionToSet(questionSetId: string, questionData: Partial<Question>): Promise<Question> {
    const questionSet = await this.questionSetRepository.findOne({ where: { id: questionSetId } });
    if (!questionSet) throw new NotFoundException('Question set not found');
    const question = this.questionRepository.create({ ...questionData, questionSet });
    return this.questionRepository.save(question);
  }

  async deleteQuestionFromSet(questionId: string): Promise<void> {
    await this.questionRepository.delete(questionId);
  }

  async getQuestionSetWithQuestions(id: string): Promise<QuestionSet> {
    const set = await this.questionSetRepository.findOne({ where: { id }, relations: ['questions'] });
    if (!set) throw new NotFoundException('Question set not found');
    return set;
  }

  async getAllQuestionSetsWithQuestions(): Promise<QuestionSet[]> {
    return this.questionSetRepository.find({ relations: ['questions'] });
  }
}
