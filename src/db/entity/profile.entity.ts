import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { User } from './user.entity';
import { BaseTimestampEntity } from './base.entity';

/** Strongly-typed interfaces for JSONB columns */
export interface Education {
  name: string;
  course: string;
  startDate: string;   // ISO date string
  endDate: string;     // ISO date string
}

export interface Experience {
  companyName: string;
  jobType: string;
  location: string;
  startDate: string;   // ISO date string
  endDate: string;     // ISO date string
  ctc: number;
}

@Entity({ name: 'profiles' })
export class Profile extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'github', type: 'varchar', length: 255, nullable: true })
  github: string | null;

  @Column({ name: 'linkedin', type: 'varchar', length: 255, nullable: true })
  linkedin: string | null;

  @Column({ name: 'codingProfiles', type: 'simple-array', nullable: true })
  codingProfiles: string[] | null;

  @Column({ name: 'resumes', type: 'simple-array', nullable: true })
  resumes: string[] | null;

  @Column({ name: 'primaryResumeIndex', type: 'int', nullable: true, default: 0 })
  primaryResumeIndex: number | null;

  @Column({ name: 'skills', type: 'simple-array', nullable: true })
  skills: string[] | null;

  @Column({ name: 'education', type: 'jsonb', nullable: true, default: '[]' })
  education: Education[] | null;

  @Column({ name: 'experiences', type: 'jsonb', nullable: true, default: '[]' })
  experiences: Experience[] | null;

  @OneToOne(() => User, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

}
