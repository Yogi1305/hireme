import { BaseEntity } from 'typeorm';
import { Test } from './test.entity';
import { QuestionSet } from './questionset.entity';
export declare class Question extends BaseEntity {
    id: string;
    questionText: string;
    options: string[];
    correctAnswer: string;
    test: Test;
    questionSet: QuestionSet;
}
