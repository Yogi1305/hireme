import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn, OneToMany, BaseEntity } from 'typeorm';
import { Job } from './jobs.entity';
import { BaseTimestampEntity } from './base.entity';
import { Question } from './question.entity';

@Entity({ name: 'tests' })
export class Test extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Job, (job) => job.test, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @OneToMany(() => Question, (question) => question.test, { cascade: true })
  questionSet: Question[];

}
