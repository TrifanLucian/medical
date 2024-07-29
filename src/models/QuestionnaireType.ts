import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class QuestionnaireType {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    is_infinite: boolean;

    @CreateDateColumn({ type: 'timestamp' })
    created_at: Date;
}
