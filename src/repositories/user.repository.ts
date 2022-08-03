import { AppDataSource } from "../data-source";
import { User } from "../entities";

export class UserRepository {
  static findOneById = async (id: Number): Promise<User> => {
    return await AppDataSource.getRepository(User).findOneByOrFail({
      id: Number(id),
    });
  };

  static findOneByUsername = async (username: string): Promise<User | null> => {
    return await AppDataSource.getRepository(User).findOneBy({
      username,
    });
  };

  static findOneByEmail = async (email: string): Promise<User | null> => {
    return await AppDataSource.getRepository(User).findOneBy({
      email,
    });
  };

  static create = async (user: User) => {
    await AppDataSource.getRepository(User).save(user);
  };

  static delete = async (id: number) => {
    await AppDataSource.getRepository(User).delete(id);
  };
}
