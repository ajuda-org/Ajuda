import { userRepository } from "../repositories";
import { IUserInterface, IUserWithoutPassword } from "../interfaces";

interface serviceResponseWithError {
  status: number;
  userOrError: {
    field: string;
    error: string;
  };
}

interface serviceResponseWithUser {
  status: number;
  userOrError: IUserWithoutPassword[];
}

const userService = {
  removePassword: (object: Array<IUserInterface>): IUserWithoutPassword[] => {
    return object.map(({ password, ...rest }) => rest);
  },

  listAll: async (): Promise<IUserWithoutPassword[]> => {
    const users = await userRepository.listAllUsers();
    return userService.removePassword(users);
  },

  showUserById: async (
    id: string
  ): Promise<serviceResponseWithError | serviceResponseWithUser> => {
    const userExist = await userRepository.showUserById(id);
    if (!userExist) {
      return {
        status: 404,
        userOrError: {
          field: "id",
          error: "Usuário não está cadastrado na aplicação."
        }
      };
    }
    const userWithoutPass = userService.removePassword([userExist]);
    return { status: 201, userOrError: userWithoutPass };
  },

  create: async ({
    name,
    cpf,
    whatsapp,
    type,
    email,
    password
  }: IUserInterface): Promise<
    serviceResponseWithError | serviceResponseWithUser
  > => {
    const userExist = await userRepository.userExist(email);

    if (userExist) {
      return {
        status: 401,
        userOrError: {
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
    const userWithoutPass = userService.removePassword([user]);
    return { status: 201, userOrError: userWithoutPass };
  },

  updateById: async (
    id: string,
    whatsapp: string
  ): Promise<serviceResponseWithError | serviceResponseWithUser> => {
    const userExist = await userRepository.userExistById(id);
    if (!userExist) {
      return {
        status: 404,
        userOrError: {
          field: "id",
          error: "Usuário não está cadastrado na aplicação."
        }
      };
    }
    await userRepository.updateById(id, whatsapp);
    const userWithoutPass = userService.removePassword([userExist]);

    return {
      status: 201,
      userOrError: userWithoutPass.map(user => {
        return { ...user, whatsapp };
      })
    };
  }
};

export default userService;
