import { AppDataSource } from "../data-source";
import { User } from "../entities";

export interface IUserPayload {
  username: string;
  email: string;
}

const userRepository = AppDataSource.getRepository(User);

export const getUser = async (id: number): Promise<User | null> => {
  const user = await userRepository.findOneBy({ id: id });
  if (!user) return null;
  return user;
};
