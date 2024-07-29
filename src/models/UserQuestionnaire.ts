import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './User';
import { Questionnaire } from './Questionnaire';

@Entity()
export class UserQuestionnaire {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Questionnaire)
    questionnaire: Questionnaire;

    @Column({ default: false })
    completed: boolean;

    @Column()
    score: number;

    @CreateDateColumn({ type: 'timestamp' })
    completed_at: Date;
}
