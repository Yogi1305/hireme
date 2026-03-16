import { BaseEntity, CreateDateColumn, UpdateDateColumn } from 'typeorm';


export abstract class BaseTimestampEntity extends BaseEntity {
  @CreateDateColumn({ name: 'createdAt', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updatedAt', type: 'timestamp' })
  updatedAt: Date;
}
