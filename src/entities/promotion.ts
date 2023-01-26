/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Balance, Shop } from ".";

@Entity({ name: "promotions" }) // table name in database
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column()
  description: string;

  @IsNumber()
  @IsNotEmpty()
  @Column()
  checkoutLimit: number;

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
  @IsOptional()
  @Column({ default: true })
  isActive: boolean;

  @IsNotEmpty()
  @IsNumber()
  @Column({ nullable: true })
  shopId: number;

  @ManyToOne(() => Shop, (shop: Shop) => shop.promotions)
  @JoinColumn()
  shop!: Shop;

  @OneToMany(() => Balance, (balance: Balance) => balance.promotion)
  balances!: Array<Balance>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
