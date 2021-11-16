import { IDatabaseManager } from "../../interfaces/database";
import { UserService } from "../users/service";

export class AuthService {
  constructor(
    private databaseManager: IDatabaseManager,
    private userService: UserService
  ) {}
  public async validateUser(email: string, password: string) {
    if (!email || !password) {
      throw new Error("Email or password is incorrect.");
    }
    const [user] = await this.userService.get({ email }, ["id", "password"]);
    if (!user) {
      throw new Error("User doesn't exist.");
    }
    this.validateUserPassword(password, user.password);
    return user.id;
  }
  public validateUserPassword(
    correctPassword: string,
    enteredPassword: string
  ) {
    const encryptedPassword =
      this.userService.passwordEncryption(correctPassword);
    if (encryptedPassword !== enteredPassword) {
      throw new Error("Passwords are not the same.");
    }
  }
}
