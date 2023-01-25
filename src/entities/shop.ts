/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsBoolean,
  IsEmail,
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsPhoneNumber,
  IsPostalCode,
  Length,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card, Promotion } from ".";

@Entity({ name: "shops" }) // table name in database
export class Shop {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @Column()
  companyName: string;

  @IsNotEmpty()
  @Length(9, 9)
  @Column({
    length: 9,
  })
  siren: string;

  @IsNotEmpty()
  @Length(14, 14)
  @Column({
    length: 14,
  })
  siret: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @IsPostalCode("FR")
  @Length(5, 5)
  @Column({
    length: 5,
  })
  zipCode: string;

  @IsNotEmpty()
  @IsLatitude()
  @Column()
  lat: string;

  @IsNotEmpty()
  @IsLongitude()
  @Column()
  long: string;

  @IsNotEmpty()
  @IsPhoneNumber("FR")
  @Length(10, 10)
  @Column({
    length: 10,
  })
  phone: string;

  @IsNotEmpty()
  @Column()
  address: string;

  @IsNotEmpty()
  @IsBoolean()
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
}
