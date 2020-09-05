import { userRepository } from "../repositories";
import {
  IServiceResponseWithUser,
  IServiceResponseWithError,
  ISession
} from "../interfaces";

import userService from "./userService";

const sessionsService = {
  create: async ({
    email,
    password,
    type
  }: ISession): Promise<
    IServiceResponseWithError | IServiceResponseWithUser
  > => {
    const userExist = await userRepository.showUserByEmailAndType(email, type);

    if (!userExist) {
      return {
        status: 401,
        entityOrError: {
          field: "email",
          error: "E-mail não esta cadastrado na aplicação."
        }
      };
    }

    const encryptedPassword = await userExist.checkPassword(password);

    if (!encryptedPassword) {
      return {
        status: 401,
        entityOrError: {
          field: "password",
          error: "Senha informada esta incorreta."
        }
      };
    }

    const userWithoutPass = userService.removePassword([userExist]);
    return { status: 200, entityOrError: userWithoutPass };
  }
};

export default sessionsService;
