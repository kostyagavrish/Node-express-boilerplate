import { ApiError } from "./api-error";

export class BadRequest extends ApiError {
  constructor(message?: string) {
    super(message || "Bad request.", 400);
  }
}
