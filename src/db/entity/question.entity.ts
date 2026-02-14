import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BaseTimestampEntity } from './base.entity';

@Entity ({ name: 'questions' })
export class Question extends BaseTimestampEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    questionText: string;
    @Column({ type: 'simple-array' })
    options: string[];
    @Column()
    correctAnswer: string;
}
