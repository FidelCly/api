import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  /**
   * Find user by id
   * @param id - Id of the user
   * @returns A user if found
   */
  findOne(id: number): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      relations: { cards: { shop: true, balances: { promotion: true } } },
    });
  }

  /**
   * Find user by username
   * @param username - Username of the user
   * @returns A user if found
   */
  findOneByUsername = (username: string): Promise<User | null> => {
    return this.userRepository.findOneBy({
      username,
    });
  };

  /**
   * Find user by email
   * @param email - Email of the user
   * @returns A user if found
   */
  findOneByEmail = (email: string): Promise<User | null> => {
    return this.userRepository.findOneBy({
      email,
    });
  };

  /**
   * Create a user on the db
   * @param createUserDto - The user to create
   */
  create(createUserDto: CreateUserDto): Promise<User> {
    const user = { ...new User(), ...createUserDto };
    return this.userRepository.save(user);
  }

  /**
   * Update a user on the db
   * @param id - The user to update
   * @param updateUserDto - The updated user
   */
  update(id: number, updateUserDto: UpdateUserDto): Promise<UpdateResult> {
    return this.userRepository.update(id, updateUserDto);
  }

  /**
   * Delete a user from the db
   * @param id - The id of the user to delete
   */
  remove(id: number): Promise<UpdateResult> {
    return this.userRepository.softDelete(id);
  }
}
