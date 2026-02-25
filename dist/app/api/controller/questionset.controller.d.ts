import { QuestionSet } from 'src/db/entity/questionset.entity';
import { QuestionSetService } from '../service/questionset.service';
export declare class QuestionSetController {
    private readonly questionSetService;
    constructor(questionSetService: QuestionSetService);
    createSet(setName: string): Promise<QuestionSet>;
    getAllSets(): Promise<QuestionSet[]>;
    addQuestion(setId: string, questionData: {
        questionText: string;
        options: string[];
        correctAnswer: string;
    }): Promise<import("../../../db/entity/question.entity").Question>;
    deleteQuestion(questionId: string): Promise<{
        message: string;
    }>;
    getSet(id: string): Promise<QuestionSet>;
}
