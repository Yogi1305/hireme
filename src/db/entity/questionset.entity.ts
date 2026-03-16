import { Column, Entity, OneToMany, PrimaryGeneratedColumn, BaseEntity } from "typeorm";
import { Question } from "./question.entity";

// one company has many question sets like reactjs, nodejs

@Entity({ name: 'question_sets' })
export class QuestionSet extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    setName: string;

    @OneToMany(() => Question, (question) => question.questionSet)
    questions: Question[];
}