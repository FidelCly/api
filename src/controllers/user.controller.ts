import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { User } from "../entities";
import { IUserCreatePayload, IUserUpdatePayload } from "../payloads";
import { UserRepository } from "../repositories";

export class UserController {
  /**
   * Get one user
   */
  static one = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const user = await UserRepository.findOneById(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
    }
  };

  /**
   * Create a user
   */
  static create = async (req: Request, res: Response) => {
    const payload: IUserCreatePayload = <IUserCreatePayload>req.body;

    if (payload.email) {
      const userAlreadyExists = await UserRepository.findOneByEmail(
        payload.email
      );
      if (userAlreadyExists) {
        res.status(409).send({ message: "Email already in use" });
        return;
      }
    }

    let user: User = new User();
    user = Object.assign(user, payload);
    user.isActive = true;

    try {
      await validateOrReject(user);
    } catch (errors) {
      res.status(400).send({ message: "Validation failed", errors });
      return;
    }

    try {
      await UserRepository.save(user);
      res.status(201).send({ message: "User created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Update user
   */
  static update = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const payload: IUserUpdatePayload = <IUserUpdatePayload>req.body;

    let user: User;

    try {
      user = await UserRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    if (payload.email) {
      const userAlreadyExists = await UserRepository.findOneByEmail(
        payload.email
      );

      if (userAlreadyExists) {
        res.status(409).send({ message: "Email already in use" });
        return;
      }
    }

    user = Object.assign(user, payload);

    try {
      await validateOrReject(user);
    } catch (errors) {
      res.status(400).send({
        message: "Validation failed",
        errors,
      });
      return;
    }

    try {
      await UserRepository.save(user);
      res.status(200).send({ message: "User updated" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };

  /**
   * Delete user
   */
  static delete = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      await UserRepository.findOneById(id);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
      return;
    }

    await UserRepository.deleteUsersCards(id);

    await UserRepository.delete(id);
    res.status(200).send({ message: "User deleted" });
  };

  /**
   * Get user's wallet
   */
  static wallet = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    try {
      const user = await UserRepository.getUsersCards(id);
      res.status(200).send(user.cards);
    } catch (error) {
      res.status(404).send({ message: "User not found" });
    }
  };
}
