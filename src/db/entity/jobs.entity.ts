import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Company } from './company.entity';
import { jobcategory, jobmode } from '../libs/Role';
import { Test } from './test.entity';
import { Form } from './form.entity';
import { BaseTimestampEntity } from './base.entity';

@Entity({ name: 'jobs' })
export class Job extends BaseTimestampEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  location: string;

  @Column()
  salary: number;

  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column({type:"enum",enum:jobmode})
  jobType: string;

  @Column({type: 'enum', enum: jobcategory})
  jobCategory: string;

  @Column()
  duration: string;
  @Column()
  lastDateToApply: Date;

  @OneToOne(() => Test, (test) => test.job, { cascade: true })
  @JoinColumn({ name: 'testId' })
  test: Test;
  @OneToOne(() => Form, (form) => form.job, { cascade: true })
  Form: Form;
}
