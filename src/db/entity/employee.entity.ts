import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Company } from "./company.entity";
import { Role } from "../libs/Role";

@Entity({ name: 'employees' })
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({type: 'enum', enum: Role ,default: Role.USER})
  role: string;
  // entity relationship with company where one company can have many employees but one employee belongs to one company
  @ManyToOne(() => Company, (company) => company.id)
  @JoinColumn({ name: 'companyId' })
  company: Company;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}
