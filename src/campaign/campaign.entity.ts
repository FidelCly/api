/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../shop/shop.entity';
import { User } from 'src/user/user.entity';
import { Promotion } from 'src/promotion/promotion.entity';

@Entity({ name: 'campaigns' }) // table name in database
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column()
  message: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @ManyToOne(() => Shop, (shop: Shop) => shop.campaigns)
  shop?: Shop;

  @Column({ nullable: true })
  promotionId!: number;

  @ManyToOne(() => Promotion, (promotion: Promotion) => promotion.campaigns)
  @JoinColumn()
  promotion!: Promotion;

  @Column()
  targets?: Array<User>;

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;

  @DeleteDateColumn()
  deletedAt?: Date;
}
