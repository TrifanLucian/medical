import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
} from 'typeorm';
// eslint-disable-next-line import/no-cycle
import { Role } from './Role';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column()
  first_name: string; // New column for user's first name

  @Column()
  last_name: string; // New column for user's last name

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'user_role' })
  role: Role;
}
