import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, BaseEntity } from 'typeorm';
import { BaseTimestampEntity } from './base.entity';
import { Test } from './test.entity';
import { QuestionSet } from './questionset.entity';

@Entity ({ name: 'questions' })
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    questionText: string;
    @Column({ type: 'simple-array' })
    options: string[];
    @Column()
    correctAnswer: string;

    @ManyToOne(() => Test, (test) => test.questionSet, { onDelete: 'CASCADE' })
    test: Test;

    @ManyToOne(() => QuestionSet, (questionSet) => questionSet.questions, { onDelete: 'CASCADE', nullable: true })
    questionSet: QuestionSet;
}
