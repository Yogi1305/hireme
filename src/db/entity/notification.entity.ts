import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { BaseTimestampEntity } from "./base.entity";


@Entity({ name: 'notifications' })
export class Notification extends BaseTimestampEntity {
     @PrimaryGeneratedColumn('uuid',{ name: 'id' })
     id:string;
        
     @Column({ name: 'userId' })
     userId: string;

     @Column({name:'companyName'})
      companyName: string;
      @Column({name:'jobTitle'})
      jobTitle: string

      @Column({name:"status"})
      status:string;
      @Column({name:"isRead", default: false})
      isRead:boolean;
      @Column({name:"message", type: 'text', nullable: true, default: ''})
      message:string;
}