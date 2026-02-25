import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  BaseEntity,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { BaseTimestampEntity } from './base.entity';
import { Employee } from './employee.entity';
import { Role } from '../libs/Role';

@Entity({ name: 'companies' })
export class Company extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  id: string;

  @Column({ name: 'companyName', type: 'varchar', length: 255, nullable: false })
  companyName: string;

  @Column({ name: 'email', type: 'varchar', length: 255, nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', length: 255, nullable: false })
  password: string;

  @Column({ name: 'refreshToken', type: 'varchar', length: 500, nullable: true })
  refreshToken: string | null;

  @Column({ name: 'location', type: 'varchar', length: 255, nullable: false })
  location: string;

  @Column({ name: 'industry', type: 'varchar', length: 255, nullable: false })
  industry: string;

  @Column({ name: 'website', type: 'varchar', length: 255, nullable: true })
  website: string | null;

  @Column({ name: 'phone', type: 'varchar', length: 20, nullable: true })
  phone: string | null;

  @Column({ name: 'companyCode', type: 'varchar', length: 6, unique: true })
  companyCode: string;

  @OneToMany(() => Employee, (employee) => employee.company)
  employees: Employee[];
   
  @Column({ name: 'role', type: 'enum', enum: Role, default: Role.ADMIN })
  role: Role;

  @BeforeInsert()
  generateCompanyCode() {
    this.companyCode = uuidv4().slice(0, 6).toUpperCase();
  }
}
