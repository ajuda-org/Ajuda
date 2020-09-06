import { getRepository, Repository, UpdateResult } from "typeorm";
import { User } from "../models";
import { IUserInterface } from "../interfaces";

const userRepository = {
  getRepo: (): Repository<User> => {
    return getRepository(User);
  },

  userExist: async (email: string): Promise<boolean> => {
    const repository = userRepository.getRepo();
    const userExist = await repository.findOne({ email });
    return !!userExist;
  },

  userExistById: async (id: string): Promise<User | undefined> => {
    const repository = userRepository.getRepo();
    const userExist = await repository.findOne({ id: Number(id) });
    return userExist;
  },

  listAllUsers: async (): Promise<IUserInterface[]> => {
    const repository = userRepository.getRepo();
    const allUsers = await repository.find();
    return allUsers;
  },

  showUserById: async (id: string): Promise<User | undefined> => {
    const repository = userRepository.getRepo();
    const user = await repository.findOne({ id: Number(id) });
    return user;
  },

  showUserByEmailAndType: async (
    email: string,
    type: string
  ): Promise<User | undefined> => {
    const repository = userRepository.getRepo();
    const user = await repository.findOne({ email, type });
    return user;
  },

  create: async (
    name: string,
    cpf: string,
    whatsapp: string,
    type: string,
    email: string,
    password: string
  ): Promise<IUserInterface> => {
    const repository = userRepository.getRepo();

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
  },

  updateById: async (id: string, whatsapp: string): Promise<UpdateResult> => {
    const repository = userRepository.getRepo();
    const userUpdated = await repository.update(Number(id), { whatsapp });
    return userUpdated;
  }
};

export default userRepository;
