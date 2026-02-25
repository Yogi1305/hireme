import { Test } from 'src/db/entity/test.entity';
import { Question } from 'src/db/entity/question.entity';
import type { AddQuestionToTestDtoType, CreateTestDtoType } from 'src/app/zod/test.dto';
export declare class TestService {
    deleteTest(testId: string): Promise<void>;
    updateTest(testId: string, dto: Partial<Test>): Promise<Test>;
    createTest(dto: CreateTestDtoType, auth: {
        role?: string;
        companyId?: string;
    }): Promise<Test>;
    addQuestionToTest(testId: string, dto: AddQuestionToTestDtoType, auth: {
        role?: string;
        companyId?: string;
    }): Promise<{
        test: Test;
        question: Question;
    }>;
    getTestByJobId(jobId: string, auth: {
        role?: string;
        companyId?: string;
    }): Promise<Test>;
    getAllTests(auth: {
        role?: string;
        companyId?: string;
    }): Promise<Test[]>;
}
