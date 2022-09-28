/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Max,
  Min,
} from "class-validator";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ name: "promotions" }) // table name in database
export class Promotion {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  shopId: number;

  @IsNotEmpty()
  @IsNumber()
  @Column()
  userId: number;

  @IsNotEmpty()
  @Column()
  name: string;

  @Column()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(2)
  @Column({ default: 0 })
  type: number;

  @IsNumber()
  @IsOptional()
  @Column({ default: 10 })
  limitPassage: number;

  @IsNumber()
  @IsOptional()
  @Column({ default: 10 })
  limitAmout: number;

  @IsBoolean()
  @IsOptional()
  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  startAt!: Date;

  @UpdateDateColumn()
  endAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
