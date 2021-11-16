import { AuthService } from "../../services/auth/service";
import { Request, Response } from "express";
import { LoggerService } from "../../services/logger/service";

export class AuthController {
  constructor(
    private authService: AuthService,
    private loggerService: LoggerService
  ) {}
  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      req.session.userId = await this.authService.validateUser(email, password);
      res.send("Successfully");
    } catch (e) {
      const { message } = e;
      this.loggerService.error(message);
      res.sendStatus(400);
    }
  }
  public async logout(req: Request, res: Response) {
    try {
      req.session.destroy((err) => {
        if (err) {
          throw new Error(err);
        }
        res.send("Successfully");
      });
    } catch (e) {
      const { message } = e;
      this.loggerService.error(message);
      res.sendStatus(400);
    }
  }
}
