import { getRepository } from "typeorm";
import { User } from "../models";
import { IUserInterface } from "../interfaces";

const userRepository = {
  userExist: async (email: string): Promise<boolean> => {
    const repository = getRepository(User);
    const userExist = await repository.findOne({ email });
    return !!userExist;
  },
  listAllUsers: async (): Promise<IUserInterface[]> => {
    const repository = getRepository(User);
    const allUsers = await repository.find();
    return allUsers;
  },
  create: async (
    name: string,
    cpf: string,
    whatsapp: string,
    type: string,
    email: string,
    password: string
  ): Promise<IUserInterface> => {
    const repository = getRepository(User);

    const user = await repository.create({
      cpf,
      name,
      whatsapp,
      type,
      email,
      password
    });

    await repository.save(user);

    return user;
  }
};

export default userRepository;
