/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsDate, IsNotEmpty, IsUrl } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Shop, User } from ".";

@Entity({ name: "cards" }) // table name in database
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsUrl()
  @Column({
    unique: true,
  })
  url: string;

  @IsNotEmpty()
  @IsDate()
  @Column({
    type: "timestamp",
    precision: 3,
  })
  startAt: Date;

  @IsNotEmpty()
  @IsDate()
  @Column({
    type: "timestamp",
    precision: 3,
  })
  endAt: Date;

  @IsBoolean()
  @Column({
    default: true,
  })
  isActive: boolean;

  @IsNotEmpty()
  @Column({ nullable: true })
  shopId!: number;

  @ManyToOne((_type) => Shop, (shop: Shop) => shop.cards)
  @JoinColumn()
  shop!: Shop;

  @IsNotEmpty()
  @Column({ nullable: true })
  userId!: number;

  @ManyToOne((_type) => User, (user: User) => user.cards)
  @JoinColumn()
  user!: User;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
