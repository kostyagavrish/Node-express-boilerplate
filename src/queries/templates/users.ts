import { IUser } from "../../interfaces/users";

export const getUserPropertiesForResponse: Array<
  keyof Omit<IUser, "password">
> = [
  "id",
  "first_name",
  "last_name",
  "email",
  "description",
  "phone_number",
  "birthdate",
];
