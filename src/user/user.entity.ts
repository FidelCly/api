/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { Card } from '../card/card.entity';
import { Shop } from '../shop/shop.entity';
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

  @Column({ nullable: true })
  birthday!: Date;

  @Column({ nullable: true })
  sexe!: Sexe;

  @Column({ nullable: true })
  pictureUrl!: string;

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
