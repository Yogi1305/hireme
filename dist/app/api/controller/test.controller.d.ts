import type { Request } from 'express';
import type { AddQuestionToTestDtoType, CreateTestDtoType } from 'src/app/zod/test.dto';
import { TestService } from '../service/test.service';
export declare class TestController {
    private readonly testService;
    constructor(testService: TestService);
    createTest(body: CreateTestDtoType, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/test.entity").Test;
    }>;
    addQuestion(testId: string, body: AddQuestionToTestDtoType, req: Request): Promise<{
        message: string;
        data: {
            test: import("../../../db/entity/test.entity").Test;
            question: import("../../../db/entity/question.entity").Question;
        };
    }>;
    getAllTests(req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/test.entity").Test[];
    }>;
}
