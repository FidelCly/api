import { Balance } from '../balance/balance.entity';
import { Shop } from '../shop/shop.entity';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Promotion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  checkoutLimit: number;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  startAt: Date;

  @Column({
    type: 'timestamp',
    precision: 3,
  })
  endAt: Date;

  @Column({ default: true })
  isActive: boolean;

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

  @DeleteDateColumn()
  deletedAt: Date;
}
