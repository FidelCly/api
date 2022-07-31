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
  geoloc: number;

  @Column({
    length: 10,
  })
  phone: string;

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
