import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from 'typeorm';
import { Job } from './jobs.entity';
import { BaseTimestampEntity } from './base.entity';

@Entity({ name: 'tests' })
export class Test extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Job, (job) => job.test, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Column('simple-array', { default: '' })
  questionSet: string[];

}
