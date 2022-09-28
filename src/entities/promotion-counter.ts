/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "promotions-counter" }) // table name in database
export class PromotionCounter {
  @IsNotEmpty()
  @PrimaryColumn()
  shopId: number;

  @IsNotEmpty()
  @PrimaryColumn()
  userId: number;

  @IsNotEmpty()
  @PrimaryColumn()
  promotionId: number;

  @IsNumber()
  @Column({ default: 0 })
  increment: number;

  @IsBoolean()
  @Column({ default: true })
  isActive: boolean;

  @IsNumber()
  @Column({ default: 0 })
  nbValidation: number;

  @CreateDateColumn()
  createAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
