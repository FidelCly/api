import { AppDataSource } from "../data-source";
import { User } from "../entities";

export class UserRepository {
  /**
   * Find user by id
   * @param id - Id of the user
   * @returns A user if found
   */
  static findOneById = async (id: number): Promise<User> => {
    return await AppDataSource.getRepository(User).findOneByOrFail({
      id: Number(id),
    });
  };

  /**
   * Find user by username
   * @param username - Username of the user
   * @returns A user if found
   */
  static findOneByUsername = async (username: string): Promise<User | null> => {
    return await AppDataSource.getRepository(User).findOneBy({
      username,
    });
  };

  /**
   * Find user by email
   * @param email - Email of the user
   * @returns A user if found
   */
  static findOneByEmail = async (email: string): Promise<User | null> => {
    return await AppDataSource.getRepository(User).findOneBy({
      email,
    });
  };

  /**
   * Save a user on the db
   * @param user - The user to save
   */
  static save = async (user: User) => {
    await AppDataSource.getRepository(User).save(user);
  };

  /**
   * Delete a user from the db
   * @param id - The id of the user to delete
   */
  static delete = async (id: number) => {
    await AppDataSource.getRepository(User).delete(id);
  };
}
