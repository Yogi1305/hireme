import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from 'typeorm';
import { Job } from './jobs.entity';
import { BaseTimestampEntity } from './base.entity';

@Entity({ name: 'form' })
export class Form extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column("json")
  form: object;

  @OneToOne(() => Job, (job) => job.Form)
  @JoinColumn({ name: 'jobId' })
  job: Job;

}
