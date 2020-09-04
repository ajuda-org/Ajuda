import { userRepository } from "../repositories";
import { IUserInterface, IUserWithoutPassword } from "../interfaces";

const userService = {
  removePassword: (object: Array<IUserInterface>): IUserWithoutPassword[] => {
    return object.map(({ password, ...rest }) => rest);
  },
  listAll: async (): Promise<IUserWithoutPassword[]> => {
    const users = await userRepository.listAllUsers();
    return userService.removePassword(users);
  },
  create: async ({
    name,
    cpf,
    whatsapp,
    type,
    email,
    password
  }: IUserInterface): Promise<IUserWithoutPassword[] | boolean> => {
    const userExist = await userRepository.userExist(email);

    if (userExist) {
      return false;
    }
    const user = await userRepository.create(
      name,
      cpf,
      whatsapp,
      type,
      email,
      password
    );

    return userService.removePassword([user]);
  }
};

export default userService;
