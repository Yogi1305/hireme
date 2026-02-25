import type { Request } from 'express';
import type { CreateApplicationDtoType } from 'src/app/zod/application.dto';
import { ApplicationService } from '../service/application.service';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    createApplication(body: CreateApplicationDtoType, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application;
    }>;
    getMyApplications(req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application[];
    }>;
    getApplicationsByJob(jobId: string, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application[];
    }>;
    getQuestionsByTestId(testId: string): Promise<{
        message: string;
        data: any[];
    }>;
    getApplicationById(applicationId: string, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application;
    }>;
    updateApplicationStatus(applicationId: string, status: string, notes: string | undefined, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application;
    }>;
    submitTestAnswers(applicationId: string, testAnswers: {
        questionId: string;
        answer: string;
    }[], req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application;
    }>;
    getJobsWithApplicantsByCompany(req: Request): Promise<{
        message: string;
        data: {
            jobs: any[];
        };
    }>;
}
