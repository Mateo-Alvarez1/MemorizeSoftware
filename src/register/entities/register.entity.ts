import { User } from 'src/auth/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Register {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column('text')
  name: string;
  @Column('text')
  password: string;
  @ManyToOne(() => User, (user) => user.register, { eager: true })
  user: User;
}
