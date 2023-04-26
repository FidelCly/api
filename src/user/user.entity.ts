/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from '../card/card.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sexe } from './user.enum';

@Entity({ name: 'users' }) // table name in database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  birthday!: Date;

  @Column()
  sexe!: Sexe;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Card, (card: Card) => card.user)
  cards?: Array<Card>;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
