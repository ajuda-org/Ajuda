import { getRepository } from "typeorm";
import { User } from "../models";
import { IUserInterface } from "../interfaces";

const userRepositpry = {
  listAllUsers: async (): Promise<IUserInterface[]> => {
    const userRepository = getRepository(User);
    const allUsers = await userRepository.find();
    return allUsers;
  },
  create: async (
    name: string,
    cpf: string,
    whatsapp: string,
    type: string,
    email: string,
    password: string
  ): Promise<User | boolean> => {
    const userRepository = getRepository(User);
    const userExist = await userRepository.findOne({ email });

    if (userExist !== undefined) {
      return false;
    }
    console.log(cpf, whatsapp.length);
    const user = await userRepository.create({
      cpf,
      name,
      whatsapp,
      type,
      email,
      password
    });

    await userRepository.save(user);

    return user;
  }
};

export default userRepositpry;
