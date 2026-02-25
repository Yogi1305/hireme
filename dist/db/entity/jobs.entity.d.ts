import { BaseEntity } from 'typeorm';
import { Company } from './company.entity';
import { Test } from './test.entity';
import { Form } from './form.entity';
export declare class Job extends BaseEntity {
    id: string;
    title: string;
    description: string;
    location: string;
    salary: number;
    company: Company;
    jobType: string;
    jobCategory: string;
    duration: string;
    lastDateToApply: Date;
    isPublic: boolean;
    test: Test;
    Form: Form;
}
