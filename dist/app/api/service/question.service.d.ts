import type { AddQuestionToTestDtoType } from 'src/app/zod/test.dto';
import { Question } from 'src/db/entity/question.entity';
import { Test } from 'src/db/entity/test.entity';
export declare class QuestionService {
    deleteQuestion(questionId: string): Promise<void>;
    updateQuestion(questionId: string, dto: Partial<Question>): Promise<Question>;
    addQuestionToTest(testId: string, dto: AddQuestionToTestDtoType, auth: {
        role?: string;
        companyId?: string;
    }): Promise<{
        test: Test;
        question: Question;
    }>;
    addExistingQuestionToTest(questionId: string, testId: string): Promise<Question>;
}
