import { IUser } from "../models/userModel";

export interface IUserRepository {
  createUser(userData: Partial<IUser>): Promise<IUser>;

  findUserByEmail(email: string): Promise<IUser | null>;
}
