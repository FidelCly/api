/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from '../card/card.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Sexe } from './user.enum';
import { Shop } from '../shop/shop.entity';

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

  @Column({ nullable: true })
  birthday!: Date;

  @Column({ nullable: true })
  sexe!: Sexe;

  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToOne(() => Shop, (shop: Shop) => shop.user)
  shop?: Shop;

  @OneToMany(() => Card, (card: Card) => card.user)
  cards?: Array<Card>;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
