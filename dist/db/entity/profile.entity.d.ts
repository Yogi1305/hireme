import { BaseEntity } from 'typeorm';
import { User } from './user.entity';
export interface Education {
    name: string;
    course: string;
    startDate: string;
    endDate: string;
}
export interface Experience {
    companyName: string;
    jobType: string;
    location: string;
    startDate: string;
    endDate: string;
    ctc: number;
}
export declare class Profile extends BaseEntity {
    id: string;
    github: string | null;
    linkedin: string | null;
    codingProfiles: string[] | null;
    resumes: string[] | null;
    primaryResumeIndex: number | null;
    skills: string[] | null;
    education: Education[] | null;
    experiences: Experience[] | null;
    user: User;
}
