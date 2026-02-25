import { Application } from 'src/db/entity/application.entity';
export declare class InterviewerService {
    updateApplicationStatus(applicationId: string, status: string, auth: {
        companyId?: string;
    }): Promise<Application>;
    getApplicationsByJob(jobId: string, auth: {
        companyId?: string;
    }): Promise<Application[]>;
    getApplicationById(applicationId: string, auth: {
        companyId?: string;
    }): Promise<Application>;
}
