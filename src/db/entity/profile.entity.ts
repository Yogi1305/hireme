import { Column, Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({ name: 'profiles' })
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  github: string;

  @Column({ nullable: true })
  linkedin: string;

  @Column({ nullable: true })
  codingProfile: string;

  @Column({ nullable: true })
  resumeLink: string;

  @OneToOne(() => User, (user) => user.profile, { nullable: true })
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
