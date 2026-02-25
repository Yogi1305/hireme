import type { Request } from 'express';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
import { JobService } from '../service/job.service';
export declare class JobController {
    private readonly jobService;
    constructor(jobService: JobService);
    createJob(body: CreateJobDtoType, req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/jobs.entity").Job;
    }>;
    getAllJobs(req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/jobs.entity").Job[];
    }>;
    browseAllCompaniesWithJobs(req: Request): Promise<{
        message: string;
        data: any[];
    }>;
    makeJobPublic(req: Request): Promise<{
        message: string;
        data: import("../../../db/entity/jobs.entity").Job;
    }>;
    deleteJob(req: Request): Promise<{
        message: string;
    }>;
}
