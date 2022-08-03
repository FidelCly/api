import { CustomError } from "./custom.error";

export class NotFoundError extends CustomError {
  constructor(entity: string) {
    super(`${entity} not found`, 404);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}
