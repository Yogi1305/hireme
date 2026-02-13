import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { Job } from "./jobs.entity";

@Entity({ name: 'form' })
export class Form {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("json")
  form: object;

  @OneToOne(() => Job, (job) => job.Form)
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
