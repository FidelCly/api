/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card } from '../card/card.entity';
import { Promotion } from '../promotion/promotion.entity';
import { ShopActivity } from './shop.enum';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity() // table name in database
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  activity: ShopActivity;

  @Column({ nullable: true })
  description!: string;

  @Column({ nullable: true })
  picture!: string;

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

  @OneToMany(() => Card, (card: Card) => card.shop)
  cards!: Array<Card>;

  @OneToMany(() => Promotion, (promotion: Promotion) => promotion.shop)
  promotions!: Array<Promotion>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
