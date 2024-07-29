import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Question } from './Question';

@Entity()
export class UserQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Question)
    question: Question;

    @Column()
    is_correct: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    answered_at: Date;
}
