import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class ChemistryQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column('text')
    question_text: string;

    @Column('varchar', { length: 255 })
    answer_a: string;

    @Column('varchar', { length: 255 })
    answer_b: string;

    @Column('varchar', { length: 255 })
    answer_c: string;

    @Column('varchar', { length: 255 })
    answer_d: string;

    @Column('varchar', { length: 255 })
    answer_e: string;

    @Column('char', { length: 1 })
    correct_answer: string;
}
