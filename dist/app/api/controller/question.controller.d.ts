import type { Request } from 'express';
import type { AddQuestionToTestDtoType } from 'src/app/zod/test.dto';
import { QuestionService } from '../service/question.service';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    addQuestionToTest(testId: string, body: AddQuestionToTestDtoType, req: Request): Promise<{
        message: string;
        data: {
            test: import("../../../db/entity/test.entity").Test;
            question: import("../../../db/entity/question.entity").Question;
        };
    }>;
    addExistingQuestionToTest(testId: string, questionId: string, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/question.entity").Question;
    }>;
    deleteQuestion(questionId: string): Promise<{
        message: string;
    }>;
}
