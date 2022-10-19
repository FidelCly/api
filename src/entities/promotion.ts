/* eslint-disable @typescript-eslint/no-unused-vars */
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, Max, Min } from "class-validator";
import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToMany,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn
} from "typeorm";
import { Shop } from "./shop";
import { User } from "./user";

@Entity({ name: "promotions" }) // table name in database
export class Promotion {
	@PrimaryGeneratedColumn()
	id: number;

	@IsNotEmpty()
	@IsNumber()
	@Column({ nullable: true })
	shopId: number;

	@OneToMany(() => Shop, (shop: Shop) => shop.id)
	@JoinColumn()
	shop!: Shop;

	@IsNotEmpty()
	@IsNumber()
	@Column({ nullable: false })
	userId: number;

	@ManyToMany(() => User, (user: User) => user.id)
	@JoinColumn()
	user!: User;

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
	createdAt!: Date;

	@UpdateDateColumn()
	updatedAt!: Date;

	endAt!: Date;

	startAt!: Date;
}
