import { BaseEntity } from 'typeorm';
export declare abstract class BaseTimestampEntity extends BaseEntity {
    createdAt: Date;
    updatedAt: Date;
}
