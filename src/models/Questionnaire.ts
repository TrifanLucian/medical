import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { QuestionnaireType } from './QuestionnaireType';
import { User } from './User';

@Entity()
export class Questionnaire {
    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => QuestionnaireType, {nullable: true})
    type: QuestionnaireType;

    @ManyToOne(() => User)
    created_by: User;

    @Column()
    max_wrong_answers: number;

    @Column({ default: false })
    is_submitted: boolean;

    @Column({ default: 'pending' })
    submission_status: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
