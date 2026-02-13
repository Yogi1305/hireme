import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "../libs/Role";
import { v4 as uuidv4 } from "uuid";

@Entity({name: 'companies'})
export class Company {
   @PrimaryGeneratedColumn()
   id: number
   @Column()
   CompanyName: string;
   @Column()
   Location: string;
   @Column()
   Industry: string;
   @Column()
   Website: string;
   @Column()
   Email: string;
   @Column()
   Phone: string
   @Column({type: 'enum', enum: Role, default: Role.ADMIN})
   Roles: string;
   @Column()
   CreatedAt: Date
   @Column()
   UpdatedAt: Date
   @Column({ unique: true, length: 6 })
   CompanyCode: string;

   @BeforeInsert()
   generateCompanyCode() {
      this.CompanyCode = uuidv4().slice(0, 6).toUpperCase();
   }
}
