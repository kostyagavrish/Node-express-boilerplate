import { ApiError } from "./api-error";

export class Unauthorized extends ApiError {
  constructor(message?: string) {
    super(message || "Unauthorized.", 401);
  }
}
