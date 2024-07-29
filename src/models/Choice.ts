import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { Question } from './Question';

@Entity()
export class Choice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    choice_text: string;

    @ManyToOne(() => Question)
    question: Question;

    @Column()
    is_correct: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
