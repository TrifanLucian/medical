import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class QuestionType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    num_choices: number;

    @Column()
    num_correct: number;

    @Column()
    multiple_choice: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
