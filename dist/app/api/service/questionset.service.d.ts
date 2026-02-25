import { Repository } from 'typeorm';
import { QuestionSet } from 'src/db/entity/questionset.entity';
import { Question } from 'src/db/entity/question.entity';
export declare class QuestionSetService {
    private readonly questionSetRepository;
    private readonly questionRepository;
    deleteQuestionSet(questionSetId: string): Promise<void>;
    constructor(questionSetRepository: Repository<QuestionSet>, questionRepository: Repository<Question>);
    createQuestionSet(setName: string): Promise<QuestionSet>;
    addQuestionToSet(questionSetId: string, questionData: Partial<Question>): Promise<Question>;
    deleteQuestionFromSet(questionId: string): Promise<void>;
    getQuestionSetWithQuestions(id: string): Promise<QuestionSet>;
    getAllQuestionSetsWithQuestions(): Promise<QuestionSet[]>;
}
