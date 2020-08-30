import bcrypt from "bcryptjs";

import { userRepositpry } from "../repositories";
import { IUserInterface } from "../interfaces";

const userService = {
  encryptPassword: async (password: string): Promise<string> => {
    const encryptedPassword = await bcrypt.hash(password, 8);
    return encryptedPassword;
  },
  checkPassword: async (
    hashPassword: string,
    password: string
  ): Promise<boolean> => {
    const isValid = bcrypt.compare(hashPassword, password);
    return isValid;
  },
  listAll: async (): Promise<IUserInterface[]> => {
    const users = await userRepositpry.listAllUsers();
    return users;
  }
};

export default userService;
