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
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' }) // table name in database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Card, (card: Card) => card.user)
  cards?: Array<Card>;

  @Exclude()
  @CreateDateColumn()
  createdAt?: Date;

  @Exclude()
  @UpdateDateColumn()
  updatedAt?: Date;

  @Exclude()
  @DeleteDateColumn()
  deletedAt?: Date;
}
