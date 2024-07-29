import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  message: string;
  
  @Column('text', { nullable: true })
  booking_code: string;

  @Column({ type: 'boolean', default: 'false' })
  resolved: boolean;

  @Column({ type: 'boolean', default: 'false' })
  canceled: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
