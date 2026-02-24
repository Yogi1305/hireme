import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  Index,
} from 'typeorm';
import { Role } from '../libs/Role';
import { BaseTimestampEntity } from './base.entity';
import { Profile } from './profile.entity';

@Entity({ name: 'users' })
@Index(['email'])
export class User extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

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

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
