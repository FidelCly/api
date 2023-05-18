/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Shop } from '../shop/shop.entity';
import { Promotion } from '../promotion/promotion.entity';
import { User } from '../user/user.entity';

@Entity({ name: 'campaigns' }) // table name in database
export class Campaign {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  subject: string;

  @Column({ nullable: true })
  textData!: string;

  @Column({ nullable: true })
  htmlData!: string;

  @Column({ nullable: true })
  templateUrl!: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({ nullable: true })
  shopId: number;

  @ManyToOne(() => Shop, (shop: Shop) => shop.campaigns)
  shop!: Shop;

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
