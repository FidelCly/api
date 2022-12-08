/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Promotion } from "./promotion";
import { User } from "./user";

@Entity({ name: "promotion-counters" }) // table name in database
export class PromotionCounter {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNumber()
  @IsOptional()
  @Column({ default: 0 })
  counter: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: false })
  userId: number;

  @ManyToOne(() => User, (user: User) => user.id)
  @JoinColumn()
  user!: User;

  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: false })
  promotionId: number;

  @ManyToOne(() => Promotion, (promotion: Promotion) => promotion.id)
  @JoinColumn()
  promotion!: Promotion;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
