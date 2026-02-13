import { Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn } from "typeorm";
import { Job } from "./jobs.entity";

@Entity({ name: 'tests' })
export class Test {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToOne(() => Job, (job) => job.test, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'jobId' })
  job: Job;

  @Column("simple-array", { default: "" })
  questionSet: number[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
