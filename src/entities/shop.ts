import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from ".";

@Entity({ name: "shops" }) // table name in database
export class Shop extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column({
    length: 9,
  })
  siren: number;

  @Column({
    length: 14,
  })
  siret: number;

  @Column()
  email: string;

  @Column()
  zipCode: string;

  @Column()
  geoloc: number;

  @Column({
    length: 10,
  })
  phone: number;

  @Column()
  address: string;

  @Column()
  isActive: boolean;

  @OneToMany((_type) => Card, (card: Card) => card.shop)
  cards!: Array<Card>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
