import { Column, Entity, OneToOne, JoinColumn } from "typeorm";
import { Role } from "../libs/Role";
import { Profile } from "./profile.entity";

@Entity({name: 'users'})
export class User {
  @Column({primary: true, generated: true})
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({type: 'enum', enum:Role})
  role: string;

  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;

  @OneToOne(() => Profile, (profile) => profile.user, { cascade: true, nullable: true })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;
}
