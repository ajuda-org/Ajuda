import { userRepository } from "../repositories";
import {
  IUserInterface,
  IUserWithoutPassword,
  IServiceResponseWithError,
  IServiceResponseWithUser
} from "../interfaces";

const userService = {
  listAll: async (): Promise<IUserWithoutPassword[]> => {
    const users = await userRepository.listAllUsers();
    return users;
  },

  showUserById: async (
    id: string
  ): Promise<IServiceResponseWithError | IServiceResponseWithUser> => {
    const userExist = await userRepository.showUserById(id);
    if (!userExist) {
      return {
        status: 404,
        entityOrError: {
          field: "id",
          error: "Usuário não está cadastrado na aplicação."
        }
      };
    }

    return { status: 201, entityOrError: userExist };
  },

  create: async ({
    name,
    cpf,
    whatsapp,
    type,
    email,
    password
  }: IUserInterface): Promise<
    IServiceResponseWithError | IServiceResponseWithUser
  > => {
    const userExist = await userRepository.userExist(email);

    if (userExist) {
      return {
        status: 401,
        entityOrError: {
          field: "email",
          error: "E-mail já esta cadastrado na aplicação."
        }
      };
    }
    const user = await userRepository.create(
      name,
      cpf,
      whatsapp,
      type,
      email,
      password
    );

    return { status: 201, entityOrError: user };
  },

  updateById: async (
    id: string,
    whatsapp: string
  ): Promise<IServiceResponseWithError | IServiceResponseWithUser> => {
    const userExist = await userRepository.userExistById(id);
    if (!userExist) {
      return {
        status: 404,
        entityOrError: {
          field: "id",
          error: "Usuário não está cadastrado na aplicação."
        }
      };
    }
    await userRepository.updateById(id, whatsapp);

    return { status: 201, entityOrError: userExist };
  }
};

export default userService;
