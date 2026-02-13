import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity ({ name: 'questions' })
export class Question {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    questionText: string;
    @Column()
    options:string[];
    @Column()
    correctAnswer: string;
    @Column()
    createdAt: Date;
    @Column()
    updatedAt: Date;
}
