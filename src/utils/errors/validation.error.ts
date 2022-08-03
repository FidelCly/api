import { CustomError } from "./custom.error";

export class ValidationError extends CustomError {
  constructor(errors?: any) {
    super("Validation failed", 400, errors);
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
