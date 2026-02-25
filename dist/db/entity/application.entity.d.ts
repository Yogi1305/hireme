import { User } from './user.entity';
import { Job } from './jobs.entity';
import { Form } from './form.entity';
import { BaseTimestampEntity } from './base.entity';
export interface AnswerRecord {
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
}
export declare class Application extends BaseTimestampEntity {
    id: string;
    user: User;
    job: Job;
    form: Form;
    formResponse: object;
    status: string;
    correctedanswers: string[];
    incorrectanswers: string[];
    answerDetails: AnswerRecord[];
    totalquestions: number;
    testAnswered: boolean;
    notes: string;
}
