import { BaseEntity } from 'typeorm';
import { Job } from './jobs.entity';
export declare class Form extends BaseEntity {
    id: string;
    form: object;
    job: Job;
}
