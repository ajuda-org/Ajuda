import { userRepositpry } from "../repositories";
import { IUserInterface } from "../interfaces";
import { User } from "../models";

interface Request {
  name: string;
  cpf: string;
  whatsapp: string;
  type: string;
  email: string;
  password: string;
}

const userService = {
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
  }: Request): Promise<User | boolean> => {
    const user = await userRepositpry.create(
      name,
      cpf,
      whatsapp,
      type,
      email,
      password
    );

    return user;
  }
};

export default userService;
