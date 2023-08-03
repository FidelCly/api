import { Balance } from '../balance/balance.entity';
import { Shop } from '../shop/shop.entity';
import { User } from '../user/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';

@Entity()
@Index(['shopId', 'userId'], { unique: true })
export class Card {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    default: true,
  })
  isActive: boolean;

  @Column({ nullable: true })
  shopId!: number;

  @ManyToOne(() => Shop, (shop: Shop) => shop.cards)
  @JoinColumn()
  shop!: Shop;

  @Column({ nullable: true })
  userId!: number;

  @ManyToOne(() => User, (user: User) => user.cards)
  @JoinColumn()
  user!: User;

  @OneToMany(() => Balance, (balance: Balance) => balance.card)
  balances!: Array<Balance>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
