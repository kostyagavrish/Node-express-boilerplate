export interface IUser {
  id: string;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  password: string;
  birthdate: number;
  phone_number: string;
  description: string;
}
export interface ICreateUser
  extends Omit<IUser, "description" | "id" | "full_name"> {
  description?: string;
}
export interface IUpdateUser extends Partial<Omit<IUser, "id" | "password">> {}
export interface IFindUser
  extends Partial<Pick<IUser, "full_name" | "id" | "email">> {}
