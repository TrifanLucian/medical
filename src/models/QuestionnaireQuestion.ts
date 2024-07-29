import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Questionnaire } from './Questionnaire';
import { Question } from './Question';

@Entity()
export class QuestionnaireQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Questionnaire)
    questionnaire: Questionnaire;

    @ManyToOne(() => Question)
    question: Question;
}
