import type { Request } from 'express';
import { InterviewerService } from '../service/interviewer.service';
export declare class InterviewerController {
    private readonly interviewerService;
    constructor(interviewerService: InterviewerService);
    getApplicationsByJob(jobId: string, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application[];
    }>;
    getApplicationById(applicationId: string, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application;
    }>;
    updateApplicationStatus(applicationId: string, status: string, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/application.entity").Application;
    }>;
}
