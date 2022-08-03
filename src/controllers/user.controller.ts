import { validateOrReject } from "class-validator";
import { Request, Response } from "express";
import { User } from "../entities";
import { IUserPayload } from "../payloads";
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
    const payload: IUserPayload = <IUserPayload>req.body;

    const userAlreadyExists = await UserRepository.findOneByEmail(
      payload.email
    );
    if (userAlreadyExists) {
      res.status(409).send({ message: "Email already in use" });
      return;
    }

    let user = new User();
    user = { ...user, ...payload };
    user.isActive = true;

    try {
      await validateOrReject(payload);
    } catch (errors) {
      res.status(409).send({ message: "Validation failed", errors });
      return;
    }

    try {
      await UserRepository.save(user);
      res.status(201).send({ message: "User created" });
    } catch (error) {
      res.status(400).send({ message: error });
    }
  };
}
