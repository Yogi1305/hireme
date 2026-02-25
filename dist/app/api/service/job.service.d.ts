import { Job } from 'src/db/entity/jobs.entity';
import type { CreateJobDtoType } from 'src/app/zod/jobs.dto';
export declare class JobService {
    createJob(dto: CreateJobDtoType, auth: {
        role?: string;
        companyId?: string;
    }): Promise<Job>;
    getAllJobs(auth: any, page?: number, limit?: number): Promise<Job[]>;
    getAllCompaniesWithJobs(page?: number, limit?: number): Promise<any[]>;
    makeJobPublic(jobId: string, auth: {
        companyId?: string;
    }): Promise<Job>;
    deleteJob(jobId: string, auth: {
        companyId?: string;
    }): Promise<void>;
}
