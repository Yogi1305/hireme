import { BaseEntity } from 'typeorm';
import { Job } from './jobs.entity';
import { Question } from './question.entity';
export declare class Test extends BaseEntity {
    id: string;
    title: string;
    description: string;
    job: Job;
    questionSet: Question[];
}
