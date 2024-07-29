import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { QuestionType } from './QuestionType';
import { User } from './User';

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    question_text: string;

    @ManyToOne(() => QuestionType)
    question_type: QuestionType;

    @ManyToOne(() => User)
    created_by: User;

    @Column({ default: false })
    is_submitted: boolean;

    @Column({ default: 'pending' })
    submission_status: string;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
