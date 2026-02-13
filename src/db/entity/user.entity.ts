import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { Role } from "../libs/Role";
import { Profile } from "./profile.entity";

@Entity({name: 'users'})
export class User {
  @Column({ name: 'id', primary: true, generated: true })
  id: number;
  @Column({ name: 'name', nullable: false, default: 'Unknown' })
  name: string;
  @Column({ name: 'email', nullable: false })
  email: string;
  @Column({ name: 'password', nullable: false })
  password: string;
  @Column({ name: 'role', type: 'enum', enum: Role, default: 'user' })
  role: string;

  @Column({ name: 'createdAt' })
  createdAt: Date;
  @Column({ name: 'updatedAt' })
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true, nullable: true })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;
}
