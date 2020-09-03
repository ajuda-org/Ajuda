import bcrypt from "bcryptjs";
import { getRepository } from "typeorm";
import { User } from "../models";

import { userRepositpry } from "../repositories";
import { IUserInterface } from "../interfaces";

interface Request {
  name: string;
  cpf: string;
  whatsapp: string;
  type: string;
  email: string;
  password: string;
}

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
  },
  create: async ({
    name,
    cpf,
    whatsapp,
    type,
    email,
    password
  }: Request): Promise<User> => {
    const userRepository = getRepository(User);

    const encryptedPassword = await userService.encryptPassword(password);

    const user = userRepository.create({
      id: 1,
      name,
      cpf,
      whatsapp,
      type,
      email,
      password: encryptedPassword
    });

    await userRepository.save(user);

    return user;
  }
};

export default userService;
