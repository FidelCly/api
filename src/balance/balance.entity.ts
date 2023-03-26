/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from '../card/card.entity';
import { Promotion } from '../promotion/promotion.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: 0 })
  counter: number;

  @Column({ default: true })
  isActive: boolean;

  @Column({ nullable: true })
  promotionId: number;

  @ManyToOne(() => Promotion, (promotion: Promotion) => promotion.balances)
  @JoinColumn()
  promotion!: Promotion;

  @Column({ nullable: true })
  cardId: number;

  @ManyToOne(() => Card, (card: Card) => card.balances)
  @JoinColumn()
  card!: Card;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
