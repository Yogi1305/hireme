import { Application } from 'src/db/entity/application.entity';
import type { CreateApplicationDtoType } from 'src/app/zod/application.dto';
export declare class ApplicationService {
    createApplication(dto: CreateApplicationDtoType, auth: {
        userId?: string;
    }): Promise<Application>;
    getMyApplications(auth: {
        userId?: string;
    }): Promise<Application[]>;
    getApplicationsByJob(jobId: string, auth: {
        companyId?: string;
    }): Promise<Application[]>;
    updateApplicationStatus(applicationId: string, status: string, notes: string | undefined, auth: {
        companyId?: string;
    }): Promise<Application>;
    getApplicationById(applicationId: string, auth: {
        userId?: string;
        companyId?: string;
    }): Promise<Application>;
    getQuestionsByTestId(testId: string): Promise<any[]>;
    submitTestAnswers(applicationId: string, testAnswers: {
        questionId: string;
        answer: string;
    }[], auth: {
        userId?: string;
    }): Promise<Application>;
    getJobsWithApplicantsByCompany(companyId: string): Promise<{
        jobs: any[];
    }>;
}
