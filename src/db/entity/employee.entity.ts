import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Company } from './company.entity';
import { Role } from '../libs/Role';
import { BaseTimestampEntity } from './base.entity';

@Entity({ name: 'employees' })
@Index(['email'])
@Index(['company'])

export class Employee extends BaseTimestampEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'name', type: 'varchar', length: 255, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false,})
  email: string;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: true })
  password: string | null;

  @Column({ name: 'role', type: 'enum', enum: Role, default: Role.USER })
  role: Role;

  @Column({ name: 'companyCode', type: 'varchar', length: 6, nullable: true })
  companyCode: string | null;

  @ManyToOne(() => Company, (company) => company.employees, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'companyId' })
  company: Company;
}
