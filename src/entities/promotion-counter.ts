/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Promotion } from "./promotion";
import { Shop } from "./shop";
import { User } from "./user";

@Entity({ name: "promotions-counter" }) // table name in database
export class PromotionCounter {
  @PrimaryGeneratedColumn()
  @IsNumber()
  Id: number;

  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: false })
  shopId: number;

  @OneToMany(() => Shop, (shop: Shop) => shop.id)
  @JoinColumn()
  shop!: Shop;

  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: false })
  userId: number;

  @ManyToMany(() => User, (user: User) => user.id)
  @JoinColumn()
  user!: User;

  @IsNotEmpty()
  @PrimaryColumn()
  @Column({ nullable: false })
  promotionId: number;

  @OneToOne(() => Promotion, (promotion: Promotion) => promotion.id)
  @JoinColumn()
  promotion!: Promotion;

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
