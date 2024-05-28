import { Register } from 'src/register/entities/register.entity';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    nullable: false,
  })
  fullName: string;
  @Column('text', {
    nullable: false,
    unique: true,
  })
  email: string;

  @Column('text')
  password: string;

  @OneToMany(() => Register, (register) => register.user, { cascade: true })
  register: Register;

  @BeforeInsert()
  checkEmail() {
    this.email = this.email.toLowerCase().trim();
  }

  @BeforeUpdate()
  checkUpdateEmail() {
    this.checkEmail();
  }
}
