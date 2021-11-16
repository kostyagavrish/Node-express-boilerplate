import {
  ICreateUser,
  IFindUser,
  IUpdateUser,
  IUser,
} from "../../interfaces/users";
import { IDatabaseManager } from "../../interfaces/database";
import * as crypto from "crypto";
import { Knex } from "knex";
const { salt } = require("../../../config");

export class UserService {
  constructor(private databaseManager: IDatabaseManager) {}
  public passwordEncryption(password: string) {
    if (!password) throw new Error("Incorrect password.");
    if (!salt) throw new Error("Incorrect salt.");
    return crypto
      .pbkdf2Sync(password, salt, 1000, 64, `sha512`)
      .toString("hex");
  }
  public create(
    data: ICreateUser,
    select: "*"
  ): Knex.QueryBuilder<any, IUser[]>;
  public create<T extends Array<keyof IUser>>(
    data: ICreateUser,
    select: T
  ): Knex.QueryBuilder<any, Array<Pick<IUser, T[number]>>>;
  public async create<T extends Array<keyof IUser>>(
    data: ICreateUser,
    select: T | "*"
  ) {
    if (!data) throw new Error("Incorrect creating data.");
    const { password, ...userData } = data;
    const encryptedPassword = this.passwordEncryption(password);
    const db = this.databaseManager.db();
    const insertingUserQuery = db("users").insert({
      password: encryptedPassword,
      ...userData,
    });
    if (select instanceof Array) {
      insertingUserQuery.returning<Array<Pick<IUser, T[number]>>>(select);
    } else {
      return insertingUserQuery.returning<IUser[]>(select);
    }
  }
  public get(
    conditionals: IFindUser,
    select: "*"
  ): Knex.QueryBuilder<any, IUser[]>;
  public get<T extends Array<keyof IUser>>(
    conditionals: IFindUser,
    select: T
  ): Knex.QueryBuilder<any, Array<Pick<IUser, T[number]>>>;
  public get<T extends Array<keyof IUser>>(
    conditionals: IFindUser,
    select: T | "*"
  ) {
    if (!select || !conditionals) throw new Error("Incorrect finding data.");
    const db = this.databaseManager.db();
    const filteredUsersQuery = db("users").where(conditionals);
    if (select instanceof Array) {
      return filteredUsersQuery.returning<Array<Pick<IUser, T[number]>>>(
        select
      );
    } else {
      return filteredUsersQuery.returning<IUser[]>(select);
    }
  }
  public update(
    conditionals: IFindUser,
    data: IUpdateUser,
    select: "*"
  ): Knex.QueryBuilder<any, IUser[]>;
  public update<T extends Array<keyof IUser>>(
    conditionals: IFindUser,
    data: IUpdateUser,
    select: T
  ): Knex.QueryBuilder<any, Array<Pick<IUser, T[number]>>>;
  public update<T extends Array<keyof IUser>>(
    conditionals: IFindUser,
    data: IUpdateUser,
    select: T | "*"
  ) {
    if (!data || !conditionals) throw new Error("Incorrect updating data.");
    const db = this.databaseManager.db();
    const updatingUsersQuery = db("users").where(conditionals).update(data);
    if (select instanceof Array) {
      return updatingUsersQuery.returning<Array<Pick<IUser, T[number]>>>(
        select
      );
    } else {
      return updatingUsersQuery.returning<IUser[]>(select);
    }
  }
  public delete(conditionals: IFindUser) {
    if (!conditionals) throw new Error("Incorrect conditionals.");
    const db = this.databaseManager.db();
    return db("users").where(conditionals).del();
  }
}
