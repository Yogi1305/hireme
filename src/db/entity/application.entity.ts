import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './user.entity';
import { Job } from './jobs.entity';
import { Form } from './form.entity';
import { BaseTimestampEntity } from './base.entity';

@Entity({ name: 'applications' })
export class Application extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Job, (job) => job.id, { nullable: false })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @ManyToOne(() => Form, (form) => form.id, { nullable: false })
  @JoinColumn({ name: 'formId' })
  form: Form;

  @Column('json', { name: 'formResponse', nullable: true })
  formResponse: object;

  @Column({ name: 'status', default: 'pending' })
  status: string;

  @Column('simple-array', { name: 'correctedanswers', default: '' })
  correctedanswers: string[];

  @Column({ name: 'totalquestions', default: 0 })
  totalquestions: number;

}
