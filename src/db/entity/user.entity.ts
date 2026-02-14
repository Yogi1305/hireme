import {
  Column,
  Entity,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Role } from '../libs/Role';
import { Profile } from './profile.entity';
import { BaseTimestampEntity } from './base.entity';

@Entity({ name: 'users' })
export class User extends BaseTimestampEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ name: 'role', type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ name: 'refreshToken', type: 'varchar', length: 500, nullable: true })
  refreshToken: string | null;

  @OneToOne(() => Profile, (profile) => profile.user, {
    cascade: true,
    nullable: true,
    eager: false,
  })
  @JoinColumn({ name: 'profileId' })
  profile: Profile;
}
