import { BaseEntity } from "typeorm";
import { Question } from "./question.entity";
export declare class QuestionSet extends BaseEntity {
    id: string;
    setName: string;
    questions: Question[];
}
