import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repository: Repository<User>,
  ) {}

  /**
   * Find user by id
   * @param id - Id of the user
   * @returns A user if found
   */
  findOne(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        cards: { shop: true, balances: { promotion: true } },
        shop: { promotions: true, cards: { user: true, balances: true } },
      },
    });
  }

  /**
   * findOneCards
   * @param id
   * @returns
   */
  findOneCards(id: number): Promise<User | null> {
    return this.repository.findOne({
      where: { id },
      relations: {
        cards: { user: true, balances: { promotion: true }, shop: true },
      },
    });
  }

  /**
   * Find user by Uuid
   * @param uuid - uuid of the user
   * @returns A user if found
   */
  findByUuid(uuid: string): Promise<User | null> {
    return this.repository.findOne({
      where: { uuid },
      relations: {
        cards: { shop: true, balances: { promotion: true } },
        shop: { promotions: true, cards: { user: true, balances: true } },
      },
    });
  }

  /**
   * Find user by username
   * @param username - Username of the user
   * @returns A user if found
   */
  findOneByUsername = (username: string): Promise<User | null> => {
    return this.repository.findOneBy({
      username,
    });
  };

  /**
   * Find user by email
   * @param email - Email of the user
   * @returns A user if found
   */
  findOneByEmail = (email: string): Promise<User | null> => {
    return this.repository.findOneBy({
      email,
    });
  };

  /**
   * Create a user on the db
   * @param createUserDto - The user to create
   */
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = { ...new User(), ...createUserDto };
    return this.repository.save(user);
  }

  /**
   * Update a user on the db
   * @param id - The user to update
   * @param updateUserDto - The updated user
   */
  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.repository.update(id, updateUserDto);
  }

  /**
   * Delete a user from the db
   * @param id - The id of the user to delete
   */
  remove(id: number): Promise<UpdateResult> {
    return this.repository.softDelete(id);
  }
}
