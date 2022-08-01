import {
  IsBoolean,
  IsDate,
  IsString,
  IsUrl,
  isURL,
  MinDate,
} from "class-validator";
import {
  BaseEntity,
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
export class Card extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsUrl()
  @Column({
    unique: true,
  })
  url: string;

  @IsBoolean()
  @Column({
    default: true,
  })
  isActive: boolean;

  @IsDate()
  @MinDate(new Date(), {
    message: "Start date should be greater or equal than $constraint1",
  })
  @Column({
    type: "timestamp",
    precision: 3,
  })
  startAt: Date;

  @IsDate()
  @MinDate(new Date(), {
    message: "End date should be greater or equal than $constraint1",
  })
  @Column({
    type: "timestamp",
    precision: 3,
  })
  endAt: Date;

  @Column({ nullable: true })
  shopId!: number;
  @ManyToOne((_type) => Shop, (shop: Shop) => shop.cards)
  @JoinColumn()
  shop!: Shop;

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
