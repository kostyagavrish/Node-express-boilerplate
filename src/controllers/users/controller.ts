import { UserService } from "../../services/users/service";
import { Response, Request } from "express";
import { ICreateUser, IFindUser, IUpdateUser } from "../../interfaces/users";
import { ILogger } from "../../interfaces/logger";
import { getUserPropertiesForResponse } from "../../queries/templates/users";

export class UserController {
  constructor(
    private userService: UserService,
    private loggerService: ILogger
  ) {}
  public async create(req: Request, res: Response) {
    try {
      const { ...data } = <ICreateUser>req.body;
      const createdUser = await this.userService.create(
        data,
        getUserPropertiesForResponse
      );
      res.json(createdUser);
    } catch (e) {
      const { message } = e;
      this.loggerService.error(message);
      res.sendStatus(400);
    }
  }
  public async get(req: Request, res: Response) {
    try {
      const { ...query } = <IFindUser>req.query;
      const [foundUser] = await this.userService.get(
        query,
        getUserPropertiesForResponse
      );
      res.json(foundUser);
    } catch (e) {
      if (e) {
        const { message } = e;
        this.loggerService.error(message);
        res.sendStatus(400);
      }
    }
  }
  public async update(req: Request, res: Response) {
    try {
      const { ...params } = <IFindUser>req.query;
      const { ...data } = <IUpdateUser>req.body;
      const updatedUser = await this.userService.update(
        params,
        data,
        getUserPropertiesForResponse
      );
      res.json(updatedUser);
    } catch (e) {
      if (e) {
        const { message } = e;
        this.loggerService.error(message);
        res.sendStatus(400);
      }
    }
  }
  public async delete(req: Request, res: Response) {
    try {
      const { ...params } = <IFindUser>req.query;
      const deletingInfo = await this.userService.delete(params);
      res.json(deletingInfo);
    } catch (e) {
      if (e) {
        const { message } = e;
        this.loggerService.error(message);
        res.sendStatus(400);
      }
    }
  }
}
