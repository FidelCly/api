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

  @Column({
    unique: true,
  })
  url: string;

  @Column()
  isActive: boolean;

  @Column({
    type: "timestamp",
    precision: 3,
  })
  startAt: Date;

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
