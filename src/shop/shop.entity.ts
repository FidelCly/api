/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Campaign } from '../campaign/campaign.entity';
import { Card } from '../card/card.entity';
import { Promotion } from '../promotion/promotion.entity';
import { User } from '../user/user.entity';
import { ShopActivity } from './shop.enum';

@Entity() // table name in database
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  activity: ShopActivity;

  @Column({
    length: 9,
  })
  siren: string;

  @Column({
    length: 14,
  })
  siret: string;

  @Column()
  email: string;

  @Column({ nullable: true })
  marketingEmail: string;

  @Column({
    length: 5,
  })
  zipCode: string;

  @Column()
  city: string;

  @Column()
  lat: string;

  @Column()
  long: string;

  @Column({
    length: 10,
  })
  phone: string;

  @Column()
  address: string;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({ nullable: true })
  userId!: number;

  @Column({ nullable: true })
  pictureUrl!: string;

  @OneToOne(() => User, (user: User) => user.shop)
  @JoinColumn()
  user!: User;

  @OneToMany(() => Card, (card: Card) => card.shop)
  cards!: Array<Card>;

  @OneToMany(() => Promotion, (promotion: Promotion) => promotion.shop)
  promotions!: Array<Promotion>;

  @OneToMany(() => Campaign, (campaign: Campaign) => campaign.shop)
  campaigns!: Array<Campaign>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
