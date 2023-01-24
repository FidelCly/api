/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card, Promotion } from ".";

@Entity({ name: "balances" }) // table name in database
export class Balance {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @Column({ default: 0 })
  counter: number;

  @IsBoolean()
  @IsOptional()
  @Column({ default: true })
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: true })
  promotionId: number;

  @ManyToOne(() => Promotion, (promotion: Promotion) => promotion.balances)
  @JoinColumn()
  promotion!: Promotion;

  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: true })
  cardId: number;

  @ManyToOne(() => Card, (card: Card) => card.balances)
  @JoinColumn()
  card!: Card;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
