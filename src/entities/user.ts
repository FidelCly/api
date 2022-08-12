/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsDefined, IsEmail, IsNotEmpty } from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Card } from ".";

@Entity({ name: "users" }) // table name in database
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsDefined()
  @Column()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  @Column()
  email: string;

  @IsNotEmpty()
  @IsBoolean()
  @Column({
    default: true,
  })
  isActive: boolean;

  @OneToMany(() => Card, (card: Card) => card.user)
  cards!: Array<Card>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
