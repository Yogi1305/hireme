import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";
import { Job } from "./jobs.entity";
import { Form } from "./form.entity";

@Entity({ name: 'applications' })
export class Application {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => User, (user) => user.id, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Job, (job) => job.id, { nullable: false })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @ManyToOne(() => Form, (form) => form.id, { nullable: false })
  @JoinColumn({ name: 'formId' })
  form: Form;

  @Column({ name: 'status', default: 'pending' })
  status: string;

  @Column({ name: 'correctedanswers' })
  correctedanswers: number;

  @Column({ name: 'totalquestions' })
  totalquestions: number;

  @Column({ name: 'createdAt' })
  createdAt: Date;

  @Column({ name: 'updatedAt' })
  updatedAt: Date;
}
